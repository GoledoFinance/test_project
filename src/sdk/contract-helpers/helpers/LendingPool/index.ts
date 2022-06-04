import { constants, utils, providers } from 'ethers';
import BaseService from '../../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  InterestRate,
  ProtocolAction,
  transactionType,
  LendingPoolMarketConfig,
} from '../../commons/types';
import {
  getTxValue,
  valueToWei,
  API_ETH_MOCK_ADDRESS,
  DEFAULT_APPROVE_AMOUNT,
} from '../../commons/utils';
import { ERC20Service, IERC20ServiceInterface } from '../ERC20';
import { WETHGatewayInterface, WETHGatewayService } from '../WETHGateway';
import {
  LPBorrowParamsType,
  LPDepositParamsType,
  LPLiquidationCall,
  LPRepayParamsType,
  LPSetUsageAsCollateral,
  LPSwapBorrowRateMode,
  LPWithdrawParamsType,
  LPFlashLiquidation,
} from './types';
import { LendingPool__factory, LendingPool as LendingPoolContract } from '../../typechain';

export interface LendingPoolInterface {
  deposit: (args: LPDepositParamsType) => Promise<EthereumTransactionTypeExtended[]>;
  withdraw: (args: LPWithdrawParamsType) => Promise<EthereumTransactionTypeExtended[]>;
  borrow: (args: LPBorrowParamsType) => Promise<EthereumTransactionTypeExtended[]>;
  repay: (args: LPRepayParamsType) => Promise<EthereumTransactionTypeExtended[]>;
  swapBorrowRateMode: (args: LPSwapBorrowRateMode) => EthereumTransactionTypeExtended[];
  setUsageAsCollateral: (args: LPSetUsageAsCollateral) => EthereumTransactionTypeExtended[];
  liquidationCall: (args: LPLiquidationCall) => Promise<EthereumTransactionTypeExtended[]>;
  flashLiquidation(args: LPFlashLiquidation): Promise<EthereumTransactionTypeExtended[]>;
}

export class LendingPool extends BaseService<LendingPoolContract> implements LendingPoolInterface {
  readonly erc20Service: IERC20ServiceInterface;

  readonly lendingPoolAddress: string;

  readonly wethGatewayService: WETHGatewayInterface;

  readonly flashLiquidationAddress: string;

  readonly swapCollateralAddress: string;

  readonly repayWithCollateralAddress: string;

  constructor(provider: providers.Provider, lendingPoolConfig?: LendingPoolMarketConfig) {
    super(provider, LendingPool__factory);

    const {
      LENDING_POOL,
      FLASH_LIQUIDATION_ADAPTER,
      REPAY_WITH_COLLATERAL_ADAPTER,
      SWAP_COLLATERAL_ADAPTER,
      WETH_GATEWAY,
    } = lendingPoolConfig ?? {};

    this.lendingPoolAddress = LENDING_POOL ?? '';
    this.flashLiquidationAddress = FLASH_LIQUIDATION_ADAPTER ?? '';
    this.swapCollateralAddress = SWAP_COLLATERAL_ADAPTER ?? '';
    this.repayWithCollateralAddress = REPAY_WITH_COLLATERAL_ADAPTER ?? '';

    // initialize services
    this.erc20Service = new ERC20Service(provider);
    this.wethGatewayService = new WETHGatewayService(provider, this.erc20Service, WETH_GATEWAY);
  }

  public async deposit({
    user,
    reserve,
    amount,
    onBehalfOf,
    referralCode,
  }: LPDepositParamsType): Promise<EthereumTransactionTypeExtended[]> {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      return this.wethGatewayService.depositETH({
        lendingPool: this.lendingPoolAddress,
        user,
        amount,
        onBehalfOf,
        referralCode,
      });
    }

    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface = this.erc20Service;
    const txs: EthereumTransactionTypeExtended[] = [];
    const reserveDecimals: number = await decimalsOf(reserve);
    const convertedAmount: string = valueToWei(amount, reserveDecimals);

    const approved = await isApproved({
      token: reserve,
      user,
      spender: this.lendingPoolAddress,
      amount,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: reserve,
        spender: this.lendingPoolAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const lendingPoolContract: LendingPoolContract = this.getContractInstance(
      this.lendingPoolAddress
    );

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.deposit(
          reserve,
          convertedAmount,
          onBehalfOf ?? user,
          referralCode ?? '0'
        ),
      from: user,
      value: getTxValue(reserve, convertedAmount),
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.deposit),
    });

    return txs;
  }

  public async withdraw({
    user,
    reserve,
    amount,
    onBehalfOf,
    aTokenAddress,
  }: LPWithdrawParamsType): Promise<EthereumTransactionTypeExtended[]> {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      if (!aTokenAddress) {
        throw new Error('To withdraw ETH you need to pass the aWETH token address');
      }

      return this.wethGatewayService.withdrawETH({
        lendingPool: this.lendingPoolAddress,
        user,
        amount,
        onBehalfOf,
        aTokenAddress,
      });
    }

    const { decimalsOf }: IERC20ServiceInterface = this.erc20Service;
    const decimals: number = await decimalsOf(reserve);

    const convertedAmount: string =
      amount === '-1' ? constants.MaxUint256.toString() : valueToWei(amount, decimals);

    const lendingPoolContract: LendingPoolContract = this.getContractInstance(
      this.lendingPoolAddress
    );

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.withdraw(
          reserve,
          convertedAmount,
          onBehalfOf ?? user
        ),
      from: user,
      action: ProtocolAction.withdraw,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback, ProtocolAction.withdraw),
      },
    ];
  }

  public async borrow({
    user,
    reserve,
    amount,
    interestRateMode,
    debtTokenAddress,
    onBehalfOf,
    referralCode,
  }: LPBorrowParamsType): Promise<EthereumTransactionTypeExtended[]> {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      if (!debtTokenAddress) {
        throw new Error(
          `To borrow ETH you need to pass the stable or variable WETH debt Token Address corresponding the interestRateMode`
        );
      }

      return this.wethGatewayService.borrowETH({
        lendingPool: this.lendingPoolAddress,
        user,
        amount,
        debtTokenAddress,
        interestRateMode,
        referralCode,
      });
    }

    const { decimalsOf }: IERC20ServiceInterface = this.erc20Service;
    const reserveDecimals = await decimalsOf(reserve);
    const formatAmount: string = valueToWei(amount, reserveDecimals);

    const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1;

    const lendingPoolContract = this.getContractInstance(this.lendingPoolAddress);

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.borrow(
          reserve,
          formatAmount,
          numericRateMode,
          referralCode ?? 0,
          onBehalfOf ?? user
        ),
      from: user,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }

  public async repay({
    user,
    reserve,
    amount,
    interestRateMode,
    onBehalfOf,
  }: LPRepayParamsType): Promise<EthereumTransactionTypeExtended[]> {
    if (reserve.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()) {
      return this.wethGatewayService.repayETH({
        lendingPool: this.lendingPoolAddress,
        user,
        amount,
        interestRateMode,
        onBehalfOf,
      });
    }

    const txs: EthereumTransactionTypeExtended[] = [];
    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface = this.erc20Service;

    const lendingPoolContract = this.getContractInstance(this.lendingPoolAddress);
    const { populateTransaction }: LendingPoolContract = lendingPoolContract;
    const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1;
    const decimals: number = await decimalsOf(reserve);

    const convertedAmount: string =
      amount === '-1' ? constants.MaxUint256.toString() : valueToWei(amount, decimals);

    const approved: boolean = await isApproved({
      token: reserve,
      user,
      spender: this.lendingPoolAddress,
      amount,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token: reserve,
        spender: this.lendingPoolAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        populateTransaction.repay(reserve, convertedAmount, numericRateMode, onBehalfOf ?? user),
      from: user,
      value: getTxValue(reserve, convertedAmount),
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.repay),
    });

    return txs;
  }

  public swapBorrowRateMode({
    user,
    reserve,
    interestRateMode,
  }: LPSwapBorrowRateMode): EthereumTransactionTypeExtended[] {
    const numericRateMode = interestRateMode === InterestRate.Variable ? 2 : 1;

    const lendingPoolContract = this.getContractInstance(this.lendingPoolAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.swapBorrowRateMode(reserve, numericRateMode),
      from: user,
    });

    return [
      {
        txType: eEthereumTxType.DLP_ACTION,
        tx: txCallback,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }

  public setUsageAsCollateral({
    user,
    reserve,
    usageAsCollateral,
  }: LPSetUsageAsCollateral): EthereumTransactionTypeExtended[] {
    const lendingPoolContract = this.getContractInstance(this.lendingPoolAddress);

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.setUserUseReserveAsCollateral(
          reserve,
          usageAsCollateral
        ),
      from: user,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.DLP_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }

  public async liquidationCall({
    liquidator,
    liquidatedUser,
    debtReserve,
    collateralReserve,
    purchaseAmount,
    getAToken,
    liquidateAll,
  }: LPLiquidationCall): Promise<EthereumTransactionTypeExtended[]> {
    const txs: EthereumTransactionTypeExtended[] = [];
    const { isApproved, approve, decimalsOf }: IERC20ServiceInterface = this.erc20Service;

    const approved = await isApproved({
      token: debtReserve,
      user: liquidator,
      spender: this.lendingPoolAddress,
      amount: purchaseAmount,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user: liquidator,
        token: debtReserve,
        spender: this.lendingPoolAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });

      txs.push(approveTx);
    }

    let convertedAmount = constants.MaxUint256.toString();
    if (!liquidateAll) {
      const reserveDecimals = await decimalsOf(debtReserve);
      convertedAmount = valueToWei(purchaseAmount, reserveDecimals);
    }

    const lendingPoolContract = this.getContractInstance(this.lendingPoolAddress);

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.liquidationCall(
          collateralReserve,
          debtReserve,
          liquidatedUser,
          convertedAmount,
          getAToken ?? false
        ),
      from: liquidator,
      value: getTxValue(debtReserve, convertedAmount),
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.liquidationCall),
    });

    return txs;
  }

  public async flashLiquidation({
    user,
    collateralAsset,
    borrowedAsset,
    debtTokenCover,
    liquidateAll,
    initiator,
    useEthPath,
  }: LPFlashLiquidation): Promise<EthereumTransactionTypeExtended[]> {
    const addSurplus = (amount: string): string => {
      return (Number(amount) + (Number(amount) * Number(amount)) / 100).toString();
    };

    const txs: EthereumTransactionTypeExtended[] = [];

    const lendingPoolContract: LendingPoolContract = this.getContractInstance(
      this.lendingPoolAddress
    );

    const tokenDecimals: number = await this.erc20Service.decimalsOf(borrowedAsset);

    const convertedDebt = valueToWei(debtTokenCover, tokenDecimals);

    const convertedDebtTokenCover: string = liquidateAll
      ? constants.MaxUint256.toString()
      : convertedDebt;

    const flashBorrowAmount = liquidateAll
      ? valueToWei(addSurplus(debtTokenCover), tokenDecimals)
      : convertedDebt;

    const params: string = utils.defaultAbiCoder.encode(
      ['address', 'address', 'address', 'uint256', 'bool'],
      [collateralAsset, borrowedAsset, user, convertedDebtTokenCover, useEthPath ?? false]
    );

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        lendingPoolContract.populateTransaction.flashLoan(
          this.flashLiquidationAddress,
          [borrowedAsset],
          [flashBorrowAmount],
          [0],
          initiator,
          params,
          '0'
        ),
      from: initiator,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.DLP_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback, ProtocolAction.liquidationFlash),
    });
    return txs;
  }
}

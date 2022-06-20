import { ethers, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  transactionType,
} from '../commons/types';
import { DEFAULT_APPROVE_AMOUNT } from '../commons/utils';
import { MasterChef as MasterChefContract, MasterChef__factory } from '../typechain';
import { ERC20Service, IERC20ServiceInterface } from './ERC20';

export type ClaimMasterChefRewardsMethodType = {
  user: string;
  assets: string[];
  masterChefAddress: string;
};

export type DepositAndWithdrawMethodType = {
  user: string;
  token: string;
  amount: string;
  masterChefAddress: string;
};

export interface MasterChefInterface {
  claimRewards: (args: ClaimMasterChefRewardsMethodType) => EthereumTransactionTypeExtended[];
  deposit: (args: DepositAndWithdrawMethodType) => Promise<EthereumTransactionTypeExtended[]>;
  withdraw: (args: DepositAndWithdrawMethodType) => EthereumTransactionTypeExtended[];
}

export class MasterChef extends BaseService<MasterChefContract> implements MasterChefInterface {
  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider) {
    super(provider, MasterChef__factory);

    this.erc20Service = new ERC20Service(provider);
  }

  public async deposit({
    user,
    token,
    amount,
    masterChefAddress,
  }: DepositAndWithdrawMethodType): Promise<EthereumTransactionTypeExtended[]> {
    const { isApproved, approve }: IERC20ServiceInterface = this.erc20Service;
    const txs: EthereumTransactionTypeExtended[] = [];

    const approved = await isApproved({
      token,
      user,
      spender: masterChefAddress,
      amount,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token,
        spender: masterChefAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const masterChef: MasterChefContract = this.getContractInstance(masterChefAddress);

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        masterChef.populateTransaction.deposit(token, ethers.utils.parseEther(amount)),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.REWARD_ACTION,
      gas: this.generateTxPriceEstimation(txs, txCallback),
    });

    return txs;
  }

  public withdraw({
    user,
    token,
    amount,
    masterChefAddress,
  }: DepositAndWithdrawMethodType): EthereumTransactionTypeExtended[] {
    const masterChef: MasterChefContract = this.getContractInstance(masterChefAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        masterChef.populateTransaction.withdraw(token, ethers.utils.parseEther(amount)),
      from: user,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.REWARD_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }

  public claimRewards({
    user,
    assets,
    masterChefAddress,
  }: ClaimMasterChefRewardsMethodType): EthereumTransactionTypeExtended[] {
    const masterChef: MasterChefContract = this.getContractInstance(masterChefAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => masterChef.populateTransaction.claim(user, assets),
      from: user,
    });

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.REWARD_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }
}

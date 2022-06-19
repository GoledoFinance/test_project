import { ethers, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  transactionType,
} from '../commons/types';
import { DEFAULT_APPROVE_AMOUNT } from '../commons/utils';
import {
  MultiFeeDistribution as MultiFeeDistributionContract,
  MultiFeeDistribution__factory,
} from '../typechain';
import { ERC20Service, IERC20ServiceInterface } from './ERC20';

export type StakeMethodType = {
  user: string;
  token: string;
  amount: string;
  lock: boolean;
  distributionAddress: string;
};

export type GetMultiFeeDistributionRewardMethodType = {
  user: string;
  tokens: string[];
  distributionAddress: string;
};

export type WithdrawMethodType = {
  user: string;
  amount: string;
  distributionAddress: string;
};

export type WithdrawExpiredLocksMethodType = {
  user: string;
  distributionAddress: string;
};

export interface MultiFeeDistributionInterface {
  stake: (args: StakeMethodType) => Promise<EthereumTransactionTypeExtended[]>;
  withdraw: (args: WithdrawMethodType) => EthereumTransactionTypeExtended[];
  withdrawExpiredLocks: (args: WithdrawExpiredLocksMethodType) => EthereumTransactionTypeExtended[];
  exit: (args: WithdrawExpiredLocksMethodType) => EthereumTransactionTypeExtended[];
  getReward: (args: GetMultiFeeDistributionRewardMethodType) => EthereumTransactionTypeExtended[];
}

export class MultiFeeDistribution
  extends BaseService<MultiFeeDistributionContract>
  implements MultiFeeDistributionInterface
{
  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider) {
    super(provider, MultiFeeDistribution__factory);

    this.erc20Service = new ERC20Service(provider);
  }

  public async stake({
    user,
    amount,
    token,
    lock,
    distributionAddress,
  }: StakeMethodType): Promise<EthereumTransactionTypeExtended[]> {
    const { isApproved, approve }: IERC20ServiceInterface = this.erc20Service;
    const txs: EthereumTransactionTypeExtended[] = [];

    const approved = await isApproved({
      token,
      user,
      spender: distributionAddress,
      amount,
    });

    if (!approved) {
      const approveTx: EthereumTransactionTypeExtended = approve({
        user,
        token,
        spender: distributionAddress,
        amount: DEFAULT_APPROVE_AMOUNT,
      });
      txs.push(approveTx);
    }

    const distribution: MultiFeeDistributionContract =
      this.getContractInstance(distributionAddress);

    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        distribution.populateTransaction.stake(ethers.utils.parseEther(amount), lock),
      from: user,
    });

    txs.push({
      tx: txCallback,
      txType: eEthereumTxType.REWARD_ACTION,
      gas: this.generateTxPriceEstimation([], txCallback),
    });

    return txs;
  }

  public withdraw({
    user,
    amount,
    distributionAddress,
  }: WithdrawMethodType): EthereumTransactionTypeExtended[] {
    const distribution: MultiFeeDistributionContract =
      this.getContractInstance(distributionAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        distribution.populateTransaction.withdraw(ethers.utils.parseEther(amount)),
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

  public withdrawExpiredLocks({
    user,
    distributionAddress,
  }: WithdrawExpiredLocksMethodType): EthereumTransactionTypeExtended[] {
    const distribution: MultiFeeDistributionContract =
      this.getContractInstance(distributionAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => distribution.populateTransaction.withdrawExpiredLocks(),
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

  public exit({
    user,
    distributionAddress,
  }: WithdrawExpiredLocksMethodType): EthereumTransactionTypeExtended[] {
    const distribution: MultiFeeDistributionContract =
      this.getContractInstance(distributionAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => distribution.populateTransaction.exit(false),
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

  public getReward({
    user,
    tokens,
    distributionAddress,
  }: GetMultiFeeDistributionRewardMethodType): EthereumTransactionTypeExtended[] {
    const distribution: MultiFeeDistributionContract =
      this.getContractInstance(distributionAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => distribution.populateTransaction.getReward(tokens),
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

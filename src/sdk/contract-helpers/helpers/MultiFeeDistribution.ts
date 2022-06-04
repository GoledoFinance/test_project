import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  transactionType,
} from '../commons/types';
import {
  MultiFeeDistribution as MultiFeeDistributionContract,
  MultiFeeDistribution__factory,
} from '../typechain';

export type StakeMethodType = {
  user: string;
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
  stake: (args: StakeMethodType) => EthereumTransactionTypeExtended[];
  withdraw: (args: WithdrawMethodType) => EthereumTransactionTypeExtended[];
  withdrawExpiredLocks: (args: WithdrawExpiredLocksMethodType) => EthereumTransactionTypeExtended[];
  getReward: (args: GetMultiFeeDistributionRewardMethodType) => EthereumTransactionTypeExtended[];
}

export class MultiFeeDistribution
  extends BaseService<MultiFeeDistributionContract>
  implements MultiFeeDistributionInterface
{
  constructor(provider: providers.Provider) {
    super(provider, MultiFeeDistribution__factory);
  }
  public stake({
    user,
    amount,
    lock,
    distributionAddress,
  }: StakeMethodType): EthereumTransactionTypeExtended[] {
    const distribution: MultiFeeDistributionContract =
      this.getContractInstance(distributionAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => distribution.populateTransaction.stake(amount, lock),
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

  public withdraw({
    user,
    amount,
    distributionAddress,
  }: WithdrawMethodType): EthereumTransactionTypeExtended[] {
    const distribution: MultiFeeDistributionContract =
      this.getContractInstance(distributionAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => distribution.populateTransaction.withdraw(amount),
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

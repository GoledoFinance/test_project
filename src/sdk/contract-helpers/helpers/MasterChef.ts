import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  transactionType,
} from '../commons/types';
import { MasterChef as MasterChefContract, MasterChef__factory } from '../typechain';

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
  deposit: (args: DepositAndWithdrawMethodType) => EthereumTransactionTypeExtended[];
  withdraw: (args: DepositAndWithdrawMethodType) => EthereumTransactionTypeExtended[];
}

export class MasterChef extends BaseService<MasterChefContract> implements MasterChefInterface {
  constructor(provider: providers.Provider) {
    super(provider, MasterChef__factory);
  }

  public deposit({
    user,
    token,
    amount,
    masterChefAddress,
  }: DepositAndWithdrawMethodType): EthereumTransactionTypeExtended[] {
    const masterChef: MasterChefContract = this.getContractInstance(masterChefAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => masterChef.populateTransaction.deposit(token, amount),
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
    token,
    amount,
    masterChefAddress,
  }: DepositAndWithdrawMethodType): EthereumTransactionTypeExtended[] {
    const masterChef: MasterChefContract = this.getContractInstance(masterChefAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => masterChef.populateTransaction.withdraw(token, amount),
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

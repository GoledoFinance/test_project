import { providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  transactionType,
} from '../commons/types';
import {
  IncentivesController as IncentivesControllerContract,
  IncentivesController__factory,
} from '../typechain';

export type ClaimIncentivesControllerRewardsMethodType = {
  user: string;
  assets: string[];
  incentivesControllerAddress: string;
};

export interface IncentivesControllerInterface {
  claimRewards: (
    args: ClaimIncentivesControllerRewardsMethodType
  ) => EthereumTransactionTypeExtended[];
}

export class IncentivesController
  extends BaseService<IncentivesControllerContract>
  implements IncentivesControllerInterface
{
  constructor(provider: providers.Provider) {
    super(provider, IncentivesController__factory);
  }

  public claimRewards({
    user,
    assets,
    incentivesControllerAddress,
  }: ClaimIncentivesControllerRewardsMethodType): EthereumTransactionTypeExtended[] {
    const incentivesContract: IncentivesControllerContract = this.getContractInstance(
      incentivesControllerAddress
    );
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () => incentivesContract.populateTransaction.claim(user, assets),
      from: user,
    });
    console.log('txCallback', txCallback);

    return [
      {
        tx: txCallback,
        txType: eEthereumTxType.REWARD_ACTION,
        gas: this.generateTxPriceEstimation([], txCallback),
      },
    ];
  }
}

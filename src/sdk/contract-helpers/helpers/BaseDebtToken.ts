import { BigNumber, providers } from 'ethers';
import BaseService from '../commons/BaseService';
import {
  eEthereumTxType,
  EthereumTransactionTypeExtended,
  tEthereumAddress,
  transactionType,
} from '../commons/types';
import { valueToWei } from '../commons/utils';
import { DebtTokenValidator } from '../commons/validators/methodValidators';
import { isEthAddress, isPositiveAmount } from '../commons/validators/paramValidators';
import { IERC20ServiceInterface } from './ERC20';
import { BaseDebtToken as BaseDebtTokenContract } from '../typechain/BaseDebtToken';
import { BaseDebtToken__factory } from '../typechain/factories/BaseDebtToken__factory';

export interface BaseDebtTokenInterface {
  approveDelegation: (args: ApproveDelegationType) => EthereumTransactionTypeExtended;
  isDelegationApproved: (args: DelegationApprovedType) => Promise<boolean>;
}

export type ApproveDelegationType = {
  user: tEthereumAddress;
  delegatee: tEthereumAddress;
  debtTokenAddress: tEthereumAddress;
  amount: string; // wei
};

export type DelegationApprovedType = {
  debtTokenAddress: tEthereumAddress;
  allowanceGiver: tEthereumAddress;
  allowanceReceiver: tEthereumAddress;
  amount: string; // normal
};

export class BaseDebtToken
  extends BaseService<BaseDebtTokenContract>
  implements BaseDebtTokenInterface
{
  readonly erc20Service: IERC20ServiceInterface;

  constructor(provider: providers.Provider, erc20Service: IERC20ServiceInterface) {
    super(provider, BaseDebtToken__factory);
    this.erc20Service = erc20Service;
  }

  @DebtTokenValidator
  public approveDelegation(
    @isEthAddress('user')
    @isEthAddress('delegatee')
    @isEthAddress('debtTokenAddress')
    @isPositiveAmount('amount')
    { user, delegatee, debtTokenAddress, amount }: ApproveDelegationType
  ): EthereumTransactionTypeExtended {
    const debtTokenContract: BaseDebtTokenContract = this.getContractInstance(debtTokenAddress);
    const txCallback: () => Promise<transactionType> = this.generateTxCallback({
      rawTxMethod: async () =>
        debtTokenContract.populateTransaction.approveDelegation(delegatee, amount),
      from: user,
    });

    return {
      tx: txCallback,
      txType: eEthereumTxType.ERC20_APPROVAL,
      gas: this.generateTxPriceEstimation([], txCallback),
    };
  }

  @DebtTokenValidator
  public async isDelegationApproved(
    @isEthAddress('debtTokenAddress')
    @isEthAddress('allowanceGiver')
    @isEthAddress('allowanceReceiver')
    @isPositiveAmount('amount')
    { debtTokenAddress, allowanceGiver, allowanceReceiver, amount }: DelegationApprovedType
  ): Promise<boolean> {
    const decimals: number = await this.erc20Service.decimalsOf(debtTokenAddress);
    const debtTokenContract: BaseDebtTokenContract = this.getContractInstance(debtTokenAddress);
    const delegatedAllowance: BigNumber = await debtTokenContract.borrowAllowance(
      allowanceGiver,
      allowanceReceiver
    );
    const amountBNWithDecimals: BigNumber = BigNumber.from(valueToWei(amount, decimals));

    return delegatedAllowance.gt(amountBNWithDecimals);
  }
}

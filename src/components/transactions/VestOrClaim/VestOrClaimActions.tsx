import { Trans } from '@lingui/macro';
import { useTransactionHandler } from 'src/helpers/useTransactionHandler';
import { ModalType } from 'src/hooks/useModal';
import { useTxBuilderContext } from 'src/hooks/useTxBuilder';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { TxActionsWrapper } from '../TxActionsWrapper';

export type VestOrClaimActionsProps = {
  isWrongNetwork: boolean;
  blocked: boolean;
  type: ModalType;
  tokens: string[];
  amount: string;
  claimRewards: boolean;
  stakingContract: string;
};

export const VestOrClaimActions = ({
  tokens,
  type,
  isWrongNetwork,
  stakingContract,
  blocked,
  claimRewards,
  amount,
}: VestOrClaimActionsProps) => {
  const { incentivesController, staking } = useTxBuilderContext();
  const { currentAccount } = useWeb3Context();

  const { action, loadingTxns, mainTxState, requiresApproval } = useTransactionHandler({
    handleGetTxns: async () => {
      if (type === ModalType.GoledoVesting) {
        return incentivesController.claimRewards({
          user: currentAccount,
          assets: tokens,
          incentivesControllerAddress: stakingContract,
        });
      } else if (type === ModalType.GoledoWithdraw) {
        return staking.withdraw({
          user: currentAccount,
          amount,
          distributionAddress: stakingContract,
        });
      } else if (type === ModalType.GoledoWithdrawExpireLocks) {
        return staking.withdrawExpiredLocks({
          user: currentAccount,
          claimRewards,
          distributionAddress: stakingContract,
        });
      } else if (type === ModalType.GoledoExitStake) {
        return staking.exit({
          user: currentAccount,
          claimRewards,
          distributionAddress: stakingContract,
        });
      } else if (type === ModalType.GoledoClaimRewards) {
        return staking.getReward({
          user: currentAccount,
          tokens,
          distributionAddress: stakingContract,
        });
      } else {
        return [];
      }
    },
    skip:
      blocked ||
      ![
        ModalType.GoledoVesting,
        ModalType.GoledoWithdraw,
        ModalType.GoledoWithdrawExpireLocks,
        ModalType.GoledoExitStake,
        ModalType.GoledoClaimRewards,
      ].includes(type),
    deps: [tokens, type, stakingContract],
  });

  const actionText =
    type === ModalType.GoledoVesting
      ? 'Vest'
      : type === ModalType.GoledoWithdraw || type === ModalType.GoledoWithdrawExpireLocks
      ? 'Withdraw'
      : type === ModalType.GoledoExitStake
      ? 'Exit'
      : 'Claim';
  const actionInProgressText =
    type === ModalType.GoledoVesting
      ? 'Vesting'
      : type === ModalType.GoledoWithdraw || type === ModalType.GoledoWithdrawExpireLocks
      ? 'Withdrawing'
      : type === ModalType.GoledoExitStake
      ? 'Exiting'
      : 'Claiming';

  return (
    <TxActionsWrapper
      requiresApproval={requiresApproval}
      blocked={blocked}
      preparingTransactions={loadingTxns}
      mainTxState={mainTxState}
      isWrongNetwork={isWrongNetwork}
      actionText={<Trans>{actionText}</Trans>}
      actionInProgressText={<Trans>{actionInProgressText}</Trans>}
      handleAction={action}
    />
  );
};

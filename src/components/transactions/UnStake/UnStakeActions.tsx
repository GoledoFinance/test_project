import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useTransactionHandler } from '../../../helpers/useTransactionHandler';
import { useStakeTxBuilderContext } from 'src/hooks/useStakeTxBuilder';
import { TxActionsWrapper } from '../TxActionsWrapper';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export interface UnStakeActionProps extends BoxProps {
  amountToUnStake: string;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  symbol: string;
  blocked: boolean;
  selectedToken: string;
}

export const UnStakeActions = ({
  amountToUnStake,
  isWrongNetwork,
  sx,
  symbol,
  blocked,
  selectedToken,
  ...props
}: UnStakeActionProps) => {
  const { currentAccount } = useWeb3Context();
  const { currentMarketData } = useProtocolDataContext();
  const { masterChef } = useStakeTxBuilderContext(selectedToken);

  const { action, loadingTxns, mainTxState, requiresApproval } = useTransactionHandler({
    handleGetTxns: async () => {
      return masterChef.withdraw({
        user: currentAccount,
        token: selectedToken,
        amount: amountToUnStake,
        masterChefAddress: currentMarketData.addresses.MASTER_CHEF,
      });
    },
    skip: !amountToUnStake || parseFloat(amountToUnStake) === 0 || blocked,
    deps: [amountToUnStake],
  });

  return (
    <TxActionsWrapper
      requiresApproval={requiresApproval}
      blocked={blocked}
      preparingTransactions={loadingTxns}
      handleAction={action}
      requiresAmount
      amount={amountToUnStake}
      actionText={<Trans>UNSTAKE {symbol}</Trans>}
      actionInProgressText={<Trans>UNSTAKING {symbol}</Trans>}
      mainTxState={mainTxState}
      isWrongNetwork={isWrongNetwork}
      sx={sx}
      {...props}
    />
  );
};

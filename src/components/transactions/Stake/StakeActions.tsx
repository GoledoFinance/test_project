import { Trans } from '@lingui/macro';
import { BoxProps } from '@mui/material';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useTxBuilderContext } from 'src/hooks/useTxBuilder';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import { useTransactionHandler } from '../../../helpers/useTransactionHandler';
import { TxActionsWrapper } from '../TxActionsWrapper';

export interface StakeActionProps extends BoxProps {
  amountToStake: string;
  isWrongNetwork: boolean;
  customGasPrice?: string;
  symbol: string;
  blocked: boolean;
  selectedToken: string;
  lock: boolean;
}

export const StakeActions = ({
  amountToStake,
  isWrongNetwork,
  sx,
  symbol,
  blocked,
  lock,
  selectedToken,
  ...props
}: StakeActionProps) => {
  const { currentAccount } = useWeb3Context();
  const { currentMarketData } = useProtocolDataContext();
  const { staking, masterChef } = useTxBuilderContext();

  const { action, approval, requiresApproval, loadingTxns, approvalTxState, mainTxState } =
    useTransactionHandler({
      handleGetTxns: async () => {
        if (symbol === 'GOL') {
          return staking.stake({
            user: currentAccount,
            amount: amountToStake,
            token: selectedToken,
            lock,
            distributionAddress: currentMarketData.addresses.MULTI_FEE_DISTRIBUTION,
          });
        } else {
          return masterChef.deposit({
            user: currentAccount,
            token: selectedToken,
            amount: amountToStake,
            masterChefAddress: currentMarketData.addresses.MASTER_CHEF,
          });
        }
      },
      skip: !amountToStake || parseFloat(amountToStake) === 0 || blocked,
      deps: [amountToStake],
    });

  return (
    <TxActionsWrapper
      requiresApproval={requiresApproval}
      preparingTransactions={loadingTxns}
      mainTxState={mainTxState}
      approvalTxState={approvalTxState}
      isWrongNetwork={isWrongNetwork}
      amount={amountToStake}
      handleAction={action}
      handleApproval={approval}
      symbol={symbol}
      requiresAmount
      actionText={<Trans>{!lock ? 'Stake' : 'Lock'}</Trans>}
      actionInProgressText={<Trans>{!lock ? 'Staking' : 'Locking'}</Trans>}
      sx={sx}
      {...props}
    />
  );
};

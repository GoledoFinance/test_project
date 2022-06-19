import { Trans } from '@lingui/macro';
import { Button, Box } from '@mui/material';

import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { ListTopInfoItem } from '../../../dashboard/lists/ListTopInfoItem';
import { RewardsItem } from './types';
import { useTransactionHandler } from 'src/helpers/useTransactionHandler';
import { useTxBuilderContext } from 'src/hooks/useTxBuilder';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

export const RewardsListItem = ({
  iconSymbol,
  symbol,
  name,
  tokens,
  underlyingAsset,
  earned,
  lockedBalance,
  stakedBalance,
}: RewardsItem) => {
  const { currentAccount } = useWeb3Context();
  const { currentMarketData } = useProtocolDataContext();
  const { incentivesController } = useTxBuilderContext();
  const { action, loadingTxns } = useTransactionHandler({
    handleGetTxns: async () => {
      return incentivesController.claimRewards({
        user: currentAccount,
        assets: tokens,
        incentivesControllerAddress: currentMarketData.addresses.INCENTIVE_CONTROLLER,
      });
    },
    skip: false,
    deps: [],
  });

  return (
    <ListItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      detailsAddress={underlyingAsset}
      data-cy={`dashboardRewardsListItem_${symbol.toUpperCase()}`}
    >
      <ListValueColumn
        symbol={iconSymbol}
        value={earned}
        subValue={'0'}
        disabled={earned === '0'}
      />

      <ListAPRColumn
        value={Number(0)}
        // incentives={aIncentivesData}
        symbol={symbol}
      />

      <ListValueColumn
        symbol={iconSymbol}
        value={stakedBalance}
        subValue={'0'}
        disabled={stakedBalance === '0'}
        capsComponent={
          <Box sx={{ ml: 2.5 }}>
            <ListTopInfoItem
              size="small"
              title={<Trans>APR</Trans>}
              value={0}
              percent
              // tooltip={<TotalSupplyAPYTooltip />}
            />
          </Box>
        }
      />

      <ListValueColumn
        symbol={iconSymbol}
        value={lockedBalance ?? '0'}
        subValue={'0'}
        disabled={lockedBalance === undefined || lockedBalance === '0'}
        capsComponent={
          <Box sx={{ ml: 2.5 }}>
            <ListTopInfoItem
              size="small"
              title={<Trans>APR</Trans>}
              value={0}
              percent
              // tooltip={<TotalSupplyAPYTooltip />}
            />
          </Box>
        }
      />

      <ListButtonsColumn>
        <Button sx={{ height: 32 }} variant="contained" disabled={loadingTxns} onClick={action}>
          <Trans>Vest</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};

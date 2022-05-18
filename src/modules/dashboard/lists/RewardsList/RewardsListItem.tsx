import { Trans } from '@lingui/macro';
import { Button, Box } from '@mui/material';
// import { useModalContext } from 'src/hooks/useModal';

import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';
import { ListTopInfoItem } from '../../../dashboard/lists/ListTopInfoItem';
import { RewardsItem } from './types';

export const RewardsListItem = ({
  iconSymbol,
  symbol,
  name,
  supplyAPR,
  underlyingBalance,
  underlyingBalanceUSD,
  underlyingAsset,
}: RewardsItem) => {
  //   const { openSupply, openWithdraw, openCollateralChange, openSwap } = useModalContext();

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
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />

      <ListAPRColumn
        value={Number(supplyAPR)}
        // incentives={aIncentivesData}
        symbol={symbol}
      />

      <ListValueColumn
        symbol={iconSymbol}
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
        capsComponent={
          <Box sx={{ ml: 2.5 }}>
            <ListTopInfoItem
              size="small"
              title={<Trans>APR</Trans>}
              value={Number(supplyAPR)}
              percent
              // tooltip={<TotalSupplyAPYTooltip />}
            />
          </Box>
        }
      />

      <ListValueColumn
        symbol={iconSymbol}
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
        capsComponent={
          <Box sx={{ ml: 2.5 }}>
            <ListTopInfoItem
              size="small"
              title={<Trans>APR</Trans>}
              value={Number(supplyAPR)}
              percent
              // tooltip={<TotalSupplyAPYTooltip />}
            />
          </Box>
        }
      />

      <ListButtonsColumn>
        <Button
          sx={{ height: 32 }}
          // disabled={!isActive}
          variant="contained"
          //   onClick={() => openWithdraw(underlyingAsset)}
        >
          <Trans>Vest 0.001 GOLEDO</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};

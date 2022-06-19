import { Trans } from '@lingui/macro';
import { Button, Typography, Box } from '@mui/material';
// import { useRouter } from 'next/router';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import BigNumber from 'bignumber.js';

import { IncentivesCard } from '../../components/incentives/IncentivesCard';
import { AMPLWarning } from '../../components/infoTooltips/AMPLWarning';
import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { Link, ROUTES } from '../../components/primitives/Link';
import { TokenIcon } from '../../components/primitives/TokenIcon';
import {
  ComputedReserveData,
  useAppDataContext,
} from '../../hooks/app-data-provider/useAppDataProvider';
import { ListButtonsColumn } from 'src/modules/dashboard/lists/ListButtonsColumn';
import { ModalType, useModalContext } from 'src/hooks/useModal';

export const AssetsListItem = ({ ...reserve }: ComputedReserveData) => {
  // const router = useRouter();
  const { currentMarket, currentMarketData } = useProtocolDataContext();
  const { reservesIncentives, userReserveIncentives } = useAppDataContext();
  const { openVestOrClaim } = useModalContext();

  const aIncentives = reservesIncentives.find(
    (x) => x.tokenAddress.toLowerCase() === reserve.aTokenAddress.toLowerCase()
  );
  const vIncentives = reservesIncentives.find(
    (x) => x.tokenAddress.toLowerCase() === reserve.variableDebtTokenAddress.toLowerCase()
  );
  let earned = new BigNumber('0');
  userReserveIncentives.forEach((v) => {
    if (
      v.tokenAddress.toLowerCase() === reserve.aTokenAddress.toLowerCase() ||
      v.tokenAddress.toLowerCase() == reserve.variableDebtTokenAddress.toLowerCase()
    ) {
      earned = earned.plus(v.userRewardsInformation[0]?.userUnclaimedRewards || '0');
    }
  });

  return (
    <ListItem
      px={6}
      minHeight={76}
      // onClick={() => router.push(ROUTES.reserveOverview(reserve.underlyingAsset, currentMarket))}
      sx={{ cursor: 'pointer' }}
      button
    >
      <ListColumn isRow maxWidth={280}>
        <TokenIcon symbol={reserve.iconSymbol} fontSize="large" />
        <Box sx={{ pl: 3.5, overflow: 'hidden' }}>
          <Typography variant="h4" noWrap>
            {reserve.name}
          </Typography>
          <Box
            sx={{
              p: { xs: '0', xsm: '3.625px 0px' },
            }}
          >
            <Typography variant="subheader2" color="text.muted" noWrap>
              {reserve.symbol}
            </Typography>
          </Box>
        </Box>
        {reserve.symbol === 'AMPL' && <AMPLWarning />}
      </ListColumn>

      <ListColumn>
        <FormattedNumber compact value={reserve.totalLiquidity} variant="main16" />
        <ReserveSubheader value={reserve.totalLiquidityUSD} />
      </ListColumn>

      <ListColumn>
        <IncentivesCard
          value={reserve.supplyAPY}
          incentives={aIncentives}
          symbol={reserve.symbol}
          variant="main16"
          symbolsVariant="secondary16"
        />
      </ListColumn>

      <ListColumn>
        <FormattedNumber compact value={reserve.totalDebt} variant="main16" />
        <ReserveSubheader value={reserve.totalDebtUSD} />
      </ListColumn>

      <ListColumn>
        <IncentivesCard
          value={reserve.borrowingEnabled ? reserve.variableBorrowAPY : '-1'}
          incentives={vIncentives}
          symbol={reserve.symbol}
          variant="main16"
          symbolsVariant="secondary16"
        />
      </ListColumn>

      <ListButtonsColumn sx={{ maxWidth: 270, minWidth: 270 }}>
        <Button
          disabled={earned.isZero()}
          variant="contained"
          onClick={() =>
            openVestOrClaim(
              ModalType.GoledoVesting,
              earned.toString(),
              [reserve.aTokenAddress, reserve.variableDebtTokenAddress],
              currentMarketData.addresses.INCENTIVE_CONTROLLER
            )
          }
          sx={{ mr: 1.5, height: 32 }}
        >
          <Trans>Vest {earned.toPrecision(4)} Goledo</Trans>
        </Button>
        <Button
          sx={{ height: 32 }}
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(reserve.underlyingAsset, currentMarket)}
        >
          <Trans>Details</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItem>
  );
};

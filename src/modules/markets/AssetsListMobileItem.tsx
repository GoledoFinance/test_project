import { Trans } from '@lingui/macro';
import { Button, Divider, Box } from '@mui/material';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { ReserveSubheader } from 'src/components/ReserveSubheader';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import BigNumber from 'bignumber.js';

import { IncentivesCard } from '../../components/incentives/IncentivesCard';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { Link, ROUTES } from '../../components/primitives/Link';
import { Row } from '../../components/primitives/Row';
import {
  ComputedReserveData,
  useAppDataContext,
} from '../../hooks/app-data-provider/useAppDataProvider';
import { ListMobileItemWrapper } from '../dashboard/lists/ListMobileItemWrapper';
import { ModalType, useModalContext } from 'src/hooks/useModal';

export const AssetsListMobileItem = ({ ...reserve }: ComputedReserveData) => {
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
    <ListMobileItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
      underlyingAsset={reserve.underlyingAsset}
      currentMarket={currentMarket}
    >
      <Row caption={<Trans>Total supplied</Trans>} captionVariant="description" mb={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-end' },
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <FormattedNumber compact value={reserve.totalLiquidity} variant="secondary14" />
          <ReserveSubheader value={reserve.totalLiquidityUSD} rightAlign={true} />
        </Box>
      </Row>
      <Row
        caption={<Trans>Supply APY</Trans>}
        captionVariant="description"
        mb={3}
        align="flex-start"
      >
        <IncentivesCard
          align="flex-end"
          value={reserve.supplyAPY}
          incentives={aIncentives}
          symbol={reserve.symbol}
          variant="secondary14"
        />
      </Row>

      <Divider sx={{ mb: 3 }} />

      <Row caption={<Trans>Total borrowed</Trans>} captionVariant="description" mb={3}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'flex-end' },
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <FormattedNumber compact value={reserve.totalDebt} variant="secondary14" />
          <ReserveSubheader value={reserve.totalDebtUSD} rightAlign={true} />
        </Box>
      </Row>
      <Row
        caption={
          <VariableAPYTooltip
            text={<Trans>Borrow APY</Trans>}
            key="APY_list_mob_variable_type"
            variant="description"
          />
        }
        captionVariant="description"
        mb={3}
        align="flex-start"
      >
        <IncentivesCard
          align="flex-end"
          value={reserve.borrowingEnabled ? reserve.variableBorrowAPY : '-1'}
          incentives={vIncentives}
          symbol={reserve.symbol}
          variant="secondary14"
        />
      </Row>

      {!earned.isZero() && (
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
          fullWidth
          sx={{ mb: 1.5 }}
        >
          <Trans>
            Vest
            <FormattedNumber
              value={earned.toString()}
              variant="secondary12"
              symbolsColor="common.white"
              compact={true}
              sx={{ ml: 1.5, mr: 1.5 }}
            />
            Goledo
          </Trans>
        </Button>
      )}

      <Button
        variant="outlined"
        component={Link}
        href={ROUTES.reserveOverview(reserve.underlyingAsset, currentMarket)}
        fullWidth
      >
        <Trans>View details</Trans>
      </Button>
    </ListMobileItemWrapper>
  );
};

import { InterestRate } from '@goledo-sdk/contract-helpers';
import { Trans } from '@lingui/macro';
import { Box, Button } from '@mui/material';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { APYTypeTooltip } from '../../../../components/infoTooltips/APYTypeTooltip';
import { Row } from '../../../../components/primitives/Row';
import {
  ComputedUserReserveData,
  ReserveIncentiveData,
} from '../../../../hooks/app-data-provider/useAppDataProvider';
import { useModalContext } from '../../../../hooks/useModal';
import { ListItemAPYButton } from '../ListItemAPYButton';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';

export const BorrowedPositionsListMobileItem = ({
  reserve,
  totalBorrows,
  totalBorrowsUSD,
  borrowRateMode,
  stableBorrowAPY,
  reservesIncentives,
}: ComputedUserReserveData & {
  borrowRateMode: InterestRate;
  reservesIncentives: ReserveIncentiveData[];
}) => {
  const { currentMarket } = useProtocolDataContext();
  const { openBorrow, openRepay } = useModalContext();
  const {
    symbol,
    iconSymbol,
    name,
    isActive,
    isFrozen,
    borrowingEnabled,
    stableBorrowRateEnabled,
    variableBorrowAPY,
    underlyingAsset,
  } = reserve;
  const incentives = reservesIncentives.find(
    (x) => x.tokenAddress.toLowerCase() === reserve.variableDebtTokenAddress.toLowerCase()
  );

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={reserve.underlyingAsset}
      currentMarket={currentMarket}
    >
      <ListValueRow
        title={<Trans>Debt</Trans>}
        value={Number(totalBorrows)}
        subValue={Number(totalBorrowsUSD)}
        disabled={Number(totalBorrows) === 0}
      />

      <Row caption={<Trans>APY</Trans>} align="flex-start" captionVariant="description" mb={2}>
        <IncentivesCard
          value={Number(
            borrowRateMode === InterestRate.Variable ? variableBorrowAPY : stableBorrowAPY
          )}
          incentives={incentives}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Row
        caption={
          <APYTypeTooltip text={<Trans>APY type</Trans>} key="APY type" variant="description" />
        }
        captionVariant="description"
        mb={2}
      >
        <ListItemAPYButton
          stableBorrowRateEnabled={stableBorrowRateEnabled}
          borrowRateMode={borrowRateMode}
          disabled={!stableBorrowRateEnabled || isFrozen || !isActive}
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          onClick={() => {}}
          stableBorrowAPY={stableBorrowAPY}
          variableBorrowAPY={variableBorrowAPY}
          underlyingAsset={underlyingAsset}
          currentMarket={currentMarket}
        />
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Button
          disabled={!isActive}
          variant="contained"
          onClick={() => openRepay(underlyingAsset, borrowRateMode)}
          sx={{ mr: 1.5 }}
          fullWidth
        >
          <Trans>Repay</Trans>
        </Button>
        <Button
          disabled={!isActive || !borrowingEnabled || isFrozen}
          variant="outlined"
          onClick={() => openBorrow(underlyingAsset)}
          fullWidth
        >
          <Trans>Borrow</Trans>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};

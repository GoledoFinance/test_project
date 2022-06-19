import { Trans } from '@lingui/macro';
import { Box, Button } from '@mui/material';
import { VariableAPYTooltip } from 'src/components/infoTooltips/VariableAPYTooltip';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

import { CapsHint } from '../../../../components/caps/CapsHint';
import { CapType } from '../../../../components/caps/helper';
import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { Link, ROUTES } from '../../../../components/primitives/Link';
import { Row } from '../../../../components/primitives/Row';
import { useModalContext } from '../../../../hooks/useModal';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';
import { BorrowAssetsItem } from './types';

export const BorrowAssetsListMobileItem = ({
  symbol,
  iconSymbol,
  name,
  availableBorrows,
  availableBorrowsInUSD,
  totalBorrows,
  variableBorrowRate,
  underlyingAsset,
  isFreezed,
  variableDebtTokenAddress,
  reservesIncentives,
}: BorrowAssetsItem) => {
  const { openBorrow } = useModalContext();
  const { currentMarket } = useProtocolDataContext();
  const borrowButtonDisable = isFreezed || Number(availableBorrows) <= 0;
  const incentives = reservesIncentives.find(
    (x) => x.tokenAddress.toLowerCase() === variableDebtTokenAddress.toLowerCase()
  );

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      currentMarket={currentMarket}
    >
      <ListValueRow
        title={<Trans>Available to borrow</Trans>}
        value={Number(availableBorrows)}
        subValue={Number(availableBorrowsInUSD)}
        disabled={Number(availableBorrows) === 0}
        capsComponent={
          <CapsHint
            capType={CapType.borrowCap}
            capAmount={'0'}
            totalAmount={totalBorrows}
            withoutText
          />
        }
      />

      <Row
        caption={
          <VariableAPYTooltip
            text={<Trans>APY</Trans>}
            key="APY_dash_mob_variable_ type"
            variant="description"
          />
        }
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <IncentivesCard
          value={Number(variableBorrowRate)}
          incentives={incentives}
          symbol={symbol}
          variant="secondary14"
        />
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Button
          disabled={borrowButtonDisable}
          variant="contained"
          onClick={() => openBorrow(underlyingAsset)}
          sx={{ mr: 1.5 }}
          fullWidth
        >
          <Trans>Borrow</Trans>
        </Button>
        <Button
          variant="outlined"
          component={Link}
          href={ROUTES.reserveOverview(underlyingAsset, currentMarket)}
          fullWidth
        >
          <Trans>Details</Trans>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};

import { valueToBigNumber } from '@goledo-sdk/math-utils';
import { Trans } from '@lingui/macro';
import { useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';

import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import { useAppDataContext } from '../../hooks/app-data-provider/useAppDataProvider';

export const MarketsTopPanel = () => {
  const { reserves, loading } = useAppDataContext();

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const aggregatedStats = reserves.reduce(
    (acc, reserve) => {
      return {
        totalLiquidity: acc.totalLiquidity.plus(reserve.totalLiquidityUSD),
        totalDebt: acc.totalDebt.plus(reserve.totalDebtUSD),
      };
    },
    {
      totalLiquidity: valueToBigNumber(0),
      totalDebt: valueToBigNumber(0),
    }
  );

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsVariant = downToSM ? 'secondary16' : 'secondary21';

  return (
    <TopInfoPanel pageTitle={<Trans>Markets</Trans>} bridge={[]} withMarketSwitcher>
      <TopInfoPanelItem hideIcon title={<Trans>Total Market Size</Trans>} loading={loading}>
        <FormattedNumber
          value={aggregatedStats.totalLiquidity.toString()}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#fff"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
      <TopInfoPanelItem hideIcon title={<Trans>Total Available</Trans>} loading={loading}>
        <FormattedNumber
          value={aggregatedStats.totalLiquidity.minus(aggregatedStats.totalDebt).toString()}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#fff"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
      <TopInfoPanelItem hideIcon title={<Trans>Total Borrows</Trans>} loading={loading}>
        <FormattedNumber
          value={aggregatedStats.totalDebt.toString()}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#fff"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
    </TopInfoPanel>
  );
};

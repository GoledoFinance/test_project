// import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
// import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackOutlined';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
// import { useRouter } from 'next/router';
// import { getMarketInfoById, MarketLogo } from 'src/components/MarketSwitcher';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
// import { Link } from 'src/components/primitives/Link';
// import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { NetAPYTooltip } from 'src/components/infoTooltips/NetAPYTooltip';

import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import {
  // ComputedReserveData,
  useAppDataContext,
} from '../../hooks/app-data-provider/useAppDataProvider';

// import CubeIcon from '../../../public/icons/markets/cube-icon.svg';
// import PieIcon from '../../../public/icons/markets/pie-icon.svg';
// import UptrendIcon from '../../../public/icons/markets/uptrend-icon.svg';
// import DollarIcon from '../../../public/icons/markets/dollar-icon.svg';

interface ReserveTopDetailsProps {
  underlyingAsset: string;
}

export const ReserveTopDetails = ({}: ReserveTopDetailsProps) => {
  // const router = useRouter();
  const { loading } = useAppDataContext();
  // const { currentMarket, currentNetworkConfig } = useProtocolDataContext();
  // const { market, network } = getMarketInfoById(currentMarket);

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const symbolsTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  return (
    <TopInfoPanel
      titleComponent={
        <Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: downToSM ? 'flex-start' : 'center',
              alignSelf: downToSM ? 'flex-start' : 'center',
              mb: 4,
              minHeight: '40px',
              flexDirection: downToSM ? 'column' : 'row',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Typography variant="subheader1" sx={{ fontSize: 36, color: 'common.white' }}>
                <Trans>Overview</Trans>
              </Typography>
            </Box>
          </Box>
        </Box>
      }
    >
      <TopInfoPanelItem hideIcon title={<Trans>Total Amount</Trans>} loading={loading}>
        <FormattedNumber
          value={212992123}
          symbol="USD"
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="#fff"
        />
        <FormattedNumber
          value={212992123}
          symbol="USD"
          variant={valueTypographyVariant}
          symbolsVariant={symbolsTypographyVariant}
          symbolsColor="#ccc"
          sx={{
            fontSize: 12,
            color: '#ccc',
            span: {
              fontSize: 12,
            },
          }}
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem
        hideIcon
        title={
          <div style={{ display: 'flex' }}>
            <Trans>Liquidation threshold</Trans>
            <NetAPYTooltip />
          </div>
        }
        loading={loading}
      >
        <FormattedNumber
          value={1}
          variant={valueTypographyVariant}
          visibleDecimals={2}
          percent
          symbolsColor="#fff"
          symbolsVariant={'tooltip'}
          sx={{ span: { fontSize: 21 } }}
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem
        hideIcon
        title={
          <div style={{ display: 'flex' }}>
            <Trans>Liquidation Penalty</Trans>
            <NetAPYTooltip />
          </div>
        }
        loading={loading}
      >
        <FormattedNumber
          value={1}
          variant={valueTypographyVariant}
          visibleDecimals={2}
          percent
          symbolsColor="#fff"
          symbolsVariant={'tooltip'}
          sx={{ span: { fontSize: 21 } }}
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem
        hideIcon
        title={
          <div style={{ display: 'flex' }}>
            <Trans>Utilization Rate</Trans>
            <NetAPYTooltip />
          </div>
        }
        loading={loading}
      >
        <FormattedNumber
          value={1}
          variant={valueTypographyVariant}
          visibleDecimals={2}
          percent
          symbolsColor="#fff"
          symbolsVariant={'tooltip'}
          sx={{ span: { fontSize: 21 } }}
        />
      </TopInfoPanelItem>
    </TopInfoPanel>
  );
};

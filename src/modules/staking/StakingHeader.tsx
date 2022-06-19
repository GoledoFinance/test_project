import { IncentiveDataHumanized } from '@goledo-sdk/contract-helpers';
import { Trans } from '@lingui/macro';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
// import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { TopInfoPanel } from 'src/components/TopInfoPanel/TopInfoPanel';

// import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';

interface StakingHeaderProps {
  // tvl: string;
  // stkEmission: string;
  rewardData?: IncentiveDataHumanized;
  loading: boolean;
}

export const StakingHeader: React.FC<StakingHeaderProps> = ({}) => {
  const theme = useTheme();
  const upToLG = useMediaQuery(theme.breakpoints.up('lg'));
  // const downToSM = useMediaQuery(theme.breakpoints.down('sm'));
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  // const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  // const symbolsVariant = downToSM ? 'secondary16' : 'secondary21';

  return (
    <TopInfoPanel
      titleComponent={
        <Box mb={4}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Typography variant={downToXSM ? 'h2' : upToLG ? 'display1' : 'h1'}>
              <Trans>Stake</Trans>
            </Typography>
          </Box>
        </Box>
      }
      bridge={[]}
    >
      {/*<TopInfoPanelItem
        hideIcon
        title={<Trans>Your Locked + staked Goledo</Trans>}
        loading={loading}
      >
        <FormattedNumber
          value={rewardData?.stakeUserData.totalBalance || '0'}
          symbol="Goledo"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#fff"
          symbolsVariant={symbolsVariant}
        />
        <Typography sx={{ color: '#ccc', fontSize: 12 }} variant={'description'} component="div">
          Locked {rewardData?.stakeUserData.lockedBalance} Goledo
          <br />
          Staked {rewardData?.stakeUserData.unlockedBalance} Goledo
        </Typography>
      </TopInfoPanelItem>
      
      <TopInfoPanelItem hideIcon title={<Trans>Your Daily Revenue</Trans>} loading={loading}>
        <FormattedNumber
          value={0.0001}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#fff"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>
      <TopInfoPanelItem hideIcon title={<Trans>Your Weeklu Revenue</Trans>} loading={loading}>
        <FormattedNumber
          value={0.001}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#fff"
          symbolsVariant={symbolsVariant}
        />
        <Typography sx={{ color: '#ccc', fontSize: 12 }} variant={'description'} component="div">
          {'<$0.01 / month'}
          <br />
          $0.05 / year
        </Typography>
    </TopInfoPanelItem>

      <Divider orientation="vertical" flexItem sx={{ borderColor: '#ccc' }} />

      <TopInfoPanelItem hideIcon title={<Trans>Your Daily Platform Fees</Trans>} loading={loading}>
        <FormattedNumber
          value={0.001}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#fff"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>

      <TopInfoPanelItem hideIcon title={<Trans>Your Daily Penalty Fees</Trans>} loading={loading}>
        <FormattedNumber
          value={0.001}
          symbol="USD"
          variant={valueTypographyVariant}
          visibleDecimals={2}
          compact
          symbolsColor="#fff"
          symbolsVariant={symbolsVariant}
        />
      </TopInfoPanelItem>*/}
    </TopInfoPanel>
  );
};

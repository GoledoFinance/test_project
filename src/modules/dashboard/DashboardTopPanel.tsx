import { valueToBigNumber } from '@goledo-sdk/math-utils';
import { Trans } from '@lingui/macro';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import * as React from 'react';
import { useState } from 'react';
// import { useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import HALTooltip from '../../components/HALTooltip';
import { HealthFactorNumber } from '../../components/HealthFactorNumber';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';
import { NoData } from '../../components/primitives/NoData';
import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';
import { TopInfoPanelItem } from '../../components/TopInfoPanel/TopInfoPanelItem';
import { useAppDataContext } from '../../hooks/app-data-provider/useAppDataProvider';
import { LiquidationRiskParametresInfoModal } from './LiquidationRiskParametresModal/LiquidationRiskParametresModal';

import WalletIcon from '../../../public/icons/markets/wallet-icon.svg';
import NetAPYIcon from '../../../public/icons/markets/net-apy-icon.svg';
import EmptyHeartIcon from '../../../public/icons/markets/empty-heart-icon.svg';
// import ClaimGiftIcon from '../../../public/icons/markets/claim-gift-icon.svg';

import { NetAPYTooltip } from 'src/components/infoTooltips/NetAPYTooltip';
// import { RewardsTooltip } from 'src/components/infoTooltips/RewardsTooltip';

export const DashboardTopPanel = () => {
  const { currentNetworkConfig } = useProtocolDataContext();
  const { user, loading } = useAppDataContext();
  const { currentAccount } = useWeb3Context();
  const [open, setOpen] = useState(false);

  const theme = useTheme();
  const downToSM = useMediaQuery(theme.breakpoints.down('sm'));

  /*const { claimableRewardsUsd } = Object.keys(user.calculatedUserIncentives).reduce(
    (acc, rewardTokenAddress) => {
      const incentive: UserIncentiveData = user.calculatedUserIncentives[rewardTokenAddress];
      const rewardBalance = normalize(incentive.claimableRewards, incentive.rewardTokenDecimals);

      let tokenPrice = 0;
      // getting price from reserves for the native rewards for v2 markets
      if (!currentMarketData.v3 && Number(rewardBalance) > 0) {
        reserves.forEach((reserve) => {
          if (reserve.symbol === currentNetworkConfig.wrappedBaseAssetSymbol) {
            tokenPrice = Number(reserve.priceInUSD);
          }
        });
      } else {
        tokenPrice = Number(incentive.rewardPriceFeed);
      }

      const rewardBalanceUsd = Number(rewardBalance) * tokenPrice;

      if (rewardBalanceUsd > 0) {
        if (acc.assets.indexOf(incentive.rewardTokenSymbol) === -1) {
          acc.assets.push(incentive.rewardTokenSymbol);
        }

        acc.claimableRewardsUsd += Number(rewardBalanceUsd);
      }

      return acc;
    },
    { claimableRewardsUsd: 0, assets: [] } as { claimableRewardsUsd: number; assets: string[] }
  );*/

  const loanToValue =
    user?.totalCollateralMarketReferenceCurrency === '0'
      ? '0'
      : valueToBigNumber(user?.totalBorrowsMarketReferenceCurrency || '0')
          .dividedBy(user?.totalCollateralMarketReferenceCurrency || '1')
          .toFixed();

  const valueTypographyVariant = downToSM ? 'main16' : 'main21';
  const noDataTypographyVariant = downToSM ? 'secondary16' : 'secondary21';

  return (
    <>
      <TopInfoPanel
        pageTitle={<Trans>Dashboard</Trans>}
        withMarketSwitcher
        bridge={currentNetworkConfig.bridge}
      >
        <TopInfoPanelItem icon={<WalletIcon />} title={<Trans>Net worth</Trans>} loading={loading}>
          {currentAccount ? (
            <FormattedNumber
              value={Number(user?.netWorthUSD || 0)}
              symbol="USD"
              variant={valueTypographyVariant}
              visibleDecimals={2}
              compact
              symbolsColor="#fff"
              symbolsVariant={noDataTypographyVariant}
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ color: '#fff' }} />
          )}
        </TopInfoPanelItem>

        <TopInfoPanelItem
          icon={<NetAPYIcon />}
          title={
            <div style={{ display: 'flex' }}>
              <Trans>Net APY</Trans>
              <NetAPYTooltip />
            </div>
          }
          loading={loading}
        >
          {currentAccount ? (
            <FormattedNumber
              value={user.netAPY}
              variant={valueTypographyVariant}
              visibleDecimals={2}
              percent
              symbolsColor="#fff"
              symbolsVariant={noDataTypographyVariant}
            />
          ) : (
            <NoData variant={noDataTypographyVariant} sx={{ color: '#fff' }} />
          )}
        </TopInfoPanelItem>

        {/* TODO: need to show? */}
        {/* {currentAccount && user?.healthFactor !== '-1' && ( */}
        <TopInfoPanelItem
          icon={<EmptyHeartIcon />}
          title={
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
              <Trans>Health Factor</Trans>
              <HALTooltip />
            </Box>
          }
          loading={loading}
        >
          <HealthFactorNumber
            value={user?.healthFactor || '-1'}
            variant={valueTypographyVariant}
            onInfoClick={() => setOpen(true)}
          />
        </TopInfoPanelItem>
        {/* )} */}

        {/* TODO: need to show? */}
        {/* {currentAccount && claimableRewardsUsd > 0 && ( */}
        {/*<TopInfoPanelItem
          icon={<ClaimGiftIcon />}
          title={
            <div style={{ display: 'flex' }}>
              <Trans>Rewards</Trans>
              <RewardsTooltip />
            </div>
          }
          hideIcon
          loading={loading}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: { xs: 'flex-start', xsm: 'center' },
              flexDirection: { xs: 'column', xsm: 'row' },
            }}
          >
            <Box sx={{ display: 'inline-flex', alignItems: 'center' }} data-cy={'Claim_Box'}>
              <FormattedNumber
                value={claimableRewardsUsd}
                variant={valueTypographyVariant}
                visibleDecimals={2}
                compact
                symbol="USD"
                symbolsColor="#fff"
                symbolsVariant={noDataTypographyVariant}
                data-cy={'Claim_Value'}
              />
            </Box>
          </Box>
        </TopInfoPanelItem>*/}
        {/* )} */}
      </TopInfoPanel>

      <LiquidationRiskParametresInfoModal
        open={open}
        setOpen={setOpen}
        healthFactor={user?.healthFactor || '-1'}
        loanToValue={loanToValue}
        currentLoanToValue={user?.currentLoanToValue || '0'}
        currentLiquidationThreshold={user?.currentLiquidationThreshold || '0'}
      />
    </>
  );
};

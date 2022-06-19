// import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';
import { Trans } from '@lingui/macro';
import { useMediaQuery, useTheme } from '@mui/material';
import { useRewardData } from 'src/hooks/app-data-provider/useRewardData';
// import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';
import BigNumber from 'bignumber.js';

import { ListWrapper } from '../../../../components/lists/ListWrapper';
import { DashboardContentNoData } from '../../DashboardContentNoData';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';

import { RewardsListItem } from './RewardsListItem';
import { RewardsItem } from './types';

export const RewardsList = () => {
  const { loading, data: rewardData } = useRewardData();
  //   const { currentNetworkConfig } = useProtocolDataContext();
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const head = [
    <Trans key="Balance">Earned</Trans>,
    <Trans key="APY">APY</Trans>,
    <Trans key="staked">Your staked balance</Trans>,
    <Trans key="locked">Your locked balance</Trans>,
  ];

  if (loading) {
    return <ListLoader title={<Trans>Rewards</Trans>} head={head} assetsTitle={null} />;
  }

  const controllerTokens: string[] = [];
  const chefTokens: string[] = [];
  let totalControllerIncentive: BigNumber = new BigNumber('0');
  let totalChefIncentive: BigNumber = new BigNumber('0');
  if (rewardData) {
    rewardData.controllerUserData.forEach((data) => {
      totalControllerIncentive = totalControllerIncentive.plus(new BigNumber(data.claimable));
      if (data.claimable !== '0') {
        controllerTokens.push(data.token);
      }
    });
    rewardData.chefUserData.forEach((data) => {
      totalChefIncentive = totalChefIncentive.plus(new BigNumber(data.claimable));
      if (data.claimable !== '0') {
        chefTokens.push(data.token);
      }
    });
  }
  if (totalControllerIncentive.isZero() && totalChefIncentive.isZero()) {
    return null;
  }

  const data: RewardsItem[] = [];
  if (rewardData && !totalControllerIncentive.isZero()) {
    data.push({
      underlyingAsset: '',
      earned: totalControllerIncentive.toString(10),
      stakedBalance: rewardData.stakeUserData.unlockedBalance,
      lockedBalance: rewardData.stakeUserData.lockedBalance,
      ...fetchIconSymbolAndName({
        underlyingAsset: '',
        symbol: 'GDO',
      }),
      tokens: controllerTokens,
    });
  }

  return (
    <ListWrapper
      title={<Trans>Rewards</Trans>}
      localStorageName="rewardsAssetsDashboardTableCollapse"
      noData={!data?.length}
    >
      {data.length ? (
        <>
          {!downToXSM && <ListHeader head={head} />}
          {data.map((item, index) =>
            downToXSM ? null : <RewardsListItem {...item} key={index} />
          )}
        </>
      ) : (
        <DashboardContentNoData text={<Trans>Nothing supplied yet</Trans>} />
      )}
    </ListWrapper>
  );
};

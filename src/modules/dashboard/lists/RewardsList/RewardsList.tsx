import { Trans } from '@lingui/macro';
import { useMediaQuery, useTheme } from '@mui/material';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';
import BigNumber from 'bignumber.js';
import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';

import { ListWrapper } from '../../../../components/lists/ListWrapper';
import { DashboardContentNoData } from '../../DashboardContentNoData';
import { ListHeader } from '../ListHeader';
import { ListLoader } from '../ListLoader';

import { RewardsListMobileItem } from './RewardsListMobileItem';
import { RewardsListItem } from './RewardsListItem';
import { RewardsItem } from './types';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export const RewardsList = () => {
  const { loading, userReserveIncentives, userMasterChefIncentives, userGoledoStake } =
    useAppDataContext();
  const { currentMarketData } = useProtocolDataContext();
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
  let symbol: string | undefined;
  let underlyingAsset: string | undefined;
  userReserveIncentives.forEach((data) => {
    const claimable =
      data.userRewardsInformation.length > 0
        ? data.userRewardsInformation[0].userUnclaimedRewards
        : '0';
    if (data.userRewardsInformation.length > 0) {
      symbol = data.userRewardsInformation[0].rewardTokenSymbol;
      underlyingAsset = data.userRewardsInformation[0].rewardTokenAddress;
    }
    totalControllerIncentive = totalControllerIncentive.plus(new BigNumber(claimable));
    if (claimable !== '0') {
      controllerTokens.push(data.tokenAddress);
    }
  });
  userMasterChefIncentives.forEach((data) => {
    const claimable =
      data.userRewardsInformation.length > 0
        ? data.userRewardsInformation[0].userUnclaimedRewards
        : '0';
    totalChefIncentive = totalChefIncentive.plus(new BigNumber(claimable));
    if (claimable !== '0') {
      chefTokens.push(data.tokenAddress);
    }
  });
  if (totalControllerIncentive.isZero() && totalChefIncentive.isZero()) {
    return null;
  }

  const data: RewardsItem[] = [];
  if (!totalControllerIncentive.isZero() && underlyingAsset && symbol) {
    const lockedBalance = new BigNumber(userGoledoStake.totalBalance).minus(
      userGoledoStake.unlockedBalance
    );
    data.push({
      underlyingAsset: API_ETH_MOCK_ADDRESS.toLowerCase(),
      earned: totalControllerIncentive.toString(10),
      stakedBalance: userGoledoStake.unlockedBalance,
      lockedBalance: lockedBalance.toString(10),
      ...fetchIconSymbolAndName({
        underlyingAsset,
        symbol,
      }),
      tokens: controllerTokens,
      stakingContract: currentMarketData.addresses.INCENTIVE_CONTROLLER,
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
            downToXSM ? (
              <RewardsListMobileItem {...item} key={index} />
            ) : (
              <RewardsListItem {...item} key={index} />
            )
          )}
        </>
      ) : (
        <DashboardContentNoData text={<Trans>Nothing supplied yet</Trans>} />
      )}
    </ListWrapper>
  );
};

import { ChainId, IncentiveDataProvider } from '@goledo-sdk/contract-helpers';
import { useApolloClient } from '@apollo/client';
import { useState } from 'react';
import { getProvider } from 'src/utils/marketsAndNetworksConfig';

import BigNumber from 'bignumber.js';

import { usePolling } from '../usePolling';
import {
  C_ReservesIncentivesDocument,
  C_ReservesIncentivesQuery,
  C_UserReservesIncentivesDocument,
  C_UserReservesIncentivesQuery,
} from './graphql/hooks';
import { constants } from 'ethers';
import {
  C_MasterChefIncentivesDocument,
  C_MasterChefIncentivesQuery,
  C_UserMasterChefIncentivesDocument,
  C_UserMasterChefIncentivesQuery,
} from './graphql/master-chef-hooks';
import { C_UserGoledoStakeDataDocument, C_UserGoledoStakeDataQuery } from './graphql/stake-hooks';

// interval in which the rpc data is refreshed
const POLLING_INTERVAL = 10 * 1000;

// Fetch reserve and user incentive data from UiIncentiveDataProvider
export function useRewardDataRPC(
  incentiveDataProviderAddress: string,
  lendingPoolAddressProvider: string,
  chainId: ChainId,
  skip: boolean,
  currentAccount?: string
) {
  const { cache } = useApolloClient();
  const [loadingRewardData, setLoadingRewardData] = useState<boolean>(true);
  const [errorRewardData, setErrorRewardData] = useState<boolean>(false);

  const fetchRewardData = async () => {
    const provider = getProvider(chainId);

    try {
      setLoadingRewardData(true);
      const incentiveDataProviderContract = new IncentiveDataProvider({
        incentiveDataProviderAddress,
        provider,
        chainId,
      });
      const reservesResponse = await incentiveDataProviderContract.getUserIncentiveHumanized({
        user: currentAccount || constants.AddressZero,
      });

      // reserve incentives
      cache.writeQuery<C_ReservesIncentivesQuery>({
        query: C_ReservesIncentivesDocument,
        data: {
          __typename: 'Query',
          reservesIncentives: reservesResponse.controllerUserData.map((incentive) => {
            const emissionPerSecond = new BigNumber(
              reservesResponse.controllerData.rewardsPerSecond
            )
              .multipliedBy(incentive.allocPoint)
              .div(reservesResponse.controllerData.totalAllocPoint);
            return {
              __typename: 'ReserveIncentiveData',
              id: `${chainId}-${currentAccount}-${incentive.token}-${lendingPoolAddressProvider}`.toLowerCase(),
              data: {
                __typename: 'IncentiveData',
                tokenAddress: incentive.token,
                tokenSymbol: incentive.symbol,
                tokenDecimals: incentive.decimals,
                totalStakedBalance: incentive.totalSupply,
                rewardsTokenInformation: [
                  {
                    __typename: 'RewardInfo',
                    emissionEndTimestamp: 2e9,
                    emissionPerSecond: emissionPerSecond.toString(),
                    priceFeedDecimals: 18,
                    rewardPriceFeed: '0',
                    rewardTokenAddress: reservesResponse.stakeData.token,
                    rewardTokenDecimals: reservesResponse.stakeData.decimals,
                    rewardOracleAddress: '',
                    rewardTokenSymbol: reservesResponse.stakeData.symbol,
                  },
                ],
              },
            };
          }),
        },
        variables: { lendingPoolAddressProvider, userAddress: currentAccount, chainId },
      });

      cache.writeQuery<C_UserReservesIncentivesQuery>({
        query: C_UserReservesIncentivesDocument,
        data: {
          __typename: 'Query',
          userReservesIncentives: reservesResponse.controllerUserData.map((incentive) => ({
            __typename: 'UserIncentivesData',
            id: `${chainId}-${currentAccount}-${incentive.token}-${lendingPoolAddressProvider}`.toLowerCase(),
            data: {
              __typename: 'UserIncentiveData',
              tokenAddress: incentive.token,
              userStakedBalance: incentive.staked,
              userWalletBalance: incentive.walletBalance,
              userRewardsInformation: [
                {
                  __typename: 'UserRewardInfo',
                  rewardTokenSymbol: reservesResponse.stakeData.symbol,
                  rewardOracleAddress: '',
                  rewardTokenAddress: reservesResponse.stakeData.token,
                  userUnclaimedRewards: incentive.claimable,
                  rewardPriceFeed: '0',
                  priceFeedDecimals: 18,
                  rewardTokenDecimals: reservesResponse.stakeData.decimals,
                },
              ],
            },
          })),
        },
        variables: { lendingPoolAddressProvider, userAddress: currentAccount, chainId },
      });

      // master chef incentives
      cache.writeQuery<C_MasterChefIncentivesQuery>({
        query: C_MasterChefIncentivesDocument,
        data: {
          __typename: 'Query',
          masterChefIncentives: reservesResponse.chefUserData.map((incentive) => {
            const emissionPerSecond = new BigNumber(
              reservesResponse.controllerData.rewardsPerSecond
            )
              .multipliedBy(incentive.allocPoint)
              .div(reservesResponse.controllerData.totalAllocPoint);
            return {
              __typename: 'ReserveIncentiveData',
              id: `${chainId}-${currentAccount}-${incentive.token}-${lendingPoolAddressProvider}`.toLowerCase(),
              data: {
                __typename: 'IncentiveData',
                tokenAddress: incentive.token,
                tokenSymbol: incentive.symbol,
                tokenDecimals: incentive.decimals,
                totalStakedBalance: incentive.totalSupply,
                rewardsTokenInformation: [
                  {
                    __typename: 'RewardInfo',
                    emissionEndTimestamp: 2e9,
                    emissionPerSecond: emissionPerSecond.toString(),
                    priceFeedDecimals: 18,
                    rewardPriceFeed: '0',
                    rewardTokenAddress: reservesResponse.stakeData.token,
                    rewardTokenDecimals: reservesResponse.stakeData.decimals,
                    rewardOracleAddress: '',
                    rewardTokenSymbol: reservesResponse.stakeData.symbol,
                  },
                ],
              },
            };
          }),
        },
        variables: { lendingPoolAddressProvider, userAddress: currentAccount, chainId },
      });

      cache.writeQuery<C_UserMasterChefIncentivesQuery>({
        query: C_UserMasterChefIncentivesDocument,
        data: {
          __typename: 'Query',
          userMasterChefIncentives: reservesResponse.chefUserData.map((incentive) => ({
            __typename: 'UserIncentivesData',
            id: `${chainId}-${currentAccount}-${incentive.token}-${lendingPoolAddressProvider}`.toLowerCase(),
            data: {
              __typename: 'UserIncentiveData',
              tokenAddress: incentive.token,
              userStakedBalance: incentive.staked,
              userWalletBalance: incentive.walletBalance,
              userRewardsInformation: [
                {
                  __typename: 'UserRewardInfo',
                  rewardTokenSymbol: reservesResponse.stakeData.symbol,
                  rewardOracleAddress: '',
                  rewardTokenAddress: reservesResponse.stakeData.token,
                  userUnclaimedRewards: incentive.claimable,
                  rewardPriceFeed: '0',
                  priceFeedDecimals: 18,
                  rewardTokenDecimals: reservesResponse.stakeData.decimals,
                },
              ],
            },
          })),
        },
        variables: { lendingPoolAddressProvider, userAddress: currentAccount, chainId },
      });

      // user goledo stakes
      cache.writeQuery<C_UserGoledoStakeDataQuery>({
        query: C_UserGoledoStakeDataDocument,
        data: {
          __typename: 'Query',
          userGoledoStake: {
            __typename: 'UserGoledoStakeData',
            vestings: reservesResponse.stakeUserData.earnedBalances.map((v) => ({
              __typename: 'GoledoLockedBalance',
              amount: v.amount,
              expire: v.unlockTime,
            })),
            lockings: reservesResponse.stakeUserData.lockedBalances.map((v) => ({
              __typename: 'GoledoLockedBalance',
              amount: v.amount,
              expire: v.unlockTime,
            })),
            rewards: reservesResponse.stakeUserData.rewards.map((v) => ({
              __typename: 'GoledoRewardBalance',
              amount: v.amount,
              token: v.token,
            })),
            totalBalance: reservesResponse.stakeUserData.totalBalance,
            walletBalance: reservesResponse.stakeUserData.walletBalance,
            unlockedBalance: reservesResponse.stakeUserData.unlockedBalance,
            lockedBalance: reservesResponse.stakeUserData.lockedBalance,
          },
        },
        variables: { lendingPoolAddressProvider, userAddress: currentAccount, chainId },
      });

      setErrorRewardData(false);
    } catch (e) {
      console.log('e', e);
      setErrorRewardData(e.message);
    }
    setLoadingRewardData(false);
  };

  usePolling(fetchRewardData, POLLING_INTERVAL, skip, [
    skip,
    incentiveDataProviderAddress,
    chainId,
    currentAccount,
  ]);

  return {
    loading: loadingRewardData,
    error: errorRewardData,
    refresh: () => {
      return fetchRewardData();
    },
  };
}

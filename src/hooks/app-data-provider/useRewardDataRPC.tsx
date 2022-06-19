import {
  ChainId,
  IncentiveDataProvider,
  ReservesDataHumanized,
  UserReserveDataHumanized,
} from '@goledo-sdk/contract-helpers';
import { useApolloClient } from '@apollo/client';
import { useState } from 'react';
import { getProvider } from 'src/utils/marketsAndNetworksConfig';

import BigNumber from 'bignumber.js';

import { usePolling } from '../usePolling';
import {
  C_ReservesIncentivesDocument,
  C_ReservesIncentivesQuery,
  C_UserReserveIncentivesDocument,
  C_UserReserveIncentivesQuery,
} from './graphql/hooks';
import { constants } from 'ethers';

// interval in which the rpc data is refreshed
const POLLING_INTERVAL = 10 * 1000;

export interface PoolDataResponse {
  loading: boolean;
  error: boolean;
  data: {
    reserves?: ReservesDataHumanized;
    userReserves?: UserReserveDataHumanized[];
    userEmodeCategoryId?: number;
  };
  refresh: () => Promise<void[]>;
}

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

      cache.writeQuery<C_UserReserveIncentivesQuery>({
        query: C_UserReserveIncentivesDocument,
        data: {
          __typename: 'Query',
          userIncentives: reservesResponse.controllerUserData.map((incentive) => ({
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

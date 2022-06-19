import { useEffect } from 'react';
import { APOLLO_QUERY_TARGET } from 'src/utils/apolloClient';

import {
  C_ReservesIncentivesDataUpdateDocument,
  C_ReservesIncentivesDataUpdateSubscription,
  C_ReservesIncentivesDataUpdateSubscriptionVariables,
  C_UserReservesIncentivesDataUpdateDocument,
  C_UserReservesIncentivesDataUpdateSubscription,
  C_UserReservesIncentivesDataUpdateSubscriptionVariables,
  useC_ReservesIncentivesQuery,
  useC_UserReservesIncentivesQuery,
} from './graphql/hooks';
import {
  C_MasterChefIncentivesDataUpdateDocument,
  C_MasterChefIncentivesDataUpdateSubscription,
  C_MasterChefIncentivesDataUpdateSubscriptionVariables,
  C_UserMasterChefIncentivesDataUpdateDocument,
  C_UserMasterChefIncentivesDataUpdateSubscription,
  C_UserMasterChefIncentivesDataUpdateSubscriptionVariables,
  useC_MasterChefIncentivesQuery,
  useC_UserMasterChefIncentivesQuery,
} from './graphql/master-chef-hooks';
import {
  C_UserGoledoStakeDataUpdateDocument,
  C_UserGoledoStakeDataUpdateSubscription,
  C_UserGoledoStakeDataUpdateSubscriptionVariables,
  useC_UserGoledoStakeDataQuery,
} from './graphql/stake-hooks';

export function useRewardDataCached(
  lendingPoolAddressProvider: string,
  chainId: number,
  marketName: string,
  currentAccount?: string,
  skip = false
) {
  // reserves incentives
  const { loading: reservesIncentivesLoading, subscribeToMore: subscribeToReservesIncentives } =
    useC_ReservesIncentivesQuery({
      variables: { lendingPoolAddressProvider, chainId },
      skip,
      context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
    });

  useEffect(() => {
    if (!skip) {
      return subscribeToReservesIncentives<
        C_ReservesIncentivesDataUpdateSubscription,
        C_ReservesIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_ReservesIncentivesDataUpdateDocument,
        variables: { lendingPoolAddressProvider, chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const reservesIncentives = subscriptionData.data?.reservesIncentivesDataUpdate;

          if (!reservesIncentives) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            reservesIncentives,
          };
        },
        context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
      });
    }
  }, [subscribeToReservesIncentives, lendingPoolAddressProvider, skip, chainId, marketName]);

  const {
    loading: userReservesIncentivesLoading,
    subscribeToMore: subscribeToUserReservesIncentives,
  } = useC_UserReservesIncentivesQuery({
    variables: { lendingPoolAddressProvider, userAddress: currentAccount || '', chainId },
    skip: !currentAccount || skip,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (currentAccount && !skip) {
      return subscribeToUserReservesIncentives<
        C_UserReservesIncentivesDataUpdateSubscription,
        C_UserReservesIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_UserReservesIncentivesDataUpdateDocument,
        variables: { lendingPoolAddressProvider, userAddress: currentAccount || '', chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const userReservesIncentives = subscriptionData.data?.userReservesIncentivesDataUpdate;
          if (!userReservesIncentives) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            userReservesIncentives,
          };
        },
        context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
      });
    }
  }, [
    subscribeToUserReservesIncentives,
    lendingPoolAddressProvider,
    currentAccount,
    skip,
    chainId,
    marketName,
  ]);

  // master chef incentives
  const { loading: masterChefIncentivesLoading, subscribeToMore: subscribeToMasterChefIncentives } =
    useC_MasterChefIncentivesQuery({
      variables: { lendingPoolAddressProvider, chainId },
      skip,
      context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
    });

  useEffect(() => {
    if (!skip) {
      return subscribeToMasterChefIncentives<
        C_MasterChefIncentivesDataUpdateSubscription,
        C_MasterChefIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_MasterChefIncentivesDataUpdateDocument,
        variables: { lendingPoolAddressProvider, chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const masterChefIncentives = subscriptionData.data?.masterChefIncentivesDataUpdate;

          if (!masterChefIncentives) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            masterChefIncentives,
          };
        },
        context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
      });
    }
  }, [subscribeToMasterChefIncentives, lendingPoolAddressProvider, skip, chainId, marketName]);

  const { loading: userMasterChefLoading, subscribeToMore: subscribeToUserMasterChefIncentives } =
    useC_UserMasterChefIncentivesQuery({
      variables: { lendingPoolAddressProvider, userAddress: currentAccount || '', chainId },
      skip: !currentAccount || skip,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    });

  useEffect(() => {
    if (currentAccount && !skip) {
      return subscribeToUserMasterChefIncentives<
        C_UserMasterChefIncentivesDataUpdateSubscription,
        C_UserMasterChefIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_UserMasterChefIncentivesDataUpdateDocument,
        variables: { lendingPoolAddressProvider, userAddress: currentAccount || '', chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const userMasterChefIncentives =
            subscriptionData.data?.userMasterChefIncentivesDataUpdate;
          if (!userMasterChefIncentives) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            userMasterChefIncentives,
          };
        },
        context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
      });
    }
  }, [
    subscribeToUserMasterChefIncentives,
    lendingPoolAddressProvider,
    currentAccount,
    skip,
    chainId,
    marketName,
  ]);

  // user stakes
  const { loading: userGoledoStakeLoading, subscribeToMore: subscribeToUserGoledoStake } =
    useC_UserGoledoStakeDataQuery({
      variables: { userAddress: currentAccount || '', chainId },
      skip: !currentAccount || skip,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    });

  useEffect(() => {
    if (currentAccount && !skip) {
      return subscribeToUserGoledoStake<
        C_UserGoledoStakeDataUpdateSubscription,
        C_UserGoledoStakeDataUpdateSubscriptionVariables
      >({
        document: C_UserGoledoStakeDataUpdateDocument,
        variables: { userAddress: currentAccount || '', chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const userGoledoStake = subscriptionData.data?.userGoledoStakeDataUpdate;
          if (!userGoledoStake) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            userGoledoStake,
          };
        },
        context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
      });
    }
  }, [subscribeToUserGoledoStake, currentAccount, skip, chainId, marketName]);

  const loading =
    (currentAccount &&
      (userReservesIncentivesLoading || userMasterChefLoading || userGoledoStakeLoading)) ||
    reservesIncentivesLoading ||
    masterChefIncentivesLoading;

  return {
    loading,
  };
}

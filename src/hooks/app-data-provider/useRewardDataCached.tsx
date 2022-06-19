import { useEffect } from 'react';
import { APOLLO_QUERY_TARGET } from 'src/utils/apolloClient';

import {
  C_PoolIncentivesDataUpdateDocument,
  C_PoolIncentivesDataUpdateSubscription,
  C_PoolIncentivesDataUpdateSubscriptionVariables,
  C_UserPoolIncentivesDataUpdateDocument,
  C_UserPoolIncentivesDataUpdateSubscription,
  C_UserPoolIncentivesDataUpdateSubscriptionVariables,
  useC_ReservesIncentivesQuery,
  useC_UserIncentivesQuery,
} from './graphql/hooks';

export function useRewardDataCached(
  lendingPoolAddressProvider: string,
  chainId: number,
  marketName: string,
  currentAccount?: string,
  skip = false
) {
  const { loading: reservesIncentivesLoading, subscribeToMore: subscribeToReservesIncentives } =
    useC_ReservesIncentivesQuery({
      variables: { lendingPoolAddressProvider, chainId },
      skip,
      context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
    });

  useEffect(() => {
    if (!skip) {
      return subscribeToReservesIncentives<
        C_PoolIncentivesDataUpdateSubscription,
        C_PoolIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_PoolIncentivesDataUpdateDocument,
        variables: { lendingPoolAddressProvider, chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const reservesIncentivesUpdate = subscriptionData.data?.poolIncentivesDataUpdate;

          if (!reservesIncentivesUpdate) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            reservesIncentives: reservesIncentivesUpdate,
          };
        },
        context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
      });
    }
  }, [subscribeToReservesIncentives, lendingPoolAddressProvider, skip, chainId, marketName]);

  const { loading: userIncentivesLoading, subscribeToMore: subscribeToUserIncentives } =
    useC_UserIncentivesQuery({
      variables: { lendingPoolAddressProvider, userAddress: currentAccount || '', chainId },
      skip: !currentAccount || skip,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    });

  useEffect(() => {
    if (currentAccount && !skip) {
      return subscribeToUserIncentives<
        C_UserPoolIncentivesDataUpdateSubscription,
        C_UserPoolIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_UserPoolIncentivesDataUpdateDocument,
        variables: { lendingPoolAddressProvider, userAddress: currentAccount || '', chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const userIncentives = subscriptionData.data?.userPoolIncentivesDataUpdate;
          if (!userIncentives) {
            return previousQueryResult;
          }
          return {
            ...previousQueryResult,
            userIncentives,
          };
        },
        context: { target: APOLLO_QUERY_TARGET.MARKET(marketName) },
      });
    }
  }, [
    subscribeToUserIncentives,
    lendingPoolAddressProvider,
    currentAccount,
    skip,
    chainId,
    marketName,
  ]);

  const loading = (currentAccount && userIncentivesLoading) || reservesIncentivesLoading;

  return {
    loading,
  };
}

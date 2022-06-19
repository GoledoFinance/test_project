import { useEffect } from 'react';
import { APOLLO_QUERY_TARGET } from 'src/utils/apolloClient';

import {
  C_ReserveIncentivesDataUpdateDocument,
  C_ReserveIncentivesDataUpdateSubscription,
  C_ReserveIncentivesDataUpdateSubscriptionVariables,
  C_UserReserveIncentivesDataUpdateDocument,
  C_UserReserveIncentivesDataUpdateSubscription,
  C_UserReserveIncentivesDataUpdateSubscriptionVariables,
  useC_ReservesIncentivesQuery,
  useC_UserReserveIncentivesQuery,
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
        C_ReserveIncentivesDataUpdateSubscription,
        C_ReserveIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_ReserveIncentivesDataUpdateDocument,
        variables: { lendingPoolAddressProvider, chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const reservesIncentivesUpdate = subscriptionData.data?.reserveIncentivesDataUpdate;

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
    useC_UserReserveIncentivesQuery({
      variables: { lendingPoolAddressProvider, userAddress: currentAccount || '', chainId },
      skip: !currentAccount || skip,
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-and-network',
    });

  useEffect(() => {
    if (currentAccount && !skip) {
      return subscribeToUserIncentives<
        C_UserReserveIncentivesDataUpdateSubscription,
        C_UserReserveIncentivesDataUpdateSubscriptionVariables
      >({
        document: C_UserReserveIncentivesDataUpdateDocument,
        variables: { lendingPoolAddressProvider, userAddress: currentAccount || '', chainId },
        updateQuery: (previousQueryResult, { subscriptionData }) => {
          const userIncentives = subscriptionData.data?.userReserveIncentivesDataUpdate;
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

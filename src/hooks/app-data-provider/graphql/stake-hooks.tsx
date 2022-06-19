/* eslint-disable */
import { gql } from '@apollo/client';
import * as ApolloReactCommon from '@apollo/client';
import * as ApolloReactHooks from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;

import { Scalars } from './hooks';

export type QueryUserGoledoStakeDataArgs = {
  chainId: Scalars['Int'];
  userAddress: Scalars['String'];
};

export type SubscriptionUserGoledoStakeDataUpdateArgs = {
  chainId: Scalars['Int'];
  userAddress: Scalars['String'];
};

export type GoledoLockedBalanceFragmentFragment = {
  __typename?: 'GoledoLockedBalance';
  amount: Scalars['String'];
  expire: Scalars['Float'];
};

export type GoledoRewardBalanceFragmentFragment = {
  __typename?: 'GoledoLockedBalance';
  amount: Scalars['String'];
  token: Scalars['String'];
};

export const GoledoLockedBalanceFragmentFragmentDoc = gql`
  fragment GoledoLockedBalanceFragment on GoledoLockedBalance {
    amount
    expire
  }
`;

export const GoledoRewardBalanceFragmentFragmentDoc = gql`
  fragment GoledoRewardBalanceFragment on GoledoRewardBalance {
    amount
    token
  }
`;

export const C_UserGoledoStakeDataDocument = gql`
  query C_UserGoledoStake($userAddress: String!, $chainId: Int!) {
    userGoledoStake(userAddress: $userAddress, chainId: $chainId) {
      totalBalance
      walletBalance
      unlockedBalance
      lockedBalance
      vestings {
        ...GoledoLockedBalanceFragment
      }
      lockings {
        ...GoledoLockedBalanceFragment
      }
      rewards {
        ...GoledoRewardBalanceFragment
      }
    }
  }
  ${GoledoLockedBalanceFragmentFragmentDoc}
  ${GoledoRewardBalanceFragmentFragmentDoc}
`;

export const C_UserGoledoStakeDataUpdateDocument = gql`
  subscription C_UserGoledoStakeDataUpdate($userAddress: String!, $chainId: Int!) {
    userGoledoStakeDataUpdate(userAddress: $userAddress, chainId: $chainId) {
      totalBalance
      walletBalance
      unlockedBalance
      lockedBalance
      vestings {
        ...GoledoLockedBalanceFragment
      }
      lockings {
        ...GoledoLockedBalanceFragment
      }
      rewards {
        ...GoledoRewardBalanceFragment
      }
    }
  }
  ${GoledoLockedBalanceFragmentFragmentDoc}
  ${GoledoRewardBalanceFragmentFragmentDoc}
`;

export type C_UserGoledoStakeDataQueryVariables = Exact<{
  userAddress: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_UserGoledoStakeDataQuery = {
  __typename?: 'Query';
  userGoledoStake: {
    __typename?: 'UserGoledoStakeData';
    vestings: Array<{
      __typename?: 'GoledoLockedBalance';
      amount: Scalars['String'];
      expire: Scalars['Float'];
    }>;
    lockings: Array<{
      __typename?: 'GoledoLockedBalance';
      amount: Scalars['String'];
      expire: Scalars['Float'];
    }>;
    rewards: Array<{
      __typename?: 'GoledoRewardBalance';
      amount: Scalars['String'];
      token: Scalars['String'];
    }>;
    totalBalance: Scalars['String'];
    walletBalance: Scalars['String'];
    unlockedBalance: Scalars['String'];
    lockedBalance: Scalars['String'];
  };
};

export type C_UserGoledoStakeDataUpdateSubscriptionVariables = Exact<{
  userAddress: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_UserGoledoStakeDataUpdateSubscription = {
  __typename?: 'Subscription';
  userGoledoStakeDataUpdate: {
    __typename?: 'UserGoledoStakeData';
    vestings: Array<{
      __typename?: 'GoledoLockedBalance';
      amount: Scalars['String'];
      expire: Scalars['Float'];
    }>;
    lockings: Array<{
      __typename?: 'GoledoLockedBalance';
      amount: Scalars['String'];
      expire: Scalars['Float'];
    }>;
    rewards: Array<{
      __typename?: 'GoledoRewardBalance';
      amount: Scalars['String'];
      token: Scalars['String'];
    }>;
    totalBalance: Scalars['String'];
    walletBalance: Scalars['String'];
    unlockedBalance: Scalars['String'];
    lockedBalance: Scalars['String'];
  };
};

/**
 * __useC_UserGoledoStakeDataQuery__
 *
 * To run a query within a React component, call `useC_UserGoledoStakeDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_UserGoledoStakeDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserGoledoStakeDataQuery({
 *   variables: {
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_UserGoledoStakeDataQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    C_UserGoledoStakeDataQuery,
    C_UserGoledoStakeDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_UserGoledoStakeDataQuery, C_UserGoledoStakeDataQueryVariables>(
    C_UserGoledoStakeDataDocument,
    options
  );
}
export function useC_UserGoledoStakeDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_UserGoledoStakeDataQuery,
    C_UserGoledoStakeDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    C_UserGoledoStakeDataQuery,
    C_UserGoledoStakeDataQueryVariables
  >(C_UserGoledoStakeDataDocument, options);
}
export type C_UserGoledoStakeDataQueryHookResult = ReturnType<typeof useC_UserGoledoStakeDataQuery>;
export type C_UserGoledoStakeDataLazyQueryHookResult = ReturnType<
  typeof useC_UserGoledoStakeDataLazyQuery
>;
export type C_UserGoledoStakeDataQueryResult = ApolloReactCommon.QueryResult<
  C_UserGoledoStakeDataQuery,
  C_UserGoledoStakeDataQueryVariables
>;

/**
 * __useC_UserGoledoStakeDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_UserGoledoStakeDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_UserGoledoStakeDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserGoledoStakeDataUpdateSubscription({
 *   variables: {
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_UserGoledoStakeDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_UserGoledoStakeDataUpdateSubscription,
    C_UserGoledoStakeDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_UserGoledoStakeDataUpdateSubscription,
    C_UserGoledoStakeDataUpdateSubscriptionVariables
  >(C_UserGoledoStakeDataUpdateDocument, options);
}
export type C_UserGoledoStakeDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_UserGoledoStakeDataUpdateSubscription
>;
export type C_UserGoledoStakeDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_UserGoledoStakeDataUpdateSubscription>;

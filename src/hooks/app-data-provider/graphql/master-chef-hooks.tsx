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

import {
  IncentivesDataFragmentFragmentDoc,
  Scalars,
  TokenIncentivesUserDataFragmentFragmentDoc,
} from './hooks';

export type QueryMasterChefIncentivesArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
};

export type QueryUserMasterChefIncentivesArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
  userAddress: Scalars['String'];
};

export type SubscriptionMasterChefIncentivesDataUpdateArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
};

export type SubscriptionUserMasterChefIncentivesDataUpdateArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
  userAddress: Scalars['String'];
};

export type C_MasterChefIncentivesQueryVariables = Exact<{
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_MasterChefIncentivesQuery = {
  __typename?: 'Query';
  masterChefIncentives: Array<{
    __typename?: 'ReserveIncentiveData';
    id: string;
    data: {
      __typename?: 'IncentiveData';
      tokenAddress: string;
      tokenSymbol: string;
      tokenDecimals: number;
      totalStakedBalance: string;
      rewardsTokenInformation: Array<{
        __typename?: 'RewardInfo';
        emissionEndTimestamp: number;
        emissionPerSecond: string;
        priceFeedDecimals: number;
        rewardPriceFeed: string;
        rewardTokenAddress: string;
        rewardTokenDecimals: number;
        rewardOracleAddress: string;
        rewardTokenSymbol: string;
      }>;
    };
  }>;
};

export type C_MasterChefIncentivesDataUpdateSubscriptionVariables = Exact<{
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_MasterChefIncentivesDataUpdateSubscription = {
  __typename?: 'Subscription';
  masterChefIncentivesDataUpdate: Array<{
    __typename?: 'ReserveIncentiveData';
    id: string;
    data: {
      __typename?: 'IncentiveData';
      tokenAddress: string;
      tokenSymbol: string;
      tokenDecimals: number;
      totalStakedBalance: string;
      rewardsTokenInformation: Array<{
        __typename?: 'RewardInfo';
        emissionEndTimestamp: number;
        emissionPerSecond: string;
        priceFeedDecimals: number;
        rewardPriceFeed: string;
        rewardTokenAddress: string;
        rewardTokenDecimals: number;
        rewardOracleAddress: string;
        rewardTokenSymbol: string;
      }>;
    };
  }>;
};

export type C_UserMasterChefIncentivesQueryVariables = Exact<{
  userAddress: Scalars['String'];
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_UserMasterChefIncentivesQuery = {
  __typename?: 'Query';
  userMasterChefIncentives: Array<{
    __typename?: 'UserIncentivesData';
    id: string;
    data: {
      __typename?: 'UserIncentiveData';
      tokenAddress: string;
      userStakedBalance: string;
      userWalletBalance: string;
      userRewardsInformation: Array<{
        __typename?: 'UserRewardInfo';
        rewardTokenSymbol: string;
        rewardOracleAddress: string;
        rewardTokenAddress: string;
        userUnclaimedRewards: string;
        rewardPriceFeed: string;
        priceFeedDecimals: number;
        rewardTokenDecimals: number;
      }>;
    };
  }>;
};

export type C_UserMasterChefIncentivesDataUpdateSubscriptionVariables = Exact<{
  userAddress: Scalars['String'];
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_UserMasterChefIncentivesDataUpdateSubscription = {
  __typename?: 'Subscription';
  userMasterChefIncentivesDataUpdate: Array<{
    __typename?: 'UserIncentivesData';
    id: string;
    data: {
      __typename?: 'UserIncentiveData';
      tokenAddress: string;
      userStakedBalance: string;
      userWalletBalance: string;
      userRewardsInformation: Array<{
        __typename?: 'UserRewardInfo';
        rewardTokenSymbol: string;
        rewardOracleAddress: string;
        rewardTokenAddress: string;
        userUnclaimedRewards: string;
        rewardPriceFeed: string;
        priceFeedDecimals: number;
        rewardTokenDecimals: number;
      }>;
    };
  }>;
};

export const C_MasterChefIncentivesDocument = gql`
  query C_MasterChefIncentives($lendingPoolAddressProvider: String!, $chainId: Int!) {
    masterChefIncentives(
      lendingPoolAddressProvider: $lendingPoolAddressProvider
      chainId: $chainId
    ) {
      id
      data {
        ...IncentivesDataFragment
      }
    }
  }
  ${IncentivesDataFragmentFragmentDoc}
`;

/**
 * __useC_MasterChefIncentivesQuery__
 *
 * To run a query within a React component, call `useC_MasterChefIncentivesQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_MasterChefIncentivesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_MasterChefIncentivesQuery({
 *   variables: {
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_MasterChefIncentivesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    C_MasterChefIncentivesQuery,
    C_MasterChefIncentivesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    C_MasterChefIncentivesQuery,
    C_MasterChefIncentivesQueryVariables
  >(C_MasterChefIncentivesDocument, options);
}
export function useC_MasterChefIncentivesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_MasterChefIncentivesQuery,
    C_MasterChefIncentivesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    C_MasterChefIncentivesQuery,
    C_MasterChefIncentivesQueryVariables
  >(C_MasterChefIncentivesDocument, options);
}
export type C_MasterChefIncentivesQueryHookResult = ReturnType<
  typeof useC_MasterChefIncentivesQuery
>;
export type C_MasterChefIncentivesLazyQueryHookResult = ReturnType<
  typeof useC_MasterChefIncentivesLazyQuery
>;
export type C_MasterChefIncentivesQueryResult = ApolloReactCommon.QueryResult<
  C_MasterChefIncentivesQuery,
  C_MasterChefIncentivesQueryVariables
>;
export const C_MasterChefIncentivesDataUpdateDocument = gql`
  subscription C_MasterChefIncentivesDataUpdate(
    $lendingPoolAddressProvider: String!
    $chainId: Int!
  ) {
    masterChefIncentivesDataUpdate(
      lendingPoolAddressProvider: $lendingPoolAddressProvider
      chainId: $chainId
    ) {
      id
      data {
        ...IncentivesDataFragment
      }
    }
  }
  ${IncentivesDataFragmentFragmentDoc}
`;
/**
 * __useC_MasterChefIncentivesDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_MasterChefIncentivesDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_MasterChefIncentivesDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_MasterChefIncentivesDataUpdateSubscription({
 *   variables: {
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_MasterChefIncentivesDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_MasterChefIncentivesDataUpdateSubscription,
    C_MasterChefIncentivesDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_MasterChefIncentivesDataUpdateSubscription,
    C_MasterChefIncentivesDataUpdateSubscriptionVariables
  >(C_MasterChefIncentivesDataUpdateDocument, options);
}
export type C_MasterChefIncentivesDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_MasterChefIncentivesDataUpdateSubscription
>;
export type C_MasterChefIncentivesDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_MasterChefIncentivesDataUpdateSubscription>;

export const C_UserMasterChefIncentivesDocument = gql`
  query C_UserMasterChefIncentives(
    $userAddress: String!
    $lendingPoolAddressProvider: String!
    $chainId: Int!
  ) {
    userMasterChefIncentives(
      userAddress: $userAddress
      lendingPoolAddressProvider: $lendingPoolAddressProvider
      chainId: $chainId
    ) {
      id
      data {
        ...TokenIncentivesUserDataFragment
      }
    }
  }
  ${TokenIncentivesUserDataFragmentFragmentDoc}
`;

/**
 * __useC_UserMasterChefIncentivesQuery__
 *
 * To run a query within a React component, call `useC_UserMasterChefIncentivesQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_UserMasterChefIncentivesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserMasterChefIncentivesQuery({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_UserMasterChefIncentivesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    C_UserMasterChefIncentivesQuery,
    C_UserMasterChefIncentivesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    C_UserMasterChefIncentivesQuery,
    C_UserMasterChefIncentivesQueryVariables
  >(C_UserMasterChefIncentivesDocument, options);
}
export function useC_UserMasterChefIncentivesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_UserMasterChefIncentivesQuery,
    C_UserMasterChefIncentivesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    C_UserMasterChefIncentivesQuery,
    C_UserMasterChefIncentivesQueryVariables
  >(C_UserMasterChefIncentivesDocument, options);
}
export type C_UserMasterChefIncentivesQueryHookResult = ReturnType<
  typeof useC_UserMasterChefIncentivesQuery
>;
export type C_UserMasterChefIncentivesLazyQueryHookResult = ReturnType<
  typeof useC_UserMasterChefIncentivesLazyQuery
>;
export type C_UserMasterChefIncentivesQueryResult = ApolloReactCommon.QueryResult<
  C_UserMasterChefIncentivesQuery,
  C_UserMasterChefIncentivesQueryVariables
>;

export const C_UserMasterChefIncentivesDataUpdateDocument = gql`
  subscription C_UserMasterChefIncentivesDataUpdate(
    $userAddress: String!
    $lendingPoolAddressProvider: String!
    $chainId: Int!
  ) {
    userMasterChefIncentivesDataUpdate(
      userAddress: $userAddress
      lendingPoolAddressProvider: $lendingPoolAddressProvider
      chainId: $chainId
    ) {
      id
      data {
        ...TokenIncentivesUserDataFragment
      }
    }
  }
  ${TokenIncentivesUserDataFragmentFragmentDoc}
`;

/**
 * __useC_UserMasterChefIncentivesDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_UserMasterChefIncentivesDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_UserMasterChefIncentivesDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserMasterChefIncentivesDataUpdateSubscription({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_UserMasterChefIncentivesDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_UserMasterChefIncentivesDataUpdateSubscription,
    C_UserMasterChefIncentivesDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_UserMasterChefIncentivesDataUpdateSubscription,
    C_UserMasterChefIncentivesDataUpdateSubscriptionVariables
  >(C_UserMasterChefIncentivesDataUpdateDocument, options);
}
export type C_UserMasterChefIncentivesDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_UserMasterChefIncentivesDataUpdateSubscription
>;
export type C_UserMasterChefIncentivesDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_UserMasterChefIncentivesDataUpdateSubscription>;

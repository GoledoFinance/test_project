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
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BaseCurrencyData = {
  __typename?: 'BaseCurrencyData';
  marketReferenceCurrencyDecimals: Scalars['Float'];
  marketReferenceCurrencyPriceInUsd: Scalars['String'];
  networkBaseTokenPriceDecimals: Scalars['Float'];
  networkBaseTokenPriceInUsd: Scalars['String'];
};

export type ReserveIncentiveData = {
  __typename?: 'ReserveIncentiveData';
  rewardsTokenInformation: Array<RewardInfo>;
  tokenAddress: Scalars['String'];
  tokenSymbol: Scalars['String'];
  tokenDecimals: Scalars['Int'];
  totalStakedBalance: Scalars['String'];
};

export type ProtocolData = {
  __typename?: 'ProtocolData';
  reserves: Array<ReserveData>;
  marketReferencePriceInUsd: Scalars['String'];
  emissionEndTimestamp: Scalars['Int'];
};

export type Query = {
  __typename?: 'Query';
  ping: Scalars['String'];
  protocolData: ProtocolData;
  reservesIncentives: Array<ReserveIncentiveData>;
  stakeGeneralUIData: StakeGeneralUiData;
  stakeUserUIData: StakeUserUiData;
  userData: UserReservesData;
  userIncentives: Array<UserIncentiveData>;
};

export type QueryProtocolDataArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
};

export type QueryReservesIncentivesArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
};

export type QueryStakeUserUiDataArgs = {
  chainId: Scalars['Int'];
  userAddress: Scalars['String'];
};

export type QueryUserDataArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
  userAddress: Scalars['String'];
};

export type QueryUserIncentivesArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
  userAddress: Scalars['String'];
};

export type ReserveData = {
  __typename?: 'ReserveData';
  aTokenAddress: Scalars['String'];
  availableLiquidity: Scalars['String'];
  averageStableRate: Scalars['String'];
  baseLTVasCollateral: Scalars['String'];
  baseStableBorrowRate: Scalars['String'];
  borrowCap: Scalars['String'];
  borrowableInIsolation: Scalars['Boolean'];
  borrowingEnabled: Scalars['Boolean'];
  debtCeiling: Scalars['String'];
  decimals: Scalars['Float'];
  eModeCategoryId: Scalars['Float'];
  eModeLabel: Scalars['String'];
  eModeLiquidationBonus: Scalars['Float'];
  eModeLiquidationThreshold: Scalars['Float'];
  eModeLtv: Scalars['Float'];
  eModePriceSource: Scalars['String'];
  id: Scalars['String'];
  interestRateStrategyAddress: Scalars['String'];
  isActive: Scalars['Boolean'];
  isFrozen: Scalars['Boolean'];
  lastUpdateTimestamp: Scalars['Float'];
  liquidityIndex: Scalars['String'];
  liquidityRate: Scalars['String'];
  name: Scalars['String'];
  priceInEth: Scalars['String'];
  reserveFactor: Scalars['String'];
  reserveLiquidationBonus: Scalars['String'];
  reserveLiquidationThreshold: Scalars['String'];
  stableBorrowRate: Scalars['String'];
  stableBorrowRateEnabled: Scalars['Boolean'];
  stableDebtLastUpdateTimestamp: Scalars['Float'];
  stableDebtTokenAddress: Scalars['String'];
  stableRateSlope1: Scalars['String'];
  stableRateSlope2: Scalars['String'];
  supplyCap: Scalars['String'];
  symbol: Scalars['String'];
  totalPrincipalStableDebt: Scalars['String'];
  totalScaledVariableDebt: Scalars['String'];
  underlyingAsset: Scalars['String'];
  usageAsCollateralEnabled: Scalars['Boolean'];
  variableBorrowIndex: Scalars['String'];
  variableBorrowRate: Scalars['String'];
  variableDebtTokenAddress: Scalars['String'];
  variableRateSlope1: Scalars['String'];
  variableRateSlope2: Scalars['String'];
};

export type RewardInfo = {
  __typename?: 'RewardInfo';
  emissionEndTimestamp: Scalars['Float'];
  emissionPerSecond: Scalars['String'];
  priceFeedDecimals: Scalars['Float'];
  rewardOracleAddress: Scalars['String'];
  rewardPriceFeed: Scalars['String'];
  rewardTokenAddress: Scalars['String'];
  rewardTokenDecimals: Scalars['Float'];
  rewardTokenSymbol: Scalars['String'];
};

export type StakeGeneralData = {
  __typename?: 'StakeGeneralData';
  distributionEnd: Scalars['String'];
  distributionPerSecond: Scalars['String'];
  rewardTokenPriceEth: Scalars['String'];
  stakeApy: Scalars['String'];
  stakeCooldownSeconds: Scalars['Float'];
  stakeTokenPriceEth: Scalars['String'];
  stakeTokenTotalSupply: Scalars['String'];
  stakeUnstakeWindow: Scalars['Float'];
};

export type StakeGeneralUiData = {
  __typename?: 'StakeGeneralUIData';
  aave: StakeGeneralData;
  bpt: StakeGeneralData;
  usdPriceEth: Scalars['String'];
};

export type StakeUserData = {
  __typename?: 'StakeUserData';
  stakeTokenUserBalance: Scalars['String'];
  underlyingTokenUserBalance: Scalars['String'];
  userCooldown: Scalars['Float'];
  userIncentivesToClaim: Scalars['String'];
  userPermitNonce: Scalars['String'];
};

export type GoledoStakeUserData = {
  __typename?: 'GoledoStakeUserData';
  userLockedBalance: Scalars['String'];
  userStakedBalance: Scalars['String'];
  userVestedBalance: Scalars['String'];
  userWalletBalance: Scalars['String'];
};

export type StakeUserUiData = {
  __typename?: 'StakeUserUIData';
  aave: StakeUserData;
  bpt: StakeUserData;
  usdPriceEth: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  reserveIncentivesDataUpdate: Array<ReserveIncentiveData>;
  protocolDataUpdate: ProtocolData;
  stakeGeneralUIDataUpdate: StakeGeneralUiData;
  stakeUserUIDataUpdate: StakeUserUiData;
  userDataUpdate: UserReservesData;
  userReserveIncentivesDataUpdate: Array<UserIncentiveData>;
};

export type SubscriptionPoolIncentivesDataUpdateArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
};

export type SubscriptionProtocolDataUpdateArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
};

export type SubscriptionStakeUserUiDataUpdateArgs = {
  chainId: Scalars['Int'];
  userAddress: Scalars['String'];
};

export type SubscriptionUserDataUpdateArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
  userAddress: Scalars['String'];
};

export type SubscriptionUserPoolIncentivesDataUpdateArgs = {
  chainId: Scalars['Int'];
  lendingPoolAddressProvider: Scalars['String'];
  userAddress: Scalars['String'];
};

export type UserIncentiveData = {
  __typename?: 'UserIncentiveData';
  tokenAddress: Scalars['String'];
  userStakedBalance: Scalars['String'];
  userWalletBalance: Scalars['String'];
  userRewardsInformation: Array<UserRewardInfo>;
};

export type UserReserveData = {
  __typename?: 'UserReserveData';
  id: Scalars['String'];
  principalStableDebt: Scalars['String'];
  scaledATokenBalance: Scalars['String'];
  scaledVariableDebt: Scalars['String'];
  stableBorrowLastUpdateTimestamp: Scalars['Float'];
  stableBorrowRate: Scalars['String'];
  underlyingAsset: Scalars['String'];
  usageAsCollateralEnabledOnUser: Scalars['Boolean'];
};

export type UserReservesData = {
  __typename?: 'UserReservesData';
  userEmodeCategoryId: Scalars['Float'];
  userReserves: Array<UserReserveData>;
};

export type UserRewardInfo = {
  __typename?: 'UserRewardInfo';
  priceFeedDecimals: Scalars['Float'];
  rewardOracleAddress: Scalars['String'];
  rewardPriceFeed: Scalars['String'];
  rewardTokenAddress: Scalars['String'];
  rewardTokenDecimals: Scalars['Float'];
  rewardTokenSymbol: Scalars['String'];
  userUnclaimedRewards: Scalars['String'];
};

export type IncentivesDataFragmentFragment = {
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

export type C_ReservesIncentivesQueryVariables = Exact<{
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_ReservesIncentivesQuery = {
  __typename?: 'Query';
  reservesIncentives: Array<{
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

export type C_ReserveIncentivesDataUpdateSubscriptionVariables = Exact<{
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_ReserveIncentivesDataUpdateSubscription = {
  __typename?: 'Subscription';
  reserveIncentivesDataUpdate: Array<{
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

export type ReserveDataFragmentFragment = {
  __typename?: 'ReserveData';
  id: string;
  underlyingAsset: string;
  name: string;
  symbol: string;
  decimals: number;
  isActive: boolean;
  isFrozen: boolean;
  usageAsCollateralEnabled: boolean;
  aTokenAddress: string;
  stableDebtTokenAddress: string;
  variableDebtTokenAddress: string;
  borrowingEnabled: boolean;
  stableBorrowRateEnabled: boolean;
  reserveFactor: string;
  interestRateStrategyAddress: string;
  baseLTVasCollateral: string;
  stableRateSlope1: string;
  stableRateSlope2: string;
  averageStableRate: string;
  stableDebtLastUpdateTimestamp: number;
  variableRateSlope1: string;
  variableRateSlope2: string;
  liquidityIndex: string;
  reserveLiquidationThreshold: string;
  reserveLiquidationBonus: string;
  variableBorrowIndex: string;
  variableBorrowRate: string;
  availableLiquidity: string;
  stableBorrowRate: string;
  liquidityRate: string;
  totalPrincipalStableDebt: string;
  totalScaledVariableDebt: string;
  lastUpdateTimestamp: number;
  priceInEth: string;
  debtCeiling: string;
  eModeCategoryId: number;
  borrowCap: string;
  supplyCap: string;
  eModeLtv: number;
  eModeLiquidationThreshold: number;
  eModeLiquidationBonus: number;
  eModePriceSource: string;
  eModeLabel: string;
  borrowableInIsolation: boolean;
  baseStableBorrowRate: string;
};

export type BaseCurrencyDataFragmentFragment = {
  __typename?: 'BaseCurrencyData';
  marketReferenceCurrencyDecimals: number;
  marketReferenceCurrencyPriceInUsd: string;
  networkBaseTokenPriceInUsd: string;
  networkBaseTokenPriceDecimals: number;
};

export type C_ProtocolDataQueryVariables = Exact<{
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_ProtocolDataQuery = {
  __typename?: 'Query';
  protocolData: {
    __typename?: 'ProtocolData';
    reserves: Array<{
      __typename?: 'ReserveData';
      id: string;
      underlyingAsset: string;
      name: string;
      symbol: string;
      decimals: number;
      baseLTVasCollateral: string;
      reserveLiquidationThreshold: string;
      reserveLiquidationBonus: string;
      reserveFactor: string;
      usageAsCollateralEnabled: boolean;
      borrowingEnabled: boolean;
      stableBorrowRateEnabled: boolean;
      isActive: boolean;
      isFrozen: boolean;
      liquidityIndex: string;
      variableBorrowIndex: string;
      liquidityRate: string;
      variableBorrowRate: string;
      stableBorrowRate: string;
      lastUpdateTimestamp: number;
      aTokenAddress: string;
      stableDebtTokenAddress: string;
      variableDebtTokenAddress: string;
      interestRateStrategyAddress: string;
      availableLiquidity: string;
      totalPrincipalStableDebt: string;
      averageStableRate: string;
      stableDebtLastUpdateTimestamp: number;
      totalScaledVariableDebt: string;
      priceInEth: string;
      variableRateSlope1: string;
      variableRateSlope2: string;
      stableRateSlope1: string;
      stableRateSlope2: string;
    }>;
    marketReferencePriceInUsd: string;
    emissionEndTimestamp: number;
  };
};

export type C_ProtocolDataUpdateSubscriptionVariables = Exact<{
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_ProtocolDataUpdateSubscription = {
  __typename?: 'Subscription';
  protocolDataUpdate: {
    __typename?: 'ProtocolData';
    reserves: Array<{
      __typename?: 'ReserveData';
      id: string;
      underlyingAsset: string;
      name: string;
      symbol: string;
      decimals: number;
      baseLTVasCollateral: string;
      reserveLiquidationThreshold: string;
      reserveLiquidationBonus: string;
      reserveFactor: string;
      usageAsCollateralEnabled: boolean;
      borrowingEnabled: boolean;
      stableBorrowRateEnabled: boolean;
      isActive: boolean;
      isFrozen: boolean;
      liquidityIndex: string;
      variableBorrowIndex: string;
      liquidityRate: string;
      variableBorrowRate: string;
      stableBorrowRate: string;
      lastUpdateTimestamp: number;
      aTokenAddress: string;
      stableDebtTokenAddress: string;
      variableDebtTokenAddress: string;
      interestRateStrategyAddress: string;
      availableLiquidity: string;
      totalPrincipalStableDebt: string;
      averageStableRate: string;
      stableDebtLastUpdateTimestamp: number;
      totalScaledVariableDebt: string;
      priceInEth: string;
      variableRateSlope1: string;
      variableRateSlope2: string;
      stableRateSlope1: string;
      stableRateSlope2: string;
    }>;
    marketReferencePriceInUsd: string;
    emissionEndTimestamp: number;
  };
};

export type UserReserveDataFragmentFragment = {
  __typename?: 'UserReserveData';
  id: string;
  underlyingAsset: string;
  scaledATokenBalance: string;
  usageAsCollateralEnabledOnUser: boolean;
  scaledVariableDebt: string;
  stableBorrowRate: string;
  principalStableDebt: string;
  stableBorrowLastUpdateTimestamp: number;
};

export type C_UserDataQueryVariables = Exact<{
  userAddress: Scalars['String'];
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_UserDataQuery = {
  __typename?: 'Query';
  userData: {
    __typename?: 'UserReservesData';
    userEmodeCategoryId: number;
    userReserves: Array<{
      __typename?: 'UserReserveData';
      id: string;
      underlyingAsset: string;
      scaledATokenBalance: string;
      usageAsCollateralEnabledOnUser: boolean;
      scaledVariableDebt: string;
      stableBorrowRate: string;
      principalStableDebt: string;
      stableBorrowLastUpdateTimestamp: number;
    }>;
  };
};

export type C_UserDataUpdateSubscriptionVariables = Exact<{
  userAddress: Scalars['String'];
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_UserDataUpdateSubscription = {
  __typename?: 'Subscription';
  userDataUpdate: {
    __typename?: 'UserReservesData';
    userEmodeCategoryId: number;
    userReserves: Array<{
      __typename?: 'UserReserveData';
      id: string;
      underlyingAsset: string;
      scaledATokenBalance: string;
      usageAsCollateralEnabledOnUser: boolean;
      scaledVariableDebt: string;
      stableBorrowRate: string;
      principalStableDebt: string;
      stableBorrowLastUpdateTimestamp: number;
    }>;
  };
};

export type TokenIncentivesUserDataFragmentFragment = {
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

export type C_UserReserveIncentivesQueryVariables = Exact<{
  userAddress: Scalars['String'];
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_UserReserveIncentivesQuery = {
  __typename?: 'Query';
  userIncentives: Array<{
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

export type C_UserReserveIncentivesDataUpdateSubscriptionVariables = Exact<{
  userAddress: Scalars['String'];
  lendingPoolAddressProvider: Scalars['String'];
  chainId: Scalars['Int'];
}>;

export type C_UserReserveIncentivesDataUpdateSubscription = {
  __typename?: 'Subscription';
  userReserveIncentivesDataUpdate: Array<{
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

export const IncentivesDataFragmentFragmentDoc = gql`
  fragment IncentivesDataFragment on IncentiveData {
    tokenAddress
    tokenSymbol
    tokenDecimals
    totalStakedBalance
    rewardsTokenInformation {
      emissionEndTimestamp
      emissionPerSecond
      priceFeedDecimals
      rewardPriceFeed
      rewardTokenAddress
      rewardTokenDecimals
      rewardOracleAddress
      rewardTokenSymbol
    }
  }
`;
export const ReserveDataFragmentFragmentDoc = gql`
  fragment ReserveDataFragment on ReserveData {
    id
    underlyingAsset
    name
    symbol
    decimals
    isActive
    isFrozen
    usageAsCollateralEnabled
    aTokenAddress
    stableDebtTokenAddress
    variableDebtTokenAddress
    borrowingEnabled
    stableBorrowRateEnabled
    reserveFactor
    interestRateStrategyAddress
    baseLTVasCollateral
    stableRateSlope1
    stableRateSlope2
    averageStableRate
    stableDebtLastUpdateTimestamp
    variableRateSlope1
    variableRateSlope2
    liquidityIndex
    reserveLiquidationThreshold
    reserveLiquidationBonus
    variableBorrowIndex
    variableBorrowRate
    availableLiquidity
    stableBorrowRate
    liquidityRate
    totalPrincipalStableDebt
    totalScaledVariableDebt
    lastUpdateTimestamp
    priceInEth
  }
`;
export const BaseCurrencyDataFragmentFragmentDoc = gql`
  fragment BaseCurrencyDataFragment on BaseCurrencyData {
    marketReferenceCurrencyDecimals
    marketReferenceCurrencyPriceInUsd
    networkBaseTokenPriceInUsd
    networkBaseTokenPriceDecimals
  }
`;
export const UserReserveDataFragmentFragmentDoc = gql`
  fragment UserReserveDataFragment on UserReserveData {
    id
    underlyingAsset
    scaledATokenBalance
    usageAsCollateralEnabledOnUser
    scaledVariableDebt
    stableBorrowRate
    principalStableDebt
    stableBorrowLastUpdateTimestamp
  }
`;
export const TokenIncentivesUserDataFragmentFragmentDoc = gql`
  fragment TokenIncentivesUserDataFragment on UserIncentiveData {
    tokenAddress
    userStakedBalance
    userWalletBalance
    userRewardsInformation {
      rewardTokenSymbol
      rewardOracleAddress
      rewardTokenAddress
      userUnclaimedRewards
      rewardPriceFeed
      priceFeedDecimals
      rewardTokenDecimals
    }
  }
`;
export const C_ReservesIncentivesDocument = gql`
  query C_ReservesIncentives($lendingPoolAddressProvider: String!, $chainId: Int!) {
    reservesIncentives(lendingPoolAddressProvider: $lendingPoolAddressProvider, chainId: $chainId) {
      id
      data {
        ...IncentivesDataFragment
      }
    }
  }
  ${IncentivesDataFragmentFragmentDoc}
`;

/**
 * __useC_ReservesIncentivesQuery__
 *
 * To run a query within a React component, call `useC_ReservesIncentivesQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_ReservesIncentivesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_ReservesIncentivesQuery({
 *   variables: {
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_ReservesIncentivesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    C_ReservesIncentivesQuery,
    C_ReservesIncentivesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_ReservesIncentivesQuery, C_ReservesIncentivesQueryVariables>(
    C_ReservesIncentivesDocument,
    options
  );
}
export function useC_ReservesIncentivesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_ReservesIncentivesQuery,
    C_ReservesIncentivesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    C_ReservesIncentivesQuery,
    C_ReservesIncentivesQueryVariables
  >(C_ReservesIncentivesDocument, options);
}
export type C_ReservesIncentivesQueryHookResult = ReturnType<typeof useC_ReservesIncentivesQuery>;
export type C_ReservesIncentivesLazyQueryHookResult = ReturnType<
  typeof useC_ReservesIncentivesLazyQuery
>;
export type C_ReservesIncentivesQueryResult = ApolloReactCommon.QueryResult<
  C_ReservesIncentivesQuery,
  C_ReservesIncentivesQueryVariables
>;
export const C_ReserveIncentivesDataUpdateDocument = gql`
  subscription C_ReserveIncentivesDataUpdate($lendingPoolAddressProvider: String!, $chainId: Int!) {
    reserveIncentivesDataUpdate(
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
 * __useC_ReserveIncentivesDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_ReserveIncentivesDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_ReserveIncentivesDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_ReserveIncentivesDataUpdateSubscription({
 *   variables: {
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_ReserveIncentivesDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_ReserveIncentivesDataUpdateSubscription,
    C_ReserveIncentivesDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_ReserveIncentivesDataUpdateSubscription,
    C_ReserveIncentivesDataUpdateSubscriptionVariables
  >(C_ReserveIncentivesDataUpdateDocument, options);
}
export type C_ReserveIncentivesDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_ReserveIncentivesDataUpdateSubscription
>;
export type C_ReserveIncentivesDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_ReserveIncentivesDataUpdateSubscription>;
export const C_ProtocolDataDocument = gql`
  query C_ProtocolData($lendingPoolAddressProvider: String!, $chainId: Int!) {
    protocolData(lendingPoolAddressProvider: $lendingPoolAddressProvider, chainId: $chainId) {
      reserves {
        ...ReserveDataFragment
      }
      marketReferencePriceInUsd
      emissionEndTimestamp
    }
  }
  ${ReserveDataFragmentFragmentDoc}
  ${BaseCurrencyDataFragmentFragmentDoc}
`;

/**
 * __useC_ProtocolDataQuery__
 *
 * To run a query within a React component, call `useC_ProtocolDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_ProtocolDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_ProtocolDataQuery({
 *   variables: {
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_ProtocolDataQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<C_ProtocolDataQuery, C_ProtocolDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_ProtocolDataQuery, C_ProtocolDataQueryVariables>(
    C_ProtocolDataDocument,
    options
  );
}
export function useC_ProtocolDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_ProtocolDataQuery,
    C_ProtocolDataQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<C_ProtocolDataQuery, C_ProtocolDataQueryVariables>(
    C_ProtocolDataDocument,
    options
  );
}
export type C_ProtocolDataQueryHookResult = ReturnType<typeof useC_ProtocolDataQuery>;
export type C_ProtocolDataLazyQueryHookResult = ReturnType<typeof useC_ProtocolDataLazyQuery>;
export type C_ProtocolDataQueryResult = ApolloReactCommon.QueryResult<
  C_ProtocolDataQuery,
  C_ProtocolDataQueryVariables
>;
export const C_ProtocolDataUpdateDocument = gql`
  subscription C_ProtocolDataUpdate($lendingPoolAddressProvider: String!, $chainId: Int!) {
    protocolDataUpdate(lendingPoolAddressProvider: $lendingPoolAddressProvider, chainId: $chainId) {
      reserves {
        ...ReserveDataFragment
      }
      marketReferencePriceInUsd
      emissionEndTimestamp
    }
  }
  ${ReserveDataFragmentFragmentDoc}
  ${BaseCurrencyDataFragmentFragmentDoc}
`;

/**
 * __useC_ProtocolDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_ProtocolDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_ProtocolDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_ProtocolDataUpdateSubscription({
 *   variables: {
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_ProtocolDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_ProtocolDataUpdateSubscription,
    C_ProtocolDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_ProtocolDataUpdateSubscription,
    C_ProtocolDataUpdateSubscriptionVariables
  >(C_ProtocolDataUpdateDocument, options);
}
export type C_ProtocolDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_ProtocolDataUpdateSubscription
>;
export type C_ProtocolDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_ProtocolDataUpdateSubscription>;
export const C_UserDataDocument = gql`
  query C_UserData($userAddress: String!, $lendingPoolAddressProvider: String!, $chainId: Int!) {
    userData(
      userAddress: $userAddress
      lendingPoolAddressProvider: $lendingPoolAddressProvider
      chainId: $chainId
    ) {
      userReserves {
        ...UserReserveDataFragment
      }
      userEmodeCategoryId
    }
  }
  ${UserReserveDataFragmentFragmentDoc}
`;

/**
 * __useC_UserDataQuery__
 *
 * To run a query within a React component, call `useC_UserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_UserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserDataQuery({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_UserDataQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<C_UserDataQuery, C_UserDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_UserDataQuery, C_UserDataQueryVariables>(
    C_UserDataDocument,
    options
  );
}
export function useC_UserDataLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<C_UserDataQuery, C_UserDataQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<C_UserDataQuery, C_UserDataQueryVariables>(
    C_UserDataDocument,
    options
  );
}
export type C_UserDataQueryHookResult = ReturnType<typeof useC_UserDataQuery>;
export type C_UserDataLazyQueryHookResult = ReturnType<typeof useC_UserDataLazyQuery>;
export type C_UserDataQueryResult = ApolloReactCommon.QueryResult<
  C_UserDataQuery,
  C_UserDataQueryVariables
>;
export const C_UserDataUpdateDocument = gql`
  subscription C_UserDataUpdate(
    $userAddress: String!
    $lendingPoolAddressProvider: String!
    $chainId: Int!
  ) {
    userDataUpdate(
      userAddress: $userAddress
      lendingPoolAddressProvider: $lendingPoolAddressProvider
      chainId: $chainId
    ) {
      userReserves {
        ...UserReserveDataFragment
      }
      userEmodeCategoryId
    }
  }
  ${UserReserveDataFragmentFragmentDoc}
`;

/**
 * __useC_UserDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_UserDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_UserDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserDataUpdateSubscription({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_UserDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_UserDataUpdateSubscription,
    C_UserDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_UserDataUpdateSubscription,
    C_UserDataUpdateSubscriptionVariables
  >(C_UserDataUpdateDocument, options);
}
export type C_UserDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_UserDataUpdateSubscription
>;
export type C_UserDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_UserDataUpdateSubscription>;
export const C_UserReserveIncentivesDocument = gql`
  query C_UserIncentives(
    $userAddress: String!
    $lendingPoolAddressProvider: String!
    $chainId: Int!
  ) {
    userIncentives(
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
 * __useC_UserReserveIncentivesQuery__
 *
 * To run a query within a React component, call `useC_UserReserveIncentivesQuery` and pass it any options that fit your needs.
 * When your component renders, `useC_UserReserveIncentivesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserReserveIncentivesQuery({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_UserReserveIncentivesQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    C_UserReserveIncentivesQuery,
    C_UserReserveIncentivesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<C_UserReserveIncentivesQuery, C_UserReserveIncentivesQueryVariables>(
    C_UserReserveIncentivesDocument,
    options
  );
}
export function useC_UserIncentivesLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    C_UserReserveIncentivesQuery,
    C_UserReserveIncentivesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<C_UserReserveIncentivesQuery, C_UserReserveIncentivesQueryVariables>(
    C_UserReserveIncentivesDocument,
    options
  );
}
export type C_UserReserveIncentivesQueryHookResult = ReturnType<typeof useC_UserReserveIncentivesQuery>;
export type C_UserIncentivesLazyQueryHookResult = ReturnType<typeof useC_UserIncentivesLazyQuery>;
export type C_UserReserveIncentivesQueryResult = ApolloReactCommon.QueryResult<
  C_UserReserveIncentivesQuery,
  C_UserReserveIncentivesQueryVariables
>;
export const C_UserReserveIncentivesDataUpdateDocument = gql`
  subscription C_UserReserveIncentivesDataUpdate(
    $userAddress: String!
    $lendingPoolAddressProvider: String!
    $chainId: Int!
  ) {
    userReserveIncentivesDataUpdate(
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
 * __useC_UserReserveIncentivesDataUpdateSubscription__
 *
 * To run a query within a React component, call `useC_UserReserveIncentivesDataUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useC_UserReserveIncentivesDataUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useC_UserReserveIncentivesDataUpdateSubscription({
 *   variables: {
 *      userAddress: // value for 'userAddress'
 *      lendingPoolAddressProvider: // value for 'lendingPoolAddressProvider'
 *      chainId: // value for 'chainId'
 *   },
 * });
 */
export function useC_UserReserveIncentivesDataUpdateSubscription(
  baseOptions: ApolloReactHooks.SubscriptionHookOptions<
    C_UserReserveIncentivesDataUpdateSubscription,
    C_UserReserveIncentivesDataUpdateSubscriptionVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSubscription<
    C_UserReserveIncentivesDataUpdateSubscription,
    C_UserReserveIncentivesDataUpdateSubscriptionVariables
  >(C_UserReserveIncentivesDataUpdateDocument, options);
}
export type C_UserReserveIncentivesDataUpdateSubscriptionHookResult = ReturnType<
  typeof useC_UserReserveIncentivesDataUpdateSubscription
>;
export type C_UserReserveIncentivesDataUpdateSubscriptionResult =
  ApolloReactCommon.SubscriptionResult<C_UserReserveIncentivesDataUpdateSubscription>;

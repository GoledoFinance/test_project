import { ReserveDataHumanized } from '@goledo-sdk/contract-helpers';
import {
  ComputedUserReserve,
  formatReservesAndIncentives,
  formatUserSummaryAndIncentives,
  FormatUserSummaryAndIncentivesResponse,
  UserReserveData,
} from '@goledo-sdk/math-utils';
import BigNumber from 'bignumber.js';
import React, { useContext } from 'react';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';

import { useCurrentTimestamp } from '../useCurrentTimestamp';
import { useProtocolDataContext } from '../useProtocolDataContext';
import {
  useC_ProtocolDataQuery,
  useC_ReservesIncentivesQuery,
  useC_UserDataQuery,
  useC_UserReservesIncentivesQuery,
} from './graphql/hooks';
import {
  useC_MasterChefIncentivesQuery,
  useC_UserMasterChefIncentivesQuery,
} from './graphql/master-chef-hooks';
import { useC_UserGoledoStakeDataQuery } from './graphql/stake-hooks';

/**
 * removes the marketPrefix from a symbol
 * @param symbol
 * @param prefix
 */
export const unPrefixSymbol = (symbol: string, prefix: string) => {
  return symbol.toUpperCase().replace(RegExp(`^(${prefix[0]}?${prefix.slice(1)})`), '');
};

export type ComputedReserveData = ReturnType<typeof formatReservesAndIncentives>[0] &
  ReserveDataHumanized & {
    iconSymbol: string;
    isWrappedBaseAsset: boolean;
  };

export type ComputedUserReserveData = ComputedUserReserve<ComputedReserveData>;

export type ExtendedFormattedUser = FormatUserSummaryAndIncentivesResponse<ComputedReserveData> & {
  earnedAPY: number;
  debtAPY: number;
  netAPY: number;
  isInEmode: boolean;
  userEmodeCategoryId: number;
};

export interface RewardInfo {
  emissionEndTimestamp: number;
  emissionPerSecond: string;
  priceFeedDecimals: number;
  rewardOracleAddress: string;
  rewardPriceFeed: string;
  rewardTokenAddress: string;
  rewardTokenDecimals: number;
  rewardTokenSymbol: string;
}

export interface ReserveIncentiveData {
  rewardsTokenInformation: Array<RewardInfo>;
  tokenAddress: string;
  tokenSymbol: string;
  tokenDecimals: number;
  totalStakedBalance: string;
}

export interface UserRewardInfo {
  priceFeedDecimals: number;
  rewardOracleAddress: string;
  rewardPriceFeed: string;
  rewardTokenAddress: string;
  rewardTokenDecimals: number;
  rewardTokenSymbol: string;
  userUnclaimedRewards: string;
}

export interface UserIncentiveData {
  tokenAddress: string;
  userStakedBalance: string;
  userWalletBalance: string;
  userRewardsInformation: Array<UserRewardInfo>;
}

export interface GoledoLockedBalance {
  amount: string;
  expire: number;
}

export interface GoledoRewardBalance {
  amount: string;
  token: string;
}

export interface UserGoledoStakeData {
  vestings: Array<GoledoLockedBalance>;
  lockings: Array<GoledoLockedBalance>;
  rewards: Array<GoledoRewardBalance>;
  totalBalance: string;
  walletBalance: string;
  unlockedBalance: string;
}

export interface AppDataContextType {
  loading: boolean;
  reserves: ComputedReserveData[];
  // refreshPoolData?: () => Promise<void[]>;
  isUserHasDeposits: boolean;
  user: ExtendedFormattedUser;
  // refreshIncentives?: () => Promise<void>;
  // loading: boolean;

  marketReferencePriceInUsd: string;
  marketReferenceCurrencyDecimals: number;
  userReserves: UserReserveData[];
  reservesIncentives: ReserveIncentiveData[];
  userReserveIncentives: UserIncentiveData[];
  masterChefIncentives: ReserveIncentiveData[];
  userMasterChefIncentives: UserIncentiveData[];
  userGoledoStake: UserGoledoStakeData;
}

const AppDataContext = React.createContext<AppDataContextType>({} as AppDataContextType);

/**
 * This is the only provider you'll ever need.
 * It fetches reserves /incentives & walletbalances & keeps them updated.
 */
export const AppDataProvider: React.FC = ({ children }) => {
  const currentTimestamp = useCurrentTimestamp(1);
  const { currentAccount } = useWeb3Context();
  const { currentMarketData, currentChainId, currentNetworkConfig } = useProtocolDataContext();

  const { data: reservesData } = useC_ProtocolDataQuery({
    variables: {
      lendingPoolAddressProvider: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
      chainId: currentChainId,
    },
    fetchPolicy: 'cache-only',
  });

  const { data: userReservesData } = useC_UserDataQuery({
    variables: {
      lendingPoolAddressProvider: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
      userAddress: currentAccount,
      chainId: currentChainId,
    },
    fetchPolicy: 'cache-only',
  });

  const reserves: ReserveDataHumanized[] = reservesData?.protocolData.reserves || [];
  const marketReferencePriceInUsd = reservesData?.protocolData.marketReferencePriceInUsd || '0';
  const { data: reservesIncentivesData } = useC_ReservesIncentivesQuery({
    variables: {
      lendingPoolAddressProvider: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
      chainId: currentChainId,
    },
    fetchPolicy: 'cache-only',
  });
  const { data: userReservesIncentivesData } = useC_UserReservesIncentivesQuery({
    variables: {
      lendingPoolAddressProvider: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
      userAddress: currentAccount,
      chainId: currentChainId,
    },
    fetchPolicy: 'cache-only',
  });
  const { data: masterChefIncentivesData } = useC_MasterChefIncentivesQuery({
    variables: {
      lendingPoolAddressProvider: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
      chainId: currentChainId,
    },
    fetchPolicy: 'cache-only',
  });
  const { data: userMasterChefIncentivesData } = useC_UserMasterChefIncentivesQuery({
    variables: {
      lendingPoolAddressProvider: currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
      userAddress: currentAccount,
      chainId: currentChainId,
    },
    fetchPolicy: 'cache-only',
  });
  const { data: userGoledoStakeData } = useC_UserGoledoStakeDataQuery({
    variables: {
      userAddress: currentAccount,
      chainId: currentChainId,
    },
    fetchPolicy: 'cache-only',
  });

  const formattedPoolReserves = formatReservesAndIncentives({
    reserves,
    currentTimestamp,
    marketReferenceCurrencyDecimals: 18,
    marketReferencePriceInUsd: marketReferencePriceInUsd,
    reserveIncentives: [],
  })
    .map((r) => ({
      ...r,
      ...fetchIconSymbolAndName(r),
      isWrappedBaseAsset:
        r.symbol.toLowerCase() === currentNetworkConfig.wrappedBaseAssetSymbol?.toLowerCase(),
    }))
    .sort(reserveSortFn);

  const userReserves: UserReserveData[] = userReservesData?.userData.userReserves || [];

  const userEmodeCategoryId = userReservesData?.userData.userEmodeCategoryId || 0;

  const user = formatUserSummaryAndIncentives({
    currentTimestamp,
    marketReferencePriceInUsd: marketReferencePriceInUsd,
    marketReferenceCurrencyDecimals: 18,
    userReserves,
    formattedReserves: formattedPoolReserves,
    userEmodeCategoryId: userEmodeCategoryId,
    reserveIncentives: [],
    userIncentives: [],
  });

  const proportions = user.userReservesData.reduce(
    (acc, value) => {
      const reserve = formattedPoolReserves.find(
        (r) => r.underlyingAsset === value.reserve.underlyingAsset
      );

      if (reserve) {
        if (value.underlyingBalanceUSD !== '0') {
          acc.positiveProportion = acc.positiveProportion.plus(
            new BigNumber(reserve.supplyAPY).multipliedBy(value.underlyingBalanceUSD)
          );
          if (reserve.aIncentivesData) {
            reserve.aIncentivesData.forEach((incentive) => {
              acc.positiveProportion = acc.positiveProportion.plus(
                new BigNumber(incentive.incentiveAPR).multipliedBy(value.underlyingBalanceUSD)
              );
            });
          }
        }
        if (value.variableBorrowsUSD !== '0') {
          acc.negativeProportion = acc.negativeProportion.plus(
            new BigNumber(reserve.variableBorrowAPY).multipliedBy(value.variableBorrowsUSD)
          );
          if (reserve.vIncentivesData) {
            reserve.vIncentivesData.forEach((incentive) => {
              acc.positiveProportion = acc.positiveProportion.plus(
                new BigNumber(incentive.incentiveAPR).multipliedBy(value.variableBorrowsUSD)
              );
            });
          }
        }
        if (value.stableBorrowsUSD !== '0') {
          acc.negativeProportion = acc.negativeProportion.plus(
            new BigNumber(value.stableBorrowAPY).multipliedBy(value.stableBorrowsUSD)
          );
          if (reserve.sIncentivesData) {
            reserve.sIncentivesData.forEach((incentive) => {
              acc.positiveProportion = acc.positiveProportion.plus(
                new BigNumber(incentive.incentiveAPR).multipliedBy(value.stableBorrowsUSD)
              );
            });
          }
        }
      } else {
        throw new Error('no possible to calculate net apy');
      }

      return acc;
    },
    {
      positiveProportion: new BigNumber(0),
      negativeProportion: new BigNumber(0),
    }
  );

  const isUserHasDeposits = user.userReservesData.some(
    (userReserve) => userReserve.scaledATokenBalance !== '0'
  );

  const earnedAPY = proportions.positiveProportion.dividedBy(user.totalLiquidityUSD).toNumber();
  const debtAPY = proportions.negativeProportion.dividedBy(user.totalBorrowsUSD).toNumber();
  const netAPY =
    (earnedAPY || 0) *
      (Number(user.totalLiquidityUSD) / Number(user.netWorthUSD !== '0' ? user.netWorthUSD : '1')) -
    (debtAPY || 0) *
      (Number(user.totalBorrowsUSD) / Number(user.netWorthUSD !== '0' ? user.netWorthUSD : '1'));

  return (
    <AppDataContext.Provider
      value={{
        loading:
          !reserves.length ||
          (!!currentAccount && userReservesData?.userData.userReserves === undefined),
        reserves: formattedPoolReserves,
        user: {
          ...user,
          userEmodeCategoryId,
          isInEmode: userEmodeCategoryId !== 0,
          userReservesData: user.userReservesData.sort((a, b) =>
            reserveSortFn(a.reserve, b.reserve)
          ),
          earnedAPY,
          debtAPY,
          netAPY,
        },
        userReserves,
        isUserHasDeposits,
        marketReferencePriceInUsd: marketReferencePriceInUsd,
        marketReferenceCurrencyDecimals: 18,
        reservesIncentives:
          reservesIncentivesData && reservesIncentivesData.reservesIncentives
            ? reservesIncentivesData.reservesIncentives.map(({ data }) => ({
                rewardsTokenInformation: data.rewardsTokenInformation.map((v) => ({
                  emissionEndTimestamp: v.emissionEndTimestamp,
                  emissionPerSecond: v.emissionPerSecond,
                  priceFeedDecimals: v.priceFeedDecimals,
                  rewardOracleAddress: v.rewardOracleAddress,
                  rewardPriceFeed: v.rewardPriceFeed,
                  rewardTokenAddress: v.rewardTokenAddress,
                  rewardTokenDecimals: v.rewardTokenDecimals,
                  rewardTokenSymbol: v.rewardTokenSymbol,
                })),
                tokenAddress: data.tokenAddress,
                tokenSymbol: data.tokenSymbol,
                tokenDecimals: data.tokenDecimals,
                totalStakedBalance: data.totalStakedBalance,
              }))
            : [],
        userReserveIncentives:
          userReservesIncentivesData && userReservesIncentivesData.userReservesIncentives
            ? userReservesIncentivesData.userReservesIncentives.map(({ data }) => ({
                tokenAddress: data.tokenAddress,
                userStakedBalance: data.userStakedBalance,
                userWalletBalance: data.userWalletBalance,
                userRewardsInformation: data.userRewardsInformation.map((v) => ({
                  priceFeedDecimals: v.priceFeedDecimals,
                  rewardOracleAddress: v.rewardOracleAddress,
                  rewardPriceFeed: v.rewardPriceFeed,
                  rewardTokenAddress: v.rewardTokenAddress,
                  rewardTokenDecimals: v.rewardTokenDecimals,
                  rewardTokenSymbol: v.rewardTokenSymbol,
                  userUnclaimedRewards: v.userUnclaimedRewards,
                })),
              }))
            : [],
        masterChefIncentives:
          masterChefIncentivesData && masterChefIncentivesData.masterChefIncentives
            ? masterChefIncentivesData.masterChefIncentives.map(({ data }) => ({
                rewardsTokenInformation: data.rewardsTokenInformation.map((v) => ({
                  emissionEndTimestamp: v.emissionEndTimestamp,
                  emissionPerSecond: v.emissionPerSecond,
                  priceFeedDecimals: v.priceFeedDecimals,
                  rewardOracleAddress: v.rewardOracleAddress,
                  rewardPriceFeed: v.rewardPriceFeed,
                  rewardTokenAddress: v.rewardTokenAddress,
                  rewardTokenDecimals: v.rewardTokenDecimals,
                  rewardTokenSymbol: v.rewardTokenSymbol,
                })),
                tokenAddress: data.tokenAddress,
                tokenSymbol: data.tokenSymbol,
                tokenDecimals: data.tokenDecimals,
                totalStakedBalance: data.totalStakedBalance,
              }))
            : [],
        userMasterChefIncentives:
          userMasterChefIncentivesData && userMasterChefIncentivesData.userMasterChefIncentives
            ? userMasterChefIncentivesData.userMasterChefIncentives.map(({ data }) => ({
                tokenAddress: data.tokenAddress,
                userStakedBalance: data.userStakedBalance,
                userWalletBalance: data.userWalletBalance,
                userRewardsInformation: data.userRewardsInformation.map((v) => ({
                  priceFeedDecimals: v.priceFeedDecimals,
                  rewardOracleAddress: v.rewardOracleAddress,
                  rewardPriceFeed: v.rewardPriceFeed,
                  rewardTokenAddress: v.rewardTokenAddress,
                  rewardTokenDecimals: v.rewardTokenDecimals,
                  rewardTokenSymbol: v.rewardTokenSymbol,
                  userUnclaimedRewards: v.userUnclaimedRewards,
                })),
              }))
            : [],
        userGoledoStake: {
          vestings: userGoledoStakeData
            ? userGoledoStakeData.userGoledoStake.vestings.map((v) => ({
                amount: v.amount,
                expire: v.expire,
              }))
            : [],
          lockings: userGoledoStakeData
            ? userGoledoStakeData.userGoledoStake.lockings.map((v) => ({
                amount: v.amount,
                expire: v.expire,
              }))
            : [],
          rewards: userGoledoStakeData
            ? userGoledoStakeData.userGoledoStake.rewards.map((v) => ({
                amount: v.amount,
                token: v.token,
              }))
            : [],
          totalBalance: userGoledoStakeData?.userGoledoStake.totalBalance || '0',
          walletBalance: userGoledoStakeData?.userGoledoStake.walletBalance || '0',
          unlockedBalance: userGoledoStakeData?.userGoledoStake.unlockedBalance || '0',
        },
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export const useAppDataContext = () => useContext(AppDataContext);

// tokens flagged stable will be sorted on top when no other sorting is selected
const stable = [
  'DAI',
  'TUSD',
  'BUSD',
  'GUSD',
  'USDC',
  'USDT',
  'EUROS',
  'FEI',
  'FRAX',
  'PAX',
  'USDP',
  'SUSD',
  'UST',
  'EURS',
  'JEUR',
  'AGEUR',
];

const reserveSortFn = (a: { iconSymbol: string }, b: { iconSymbol: string }) => {
  const aIsStable = stable.includes(a.iconSymbol.toUpperCase());
  const bIsStable = stable.includes(b.iconSymbol.toUpperCase());
  if (aIsStable && !bIsStable) return -1;
  if (!aIsStable && bIsStable) return 1;
  return a.iconSymbol.toUpperCase() > b.iconSymbol.toUpperCase() ? 1 : -1;
};

import { BigNumber } from 'ethers';

export interface IncentiveData {
  0: Array<{
    token: string;
    decimals: number;
    symbol: string;
    walletBalance: BigNumber;
    totalSupply: BigNumber;
    staked: BigNumber;
    claimable: BigNumber;
    allocPoint: BigNumber;
  }>;
  1: {
    totalAllocPoint: BigNumber;
    rewardsPerSecond: BigNumber;
  };
  2: Array<{
    token: string;
    decimals: number;
    symbol: string;
    walletBalance: BigNumber;
    totalSupply: BigNumber;
    staked: BigNumber;
    claimable: BigNumber;
    allocPoint: BigNumber;
  }>;
  3: {
    totalAllocPoint: BigNumber;
    rewardsPerSecond: BigNumber;
  };
  4: {
    totalBalance: BigNumber;
    walletBalance: BigNumber;
    unlockedBalance: BigNumber;
    earnedBalances: Array<{ amount: BigNumber; unlockTime: BigNumber }>;
    lockedBalances: Array<{ amount: BigNumber; unlockTime: BigNumber }>;
    rewards: Array<{ token: string; amount: BigNumber }>;
  };
  5: {
    token: string;
    decimals: number;
    symbol: string;
    totalSupply: BigNumber;
    lockedSupply: BigNumber;
  };
}

export interface IncentiveDataHumanized {
  controllerUserData: Array<UserIncentiveDataHumanized>;
  controllerData: {
    totalAllocPoint: number;
    rewardsPerSecond: string;
  };
  chefUserData: Array<UserIncentiveDataHumanized>;
  chefData: {
    totalAllocPoint: number;
    rewardsPerSecond: string;
  };
  stakeUserData: {
    totalBalance: string;
    walletBalance: string;
    unlockedBalance: string;
    lockedBalance: string;
    earnedBalances: Array<{ amount: string; unlockTime: number }>;
    lockedBalances: Array<{ amount: string; unlockTime: number }>;
    rewards: Array<{ token: string; amount: string }>;
  };
  stakeData: {
    token: string;
    decimals: number;
    symbol: string;
    totalSupply: string;
    lockedSupply: string;
  };
}

export interface UserIncentiveDataHumanized {
  token: string;
  decimals: number;
  symbol: string;
  walletBalance: string;
  totalSupply: string;
  staked: string;
  claimable: string;
  allocPoint: number;
}

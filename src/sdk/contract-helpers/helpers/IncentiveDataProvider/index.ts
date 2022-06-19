import { ethers, providers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { IncentiveHelperInput } from '../../index';
import {
  IncentiveDataProvider as IncentiveDataProviderContract,
  IncentiveDataProvider__factory,
} from '../../typechain';
import { IncentiveData, IncentiveDataHumanized, UserIncentiveDataHumanized } from './types';

export * from './types';

export interface IncentiveDataProviderContext {
  incentiveDataProviderAddress: string;
  provider: providers.Provider;
  chainId: number;
}

export interface IncentiveDataProviderInterface {
  getUserIncentive: (args: IncentiveHelperInput) => Promise<IncentiveData>;
  getUserIncentiveHumanized: (args: IncentiveHelperInput) => Promise<IncentiveDataHumanized>;
}

export class IncentiveDataProvider implements IncentiveDataProviderInterface {
  private readonly _contract: IncentiveDataProviderContract;

  private readonly chainId: number;

  public constructor(context: IncentiveDataProviderContext) {
    if (!isAddress(context.incentiveDataProviderAddress)) {
      throw new Error('contract address is not valid');
    }

    this._contract = IncentiveDataProvider__factory.connect(
      context.incentiveDataProviderAddress,
      context.provider
    );
    this.chainId = context.chainId;
  }

  public async getUserIncentive({ user }: IncentiveHelperInput): Promise<IncentiveData> {
    if (!isAddress(user)) {
      throw new Error('User address is not a valid ethereum address');
    }

    return this._contract.getUserIncentive(user);
  }

  public async getUserIncentiveHumanized({
    user,
  }: IncentiveHelperInput): Promise<IncentiveDataHumanized> {
    if (!isAddress(user)) {
      throw new Error('User address is not a valid ethereum address');
    }

    const {
      0: controllerUserData,
      1: controllerData,
      2: chefUserData,
      3: chefData,
      4: stakeUserData,
      5: stakeData,
    } = await this.getUserIncentive({ user });
    return {
      controllerUserData: controllerUserData.map((data) => {
        return {
          token: data.token,
          totalSupply: ethers.utils.formatEther(data.totalSupply),
          staked: ethers.utils.formatEther(data.staked),
          claimable: ethers.utils.formatEther(data.claimable),
          allocPoint: data.allocPoint.toNumber(),
        } as UserIncentiveDataHumanized;
      }),
      controllerData: {
        totalAllocPoint: controllerData.totalAllocPoint.toNumber(),
        rewardsPerSecond: ethers.utils.formatEther(controllerData.rewardsPerSecond),
      },
      chefUserData: chefUserData.map((data) => {
        return {
          token: data.token,
          totalSupply: ethers.utils.formatEther(data.totalSupply),
          staked: ethers.utils.formatEther(data.staked),
          claimable: ethers.utils.formatEther(data.claimable),
          allocPoint: data.allocPoint.toNumber(),
        } as UserIncentiveDataHumanized;
      }),
      chefData: {
        totalAllocPoint: chefData.totalAllocPoint.toNumber(),
        rewardsPerSecond: ethers.utils.formatEther(chefData.rewardsPerSecond),
      },
      stakeUserData: {
        totalBalance: ethers.utils.formatEther(stakeUserData.totalBalance),
        unlockedBalance: ethers.utils.formatEther(stakeUserData.unlockedBalance),
        lockedBalance: ethers.utils.formatEther(
          stakeUserData.totalBalance.sub(stakeUserData.unlockedBalance)
        ),
        earnedBalances: stakeUserData.earnedBalances.map((data) => {
          return {
            amount: ethers.utils.formatEther(data.amount),
            unlockTime: data.unlockTime.toNumber(),
          };
        }),
        lockedBalances: stakeUserData.lockedBalances.map((data) => {
          return {
            amount: ethers.utils.formatEther(data.amount),
            unlockTime: data.unlockTime.toNumber(),
          };
        }),
        rewards: stakeUserData.rewards.map((data) => {
          return {
            token: data.token,
            amount: data.amount.toString(),
          };
        }),
      },
      stakeData: {
        totalSupply: ethers.utils.formatEther(stakeData.totalSupply),
        lockedSupply: ethers.utils.formatEther(stakeData.lockedSupply),
      },
    };
  }
}

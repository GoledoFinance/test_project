export type RewardsItem = {
  iconSymbol: string;
  symbol: string;
  name: string;
  underlyingAsset: string;
  earned: string;
  stakedBalance: string;
  lockedBalance?: string;
  tokens: string[];
  stakingContract: string;
};

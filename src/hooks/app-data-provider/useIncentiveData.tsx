import BigNumber from 'bignumber.js';

export interface ReserveIncentiveResponse {
  incentiveAPR: string;
  rewardTokenAddress: string;
  rewardTokenSymbol: string;
}

export interface UserIncentiveResponse {
  incentiveControllerAddress: string;
  rewardTokenSymbol: string;
  rewardPriceFeed: string;
  rewardTokenDecimals: number;
  claimableRewards: BigNumber;
  assets: string[];
}

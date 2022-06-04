import { BigNumber } from 'ethers';

export interface ReservesData {
  0: Array<{
    underlyingAsset: string;
    name: string;
    symbol: string;
    decimals: BigNumber;
    baseLTVasCollateral: BigNumber;
    reserveLiquidationThreshold: BigNumber;
    reserveLiquidationBonus: BigNumber;
    reserveFactor: BigNumber;
    usageAsCollateralEnabled: boolean;
    borrowingEnabled: boolean;
    stableBorrowRateEnabled: boolean;
    isActive: boolean;
    isFrozen: boolean;
    liquidityIndex: BigNumber;
    variableBorrowIndex: BigNumber;
    liquidityRate: BigNumber;
    variableBorrowRate: BigNumber;
    stableBorrowRate: BigNumber;
    lastUpdateTimestamp: number;
    aTokenAddress: string;
    stableDebtTokenAddress: string;
    variableDebtTokenAddress: string;
    interestRateStrategyAddress: string;
    availableLiquidity: BigNumber;
    totalPrincipalStableDebt: BigNumber;
    averageStableRate: BigNumber;
    stableDebtLastUpdateTimestamp: BigNumber;
    totalScaledVariableDebt: BigNumber;
    priceInEth: BigNumber;
    variableRateSlope1: BigNumber;
    variableRateSlope2: BigNumber;
    stableRateSlope1: BigNumber;
    stableRateSlope2: BigNumber;
  }>;
  1: BigNumber;
  2: BigNumber;
}

export interface UserReserveData {
  0: Array<{
    underlyingAsset: string;
    scaledATokenBalance: BigNumber;
    usageAsCollateralEnabledOnUser: boolean;
    stableBorrowRate: BigNumber;
    scaledVariableDebt: BigNumber;
    principalStableDebt: BigNumber;
    stableBorrowLastUpdateTimestamp: BigNumber;
  }>;
  1: BigNumber;
}

export interface ReserveDataHumanized {
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
}

export interface ReservesDataHumanized {
  reservesData: ReserveDataHumanized[];
  marketReferencePriceInUsd: string;
  emissionEndTimestamp: number;
}

export interface UserReserveDataHumanized {
  id: string;
  underlyingAsset: string;
  scaledATokenBalance: string;
  usageAsCollateralEnabledOnUser: boolean;
  stableBorrowRate: string;
  scaledVariableDebt: string;
  principalStableDebt: string;
  stableBorrowLastUpdateTimestamp: number;
}

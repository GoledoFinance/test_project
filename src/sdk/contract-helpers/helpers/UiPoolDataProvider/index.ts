import { providers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import { ReservesHelperInput, UserReservesHelperInput } from '../../index';
import {
  UiPoolDataProvider as UiPoolDataProviderContract,
  UiPoolDataProvider__factory,
} from '../../typechain';
import {
  ReservesData,
  UserReserveData,
  ReserveDataHumanized,
  ReservesDataHumanized,
  UserReserveDataHumanized,
} from './types';

export * from './types';

export interface UiPoolDataProviderContext {
  uiPoolDataProviderAddress: string;
  provider: providers.Provider;
  chainId: number;
}

export interface UiPoolDataProviderInterface {
  getReservesList: (args: ReservesHelperInput) => Promise<string[]>;
  getReservesData: (args: ReservesHelperInput) => Promise<ReservesData>;
  getUserReservesData: (args: UserReservesHelperInput) => Promise<UserReserveData>;
  getReservesHumanized: (args: ReservesHelperInput) => Promise<ReservesDataHumanized>;
  getUserReservesHumanized: (args: UserReservesHelperInput) => Promise<{
    userReserves: UserReserveDataHumanized[];
    userEmodeCategoryId: number;
  }>;
}

export class UiPoolDataProvider implements UiPoolDataProviderInterface {
  private readonly _contract: UiPoolDataProviderContract;

  private readonly chainId: number;
  /**
   * Constructor
   * @param context The ui pool data provider context
   */
  public constructor(context: UiPoolDataProviderContext) {
    if (!isAddress(context.uiPoolDataProviderAddress)) {
      throw new Error('contract address is not valid');
    }

    this._contract = UiPoolDataProvider__factory.connect(
      context.uiPoolDataProviderAddress,
      context.provider
    );
    this.chainId = context.chainId;
  }

  /**
   * Get the underlying asset address for each lending pool reserve
   */
  public async getReservesList({
    lendingPoolAddressProvider,
  }: ReservesHelperInput): Promise<string[]> {
    if (!isAddress(lendingPoolAddressProvider)) {
      throw new Error('Lending pool address is not valid');
    }

    return this._contract.getReservesList(lendingPoolAddressProvider);
  }

  /**
   * Get data for each lending pool reserve
   */
  public async getReservesData({
    lendingPoolAddressProvider,
  }: ReservesHelperInput): Promise<ReservesData> {
    if (!isAddress(lendingPoolAddressProvider)) {
      throw new Error('Lending pool address is not valid');
    }

    return this._contract.getSimpleReservesData(lendingPoolAddressProvider);
  }

  /**
   * Get data for each user reserve on the lending pool
   */
  public async getUserReservesData({
    lendingPoolAddressProvider,
    user,
  }: UserReservesHelperInput): Promise<UserReserveData> {
    if (!isAddress(lendingPoolAddressProvider)) {
      throw new Error('Lending pool address is not valid');
    }

    if (!isAddress(user)) {
      throw new Error('User address is not a valid ethereum address');
    }

    return this._contract.getUserReservesData(lendingPoolAddressProvider, user);
  }

  public async getReservesHumanized({
    lendingPoolAddressProvider,
  }: ReservesHelperInput): Promise<ReservesDataHumanized> {
    const {
      0: reservesRaw,
      1: marketReferencePriceInUsd,
      2: emissionEndTimestamp,
    }: ReservesData = await this.getReservesData({
      lendingPoolAddressProvider,
    });

    const reservesData: ReserveDataHumanized[] = reservesRaw.map((reserveRaw) => ({
      id: `${this.chainId}-${reserveRaw.underlyingAsset}-${lendingPoolAddressProvider}`.toLowerCase(),
      underlyingAsset: reserveRaw.underlyingAsset.toLowerCase(),
      name: reserveRaw.name,
      symbol: reserveRaw.symbol,
      decimals: reserveRaw.decimals.toNumber(),
      baseLTVasCollateral: reserveRaw.baseLTVasCollateral.toString(),
      reserveLiquidationThreshold: reserveRaw.reserveLiquidationThreshold.toString(),
      reserveLiquidationBonus: reserveRaw.reserveLiquidationBonus.toString(),
      reserveFactor: reserveRaw.reserveFactor.toString(),
      usageAsCollateralEnabled: reserveRaw.usageAsCollateralEnabled,
      borrowingEnabled: reserveRaw.borrowingEnabled,
      stableBorrowRateEnabled: reserveRaw.stableBorrowRateEnabled,
      isActive: reserveRaw.isActive,
      isFrozen: reserveRaw.isFrozen,
      liquidityIndex: reserveRaw.liquidityIndex.toString(),
      variableBorrowIndex: reserveRaw.variableBorrowIndex.toString(),
      liquidityRate: reserveRaw.liquidityRate.toString(),
      variableBorrowRate: reserveRaw.variableBorrowRate.toString(),
      stableBorrowRate: reserveRaw.stableBorrowRate.toString(),
      lastUpdateTimestamp: reserveRaw.lastUpdateTimestamp,
      aTokenAddress: reserveRaw.aTokenAddress.toString(),
      stableDebtTokenAddress: reserveRaw.stableDebtTokenAddress.toString(),
      variableDebtTokenAddress: reserveRaw.variableDebtTokenAddress.toString(),
      interestRateStrategyAddress: reserveRaw.interestRateStrategyAddress.toString(),
      availableLiquidity: reserveRaw.availableLiquidity.toString(),
      totalPrincipalStableDebt: reserveRaw.totalPrincipalStableDebt.toString(),
      averageStableRate: reserveRaw.averageStableRate.toString(),
      stableDebtLastUpdateTimestamp: reserveRaw.stableDebtLastUpdateTimestamp.toNumber(),
      totalScaledVariableDebt: reserveRaw.totalScaledVariableDebt.toString(),
      priceInEth: reserveRaw.priceInEth.toString(),
      variableRateSlope1: reserveRaw.variableRateSlope1.toString(),
      variableRateSlope2: reserveRaw.variableRateSlope2.toString(),
      stableRateSlope1: reserveRaw.stableRateSlope1.toString(),
      stableRateSlope2: reserveRaw.stableRateSlope2.toString(),
    }));

    return {
      reservesData,
      marketReferencePriceInUsd: marketReferencePriceInUsd.toString(),
      emissionEndTimestamp: emissionEndTimestamp.toNumber(),
    };
  }

  public async getUserReservesHumanized({
    lendingPoolAddressProvider,
    user,
  }: UserReservesHelperInput): Promise<{
    userReserves: UserReserveDataHumanized[];
    userEmodeCategoryId: number;
  }> {
    const { 0: userReservesRaw, 1: userEmodeCategoryId }: UserReserveData =
      await this.getUserReservesData({ lendingPoolAddressProvider, user });

    return {
      userReserves: userReservesRaw.map((userReserveRaw) => ({
        id: `${this.chainId}-${user}-${userReserveRaw.underlyingAsset}-${lendingPoolAddressProvider}`.toLowerCase(),
        underlyingAsset: userReserveRaw.underlyingAsset.toLowerCase(),
        scaledATokenBalance: userReserveRaw.scaledATokenBalance.toString(),
        usageAsCollateralEnabledOnUser: userReserveRaw.usageAsCollateralEnabledOnUser,
        stableBorrowRate: userReserveRaw.stableBorrowRate.toString(),
        scaledVariableDebt: userReserveRaw.scaledVariableDebt.toString(),
        principalStableDebt: userReserveRaw.principalStableDebt.toString(),
        stableBorrowLastUpdateTimestamp: userReserveRaw.stableBorrowLastUpdateTimestamp.toNumber(),
      })),
      userEmodeCategoryId: userEmodeCategoryId.toNumber(),
    };
  }
}

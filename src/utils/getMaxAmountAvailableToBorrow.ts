import { InterestRate } from '@goledo-sdk/contract-helpers';
import { FormatUserSummaryAndIncentivesResponse, valueToBigNumber } from '@goledo-sdk/math-utils';
import BigNumber from 'bignumber.js';

import {
  ComputedReserveData,
  ExtendedFormattedUser,
} from '../hooks/app-data-provider/useAppDataProvider';

/**
 * Calculates the maximum amount a user can borrow.
 * @param poolReserve
 * @param userReserve
 * @param user
 */
export function getMaxAmountAvailableToBorrow(
  poolReserve: ComputedReserveData,
  user: FormatUserSummaryAndIncentivesResponse,
  rateMode: InterestRate
) {
  const availableInPoolUSD = poolReserve.availableLiquidityUSD;
  const availableForUserUSD = BigNumber.min(user.availableBorrowsUSD, availableInPoolUSD);

  let maxUserAmountToBorrow = BigNumber.min(
    valueToBigNumber(user?.availableBorrowsMarketReferenceCurrency || 0).div(
      poolReserve.formattedPriceInETH
    ),
    poolReserve.formattedAvailableLiquidity
  );

  if (rateMode === InterestRate.Stable) {
    maxUserAmountToBorrow = BigNumber.min(
      maxUserAmountToBorrow,
      // TODO: put MAX_STABLE_RATE_BORROW_SIZE_PERCENT on uipooldataprovider instead of using the static value here
      valueToBigNumber(poolReserve.formattedAvailableLiquidity).multipliedBy(0.25)
    );
  }

  const shouldAddMargin =
    /**
     * When a user has borrows we assume the debt is increasing faster then the supply.
     * That's a simplification that might not be true, but doesn't matter in most cases.
     */
    (user.totalBorrowsMarketReferenceCurrency !== '0' &&
      availableForUserUSD.lt(availableInPoolUSD)) ||
    /**
     * When the user could in theory borrow all, but the debt accrues the available decreases from block to block.
     */
    (availableForUserUSD.eq(availableInPoolUSD) && poolReserve.totalDebt !== '0');

  return shouldAddMargin ? maxUserAmountToBorrow.multipliedBy('0.99') : maxUserAmountToBorrow;
}

export function assetCanBeBorrowedByUser(
  { borrowingEnabled, isActive }: ComputedReserveData,
  _user: ExtendedFormattedUser
) {
  if (!borrowingEnabled || !isActive) return false;
  return true;
}

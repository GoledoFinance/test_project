import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';
import { valueToBigNumber } from '@goledo-sdk/math-utils';
import BigNumber from 'bignumber.js';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function remainingCap(_poolReserve: ComputedReserveData) {
  return new BigNumber(-1);
}

export function getMaxAmountAvailableToSupply(
  walletBalance: string,
  _poolReserve: ComputedReserveData,
  underlyingAsset: string
) {
  // Calculate max amount to supply
  let maxAmountToSupply = valueToBigNumber(walletBalance);

  // keep a bit for other transactions
  if (
    maxAmountToSupply.gt(0) &&
    underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
  ) {
    maxAmountToSupply = maxAmountToSupply.minus('0.001');
  }

  if (maxAmountToSupply.lte(0)) {
    maxAmountToSupply = valueToBigNumber('0');
  }
  return maxAmountToSupply;
}

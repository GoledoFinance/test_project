import BigNumber from 'bignumber.js';
import { BigNumberValue, valueToBigNumber } from '../../bignumber';

interface NativeToUSD {
  amount: BigNumber;
  currencyDecimals: number;
  priceInEth: BigNumberValue;
  marketReferenceCurrencyDecimals: number;
  normalizedMarketReferencePriceInUsd: BigNumberValue;
}

export function nativeToUSD({
  amount,
  currencyDecimals,
  priceInEth,
  marketReferenceCurrencyDecimals,
  normalizedMarketReferencePriceInUsd,
}: NativeToUSD) {
  return valueToBigNumber(amount.toString())
    .multipliedBy(priceInEth)
    .multipliedBy(normalizedMarketReferencePriceInUsd)
    .dividedBy(new BigNumber(1).shiftedBy(currencyDecimals + marketReferenceCurrencyDecimals))
    .toString();
}

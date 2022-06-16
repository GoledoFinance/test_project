import { Button } from '@mui/material';
import BigNumber from 'bignumber.js';
import { useRef, useState } from 'react';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { AssetInput } from '../AssetInput';
import { valueToBigNumber } from '@goledo-sdk/math-utils';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { DetailsUnwrapSwitch } from '../FlowCommons/TxModalDetails';

export const WithdrawModalContent = ({
  poolReserve,
  userReserve,
  onSubmit,
  onAmountChange,
  amount,
  unwrap: withdrawUnWrapped,
  setUnwrap: setWithdrawUnWrapped,
}: ModalWrapperProps & {
  onSubmit: () => Promise<void>;
  onAmountChange: (v?: string) => Promise<void>;
  amount?: string;
  unwrap: boolean;
  setUnwrap: (unwrap: boolean) => void;
}) => {
  const { currentNetworkConfig } = useProtocolDataContext();
  const { user } = useAppDataContext();
  const [isMaxSelected, setIsMaxSelected] = useState(false);

  const amountRef = useRef<string>();

  const underlyingBalance = valueToBigNumber(userReserve?.underlyingBalance || '0');
  const unborrowedLiquidity = valueToBigNumber(poolReserve.unborrowedLiquidity);

  let maxAmountToWithdraw = BigNumber.min(underlyingBalance, unborrowedLiquidity);
  let maxCollateralToWithdrawInETH = valueToBigNumber('0');
  const reserveLiquidationThreshold = poolReserve.formattedReserveLiquidationThreshold;
  if (
    userReserve?.usageAsCollateralEnabledOnUser &&
    poolReserve.usageAsCollateralEnabled &&
    user.totalBorrowsMarketReferenceCurrency !== '0'
  ) {
    // if we have any borrowings we should check how much we can withdraw to a minimum HF of 1.01
    const excessHF = valueToBigNumber(user.healthFactor).minus('1.01');
    if (excessHF.gt('0')) {
      maxCollateralToWithdrawInETH = excessHF
        .multipliedBy(user.totalBorrowsMarketReferenceCurrency)
        .div(reserveLiquidationThreshold);
    }
    maxAmountToWithdraw = BigNumber.min(
      maxAmountToWithdraw,
      maxCollateralToWithdrawInETH.dividedBy(poolReserve.formattedPriceInETH)
    );
  }

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    if (!maxSelected && maxAmountToWithdraw.lt(new BigNumber(value))) {
      value = maxAmountToWithdraw.toString(10);
    }
    amountRef.current = maxSelected ? maxAmountToWithdraw.toString(10) : value;
    setIsMaxSelected(maxSelected);
    onAmountChange(amountRef.current);
  };

  const amountIntEth = new BigNumber(amount || '0').multipliedBy(poolReserve.formattedPriceInETH);
  const symbol =
    withdrawUnWrapped && poolReserve.isWrappedBaseAsset
      ? currentNetworkConfig.baseAssetSymbol
      : poolReserve.symbol;

  return (
    <>
      {poolReserve.isWrappedBaseAsset && (
        <DetailsUnwrapSwitch
          unwrapped={withdrawUnWrapped}
          setUnWrapped={setWithdrawUnWrapped}
          symbol={poolReserve.symbol}
          unwrappedSymbol={currentNetworkConfig.baseAssetSymbol}
        />
      )}
      <AssetInput
        inputTitle={'Available to withdraw'}
        value={amount || '0'}
        onChange={handleChange}
        usdValue={amountIntEth.toString(10)}
        symbol={symbol}
        assets={[
          {
            balance: maxAmountToWithdraw.toString(10),
            symbol: symbol,
            iconSymbol:
              withdrawUnWrapped && poolReserve.isWrappedBaseAsset
                ? currentNetworkConfig.baseAssetSymbol
                : poolReserve.iconSymbol,
          },
        ]}
        isMaxSelected={isMaxSelected}
        disabled={false}
        maxValue={maxAmountToWithdraw.toString(10)}
      />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 10, height: 40 }}
        onClick={onSubmit}
      >
        Continue
      </Button>
    </>
  );
};

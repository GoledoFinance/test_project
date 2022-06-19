import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import BigNumber from 'bignumber.js';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
// import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { DetailsUnwrapSwitch } from '../FlowCommons/TxModalDetails';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { getMaxAmountAvailableToBorrow } from 'src/utils/getMaxAmountAvailableToBorrow';
import { InterestRate } from '@goledo-sdk/contract-helpers';
import { AssetInput } from '../AssetInput';
import { CapType } from 'src/components/caps/helper';

export const BorrowModalContent = ({
  poolReserve,
  symbol,
  onSubmit,
  onAmountChange,
  amount,
  unwrap: borrowUnWrapped,
  setUnwrap: setBorrowUnWrapped,
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

  // amount calculations
  const maxAmountToBorrow = getMaxAmountAvailableToBorrow(poolReserve, user, InterestRate.Variable);
  const formattedMaxAmountToBorrow = maxAmountToBorrow.toString(10);

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    if (!maxSelected && maxAmountToBorrow.lt(new BigNumber(value))) {
      value = maxAmountToBorrow.toString(10);
    }
    amountRef.current = maxSelected ? maxAmountToBorrow.toString(10) : value;
    setIsMaxSelected(maxSelected);
    onAmountChange(amountRef.current);
  };

  const amountIntEth = new BigNumber(amount || '0').multipliedBy(poolReserve.formattedPriceInETH);

  return (
    <>
      {poolReserve.isWrappedBaseAsset && (
        <DetailsUnwrapSwitch
          unwrapped={borrowUnWrapped}
          setUnWrapped={setBorrowUnWrapped}
          symbol={poolReserve.symbol}
          unwrappedSymbol={currentNetworkConfig.baseAssetSymbol}
        />
      )}

      <AssetInput
        value={amount || '0'}
        onChange={handleChange}
        usdValue={amountIntEth.toString(10)}
        assets={[
          {
            balance: formattedMaxAmountToBorrow,
            symbol: symbol,
            iconSymbol:
              borrowUnWrapped && poolReserve.isWrappedBaseAsset
                ? currentNetworkConfig.baseAssetSymbol
                : poolReserve.iconSymbol,
          },
        ]}
        symbol={symbol}
        capType={CapType.borrowCap}
        isMaxSelected={isMaxSelected}
        maxValue={maxAmountToBorrow.toString(10)}
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

import { Button } from '@mui/material';
// import { LoadingButton } from '@mui/lab';
import * as React from 'react';
import BigNumber from 'bignumber.js';

// import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { AssetInput } from '../AssetInput';
import { useState } from 'react';
// import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export const StakeModalContent = ({
  type,
  amount,
  symbol,
  walletBalance,
  onSubmit,
  onAmountChange,
}: {
  type: 'lock' | 'stake';
  amount?: string;
  symbol: string;
  walletBalance: string;
  onSubmit: () => Promise<void>;
  onAmountChange: (v?: string) => Promise<void>;
}) => {
  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const amountRef = React.useRef<string>();

  const maxAmountToStake = new BigNumber(walletBalance);

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    if (!maxSelected && maxAmountToStake.lt(new BigNumber(value))) {
      value = maxAmountToStake.toString(10);
    }
    amountRef.current = maxSelected ? maxAmountToStake.toString(10) : value;
    setIsMaxSelected(maxSelected);
    onAmountChange(amountRef.current);
  };

  return (
    <>
      <AssetInput
        inputTitle={`How much do you want to ${type}?`}
        value={amount || '0'}
        onChange={handleChange}
        usdValue={'0'}
        symbol={symbol}
        assets={[
          {
            balance: walletBalance,
            symbol: symbol,
            iconSymbol: symbol,
          },
        ]}
        isMaxSelected={isMaxSelected}
        maxValue={maxAmountToStake.toString(10)}
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

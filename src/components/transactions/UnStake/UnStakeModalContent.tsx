import { Button, Typography } from '@mui/material';
import { AssetInput } from '../AssetInput';
import BigNumber from 'bignumber.js';
import { useRef, useState } from 'react';

export const UnStakeModalContent = ({
  type,
  onSubmit,
  amount,
  balance,
  onAmountChange,
}: {
  type?: 'lock' | 'stake';
  amount?: string;
  symbol: string;
  balance: string;
  onSubmit: () => Promise<void>;
  onAmountChange: (v?: string) => Promise<void>;
}) => {
  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const amountRef = useRef<string>();

  const maxAmountToUnstake = new BigNumber(balance);

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    if (!maxSelected && maxAmountToUnstake.lt(new BigNumber(value))) {
      value = maxAmountToUnstake.toString(10);
    }
    amountRef.current = maxSelected ? maxAmountToUnstake.toString(10) : value;
    setIsMaxSelected(maxSelected);
    onAmountChange(amountRef.current);
  };

  return (
    <>
      <Typography variant="main16" color={'#111'}>
        Un{type} your GoledoCFX
      </Typography>
      <AssetInput
        inputTitle={`How much do you want to un${type}?`}
        value={amount || '0'}
        onChange={handleChange}
        usdValue={'0'}
        symbol={'GDOCFX'}
        assets={[
          {
            balance: balance,
            symbol: 'GDOCFX',
            iconSymbol: 'GDOCFX',
          },
        ]}
        isMaxSelected={isMaxSelected}
        maxValue={balance}
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

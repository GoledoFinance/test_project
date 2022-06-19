import { Box, Typography, Stack, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as React from 'react';
import BigNumber from 'bignumber.js';

// import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { AssetInput } from '../AssetInput';
import { useState } from 'react';

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

  const maxAmountToBorrow = new BigNumber(walletBalance);

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    if (!maxSelected && maxAmountToBorrow.lt(new BigNumber(value))) {
      value = maxAmountToBorrow.toString(10);
    }
    amountRef.current = maxSelected ? maxAmountToBorrow.toString(10) : value;
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
            balance: '0',
            symbol: symbol,
            iconSymbol: symbol,
          },
        ]}
        isMaxSelected={false}
        maxValue={'0'}
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
  /*return (
    <>
      <Typography variant="main16" textTransform={'capitalize'}>
        {type} Goledo
      </Typography>
      <Typography variant="description" color={'#666'} mt={1} textTransform={'capitalize'}>
        {type} Goledo and earn platform fees with no lockup period.
      </Typography>

      <Box
        mt={2.5}
        borderRadius="8px"
        borderColor={'rgba(229, 229, 229, 1)'}
        sx={{ borderWidth: '1px', p: 4, borderStyle: 'solid', background: '#F8F8F8' }}
      >
        <Box display={'flex'} justifyContent="space-between" alignItems={'start'}>
          <Typography variant="main14">Wallet Balance:</Typography>
          <Box display={'flex'} flexDirection="column" alignItems={'flex-end'}>
            <FormattedNumber
              variant="main14"
              symbol="Goledo"
              value={7.162}
              visibleDecimals={5}
              symbolsColor="#111"
            />
            <FormattedNumber
              variant="main12"
              symbol="usd"
              compact={false}
              value={5339.12341}
              visibleDecimals={5}
              symbolsColor="#666"
              sx={{ color: '#666' }}
            />
          </Box>
        </Box>
      </Box>
      <Typography variant="main16" mt={5}>
        Stake Overview
      </Typography>
      <Typography variant="description" color={'#666'}>
        These are your transaction details. Make sure to check if this is correct before submitting.
      </Typography>
      <Box
        mt={2.5}
        borderRadius="8px"
        borderColor={'rgba(229, 229, 229, 1)'}
        sx={{ borderWidth: '1px', borderStyle: 'solid' }}
      >
      </Box>
    </>
  );*/
};

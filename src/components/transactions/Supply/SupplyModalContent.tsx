import { Box, Button, Typography } from '@mui/material';
import { useRef } from 'react';
import BigNumber from 'bignumber.js';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { AInput } from '../Withdraw/WithdrawModalContent';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';

export const SupplyModalContent = ({
  underlyingAsset,
  nativeBalance,
  tokenBalance,
  symbol,
  onSubmit,
}: ModalWrapperProps & { onSubmit: (v?: string) => Promise<void> }) => {
  const ref = useRef(null);

  const maxV =
    underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase()
      ? nativeBalance
      : tokenBalance;
  return (
    <>
      <Box display={'flex'} justifyContent="space-between" alignItems={'center'} mt={10}>
        <Typography variant="main14">Available to supply</Typography>
        <FormattedNumber
          variant="description"
          symbol={symbol}
          value={maxV}
          visibleDecimals={2}
          symbolsColor="#666"
          sx={{ color: '#666' }}
        />
      </Box>
      <AInput symbol={symbol} max={maxV} ref={ref} />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 10, height: 40 }}
        onClick={() => {
          const inputV: string = ref.current?.getValue?.() || '0';
          onSubmit(BigNumber.minimum(inputV, maxV).toString());
        }}
      >
        Continue
      </Button>
    </>
  );
};

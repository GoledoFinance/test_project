import { Box, Button, Typography } from '@mui/material';
import { useRef } from 'react';
import BigNumber from 'bignumber.js';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { AInput } from '../Withdraw/WithdrawModalContent';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

export const DepositeModalContent = ({
  symbol,
  onSubmit,
}: ModalWrapperProps & { onSubmit: (v?: string) => Promise<void> }) => {
  const ref = useRef(null);
  const maxV = '20.101';
  return (
    <>
      <Box display={'flex'} justifyContent="space-between" alignItems={'center'} mt={6}>
        <Typography variant="main14" color={'#666'}>
          Available to deposit
        </Typography>
        <FormattedNumber
          variant="description"
          symbol="ETH"
          value={maxV}
          visibleDecimals={4}
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

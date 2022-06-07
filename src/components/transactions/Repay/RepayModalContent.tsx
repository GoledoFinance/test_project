import { Box, Button, Typography } from '@mui/material';
import { useRef } from 'react';
import BigNumber from 'bignumber.js';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { AInput } from '../Withdraw/WithdrawModalContent';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

export const RepayModalContent = ({
  symbol,
  onSubmit,
}: ModalWrapperProps & { onSubmit: (v?: string) => Promise<void> }) => {
  const ref = useRef(null);
  const maxV = '20.101';
  return (
    <>
      <Typography variant="description" color={'#666'}>
        How much do you want to repay?
      </Typography>

      <Box display={'flex'} justifyContent="space-between" alignItems={'center'} mt={10}>
        <Typography variant="main14">Available to repay</Typography>
        <FormattedNumber
          variant="description"
          symbol="ETH"
          value={20.101}
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

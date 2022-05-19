import { Box, Button, Typography } from '@mui/material';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { AInput } from '../Withdraw/WithdrawModalContent';

export const DepositeModalContent = ({
  symbol,
  onSubmit,
}: ModalWrapperProps & { onSubmit: () => Promise<void> }) => {
  return (
    <>
      <Box display={'flex'} justifyContent="space-between" alignItems={'center'} mt={6}>
        <Typography variant="main14" color={'#666'}>
          Available to deposit
        </Typography>
        <Typography variant="description" color={'#666'}>
          20.101 ETH
        </Typography>
      </Box>
      <AInput symbol={symbol} />
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

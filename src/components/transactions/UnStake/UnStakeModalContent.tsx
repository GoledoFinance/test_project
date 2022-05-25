import { Button, Typography } from '@mui/material';

import { AInput } from '../Withdraw/WithdrawModalContent';

export const UnStakeModalContent = ({
  type,
  onSubmit,
}: {
  type?: 'lock' | 'stake';
  onSubmit: () => Promise<void>;
}) => {
  return (
    <>
      <Typography variant="main16" color={'#111'}>
        Un{type} your GoledoFTM
      </Typography>
      <Typography variant="description" color={'#666'} my="10px">
        How much would you like to un{type}?
      </Typography>
      <AInput symbol={'goledo'} placeholder="Enter Amount" max={false} />
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

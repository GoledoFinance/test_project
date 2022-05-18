import { Divider, Stack, Box, Typography, Button } from '@mui/material';
import { ReactNode } from 'react';

export const ActionList = () => {
  return (
    <Stack divider={<Divider />} spacing={3}>
      <ListItem
        title={'Unlocked Goledo'}
        desc={'Staked Goledo and expried Goledo vests'}
        num={2}
        claimFn={() => {
          console.log('???');
        }}
        disabled={false}
      />
      <ListItem
        title={'Vesting Goledo'}
        desc={
          <>
            Goledo that can be claimed with a{' '}
            <Typography component={'span'} color="red">
              50% penalty
            </Typography>
          </>
        }
        num={2}
        claimFn={() => {
          console.log('???');
        }}
      />
      <ListItem
        title={'Claim all of the above'}
        desc={
          <>
            Early exit penalty{' '}
            <Typography component={'span'} color="red">
              0.005 Goledo
            </Typography>
          </>
        }
        num={2}
      />
      <ListItem
        title={'Expired locked Goledo'}
        desc={'Goledo locks that have exceeded the 3 month lock period and are now withdrawable'}
        num={2}
        claimFn={() => {
          console.log('???');
        }}
        disabled
      />
    </Stack>
  );
};

const ListItem = ({
  title,
  desc,
  num,
  claimFn,
  disabled,
}: {
  title: ReactNode;
  desc: ReactNode;
  num?: number;
  claimFn?: () => void;
  disabled?: boolean;
}) => (
  <Box display={'flex'} alignItems="center">
    <Box width={353}>
      <Typography variant="main16">{title}</Typography>
      <Typography variant="description">{desc}</Typography>
    </Box>
    <Box flex={1} />
    {num && (
      <Box display={'flex'} alignItems="center" marginRight={7.5}>
        <img src={'/icons/tokens/goledo.svg'} alt="goledo" width={22} height={22} />
        <Typography variant="main16" marginLeft={2}>
          2 Goledo
        </Typography>
      </Box>
    )}
    {claimFn ? (
      <Button
        sx={{ width: '140px', height: '40px' }}
        variant="contained"
        onClick={claimFn}
        disabled={disabled}
      >
        Claim Goledo
      </Button>
    ) : (
      <Box width={140} />
    )}
  </Box>
);

import { Box, Typography, Stepper, Step, LinearProgress, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as React from 'react';

import { AInput } from '../Withdraw/WithdrawModalContent';

export const StakeModalContent = ({ type }: { type: 'lock' | 'stake' }) => {
  return (
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
          <Box>
            <Typography variant="main14" textAlign={'right'}>
              7.162 Goledo
            </Typography>
            <Typography variant="main12" color="#666" textAlign={'right'}>
              $0.289
            </Typography>
          </Box>
        </Box>
      </Box>
      <Typography variant="main16" mt={5}>
        Stake Overview
      </Typography>
      <Typography variant="description" color={'#666'}>
        These are your transaction details. Make sure to check if this is correct before submitting.
      </Typography>
      <AInput symbol={'goledo'} max={false} placeholder="Enter Amount" />
      <Box
        mt={2.5}
        borderRadius="8px"
        borderColor={'rgba(229, 229, 229, 1)'}
        sx={{ borderWidth: '1px', borderStyle: 'solid' }}
      >
        <StepBox type={type} />
      </Box>
    </>
  );
};

const sleep = (time = 1) =>
  new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, 1000 * time);
  });

const steps = {
  lock: ['Lock Goledo', 'Finished'],
  stake: ['Stake Goledo', 'Finished'],
};
const StepBox = ({ type }: { type: 'lock' | 'stake' }) => {
  const [isLoading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onStake = async () => {
    setLoading(true);
    try {
      await sleep();
      await handleNext();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        sx={{ height: 46, display: 'flex', justifyContent: 'space-between' }}
        connector={null}
      >
        {steps[type].map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps} sx={{ flex: 1, textAlign: 'center' }}>
              {index + 1}.{label}
            </Step>
          );
        })}
      </Stepper>
      <LinearProgress variant="determinate" value={((activeStep + 1) / steps[type].length) * 100} />
      <Box p={4}>
        {activeStep === steps[type].length - 1 ? (
          <Typography sx={{ mt: 1, mb: 5, textAlign: 'center' }}>2/2 Finished</Typography>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ textAlign: 'center' }}>
              1/2 {type === 'lock' ? 'Lock' : 'Stake'} Goledo
              <br />
              Please submit to {type}
            </Typography>
            <Stack
              sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}
              spacing={1.25}
              direction="row"
            >
              <LoadingButton
                size="large"
                variant="contained"
                sx={{ width: 100, height: 40, textTransform: 'capitalize' }}
                onClick={onStake}
                loading={isLoading}
              >
                {type}
              </LoadingButton>
              <LoadingButton
                size="large"
                variant="outlined"
                sx={{ width: 100, height: 40 }}
                // onClick={onCancel}
                // loading={isLoading}
              >
                Cancel
              </LoadingButton>
            </Stack>
          </Box>
        )}
      </Box>
    </Box>
  );
};

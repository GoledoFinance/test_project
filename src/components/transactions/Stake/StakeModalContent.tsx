import { Box, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as React from 'react';

import { AInput } from '../Withdraw/WithdrawModalContent';
import { CompleteIcon, StepHeader } from '../Withdraw/WithdrawModalContentNext';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

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
      <StepHeader activeStep={activeStep} steps={steps[type]} />
      <Box p={4}>
        {activeStep === steps[type].length - 1 ? (
          <Box
            display={'flex'}
            justifyContent="space-between"
            alignItems={'center'}
            sx={{ mt: 1, mb: 1 }}
            flexDirection="row"
          >
            <Typography sx={{ textAlign: 'left', fontWeight: 600 }}>
              2/2 {type === 'stake' ? 'Stake' : 'Lock'}
              <br />
              Finished
            </Typography>
            <CompleteIcon />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography sx={{ textAlign: 'left', fontWeight: 600 }}>
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

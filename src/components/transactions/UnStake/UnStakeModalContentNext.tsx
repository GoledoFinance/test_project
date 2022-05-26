import { Box, Typography, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as React from 'react';

import { CompleteIcon, StepHeader } from '../Withdraw/WithdrawModalContentNext';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

export const UnStakeModalContentNext = ({ type }: { type?: 'lock' | 'stake' }) => {
  return (
    <>
      <Typography variant="main16">Your transaction overview</Typography>
      <Typography variant="description" color={'#666'}>
        These are your transaction details. Make sure to check if this is correct before submitting.
      </Typography>
      <Box
        mt={2.5}
        borderRadius="8px"
        borderColor={'rgba(229, 229, 229, 1)'}
        sx={{ borderWidth: '1px', p: 4, borderStyle: 'solid' }}
      >
        {[
          <>
            <Typography variant="description" color={'#666'}>
              Un{type} Goledo
            </Typography>

            <FormattedNumber
              variant="main14"
              symbol="GoledoFTM"
              value={1}
              visibleDecimals={0}
              symbolsColor="#111"
            />
          </>,
        ].map((item, index) => {
          return (
            <Box
              key={index}
              display={'flex'}
              justifyContent="space-between"
              alignItems={'center'}
              mt={index === 0 ? 0 : 2.5}
            >
              {item}
            </Box>
          );
        })}
      </Box>
      <Box
        mt={2.5}
        borderRadius="8px"
        borderColor={'rgba(229, 229, 229, 1)'}
        sx={{ borderWidth: '1px', borderStyle: 'solid' }}
      >
        {type && <StepBox type={type} />}
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
  lock: ['Unlock Goledo', 'Finished'],
  stake: ['Unstake Goledo', 'Finished'],
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
              2/2 Un{type} <br />
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
              1/2 Un{type === 'lock' ? 'Lock' : 'Stake'} Goledo
              <br />
              Please submit to un{type}
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
                Un{type}
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

import { Box, Typography, Stepper, Step, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as React from 'react';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';

export const DepositeModalContentNext = ({ symbol }: ModalWrapperProps) => {
  return (
    <>
      <Typography variant="main14" mt={5}>
        Deposit Overview
      </Typography>
      <Typography color="#666" variant="main12" mt={2.5}>
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
              Amount
            </Typography>
            <Typography variant="main14">
              231,465,798 {symbol}
              <Typography component={'span'} color={'#666'}>
                ($320,102,399)
              </Typography>
            </Typography>
          </>,
          <>
            <Typography variant="description" color={'#666'}>
              Coliateral usage
            </Typography>
            <Typography variant="main14" color={'#3AC170'}>
              Yes
            </Typography>
          </>,
          <>
            <Typography variant="description" color={'#666'}>
              New health factor
            </Typography>
            <Typography variant="main14" color={'#3AC170'}>
              2.62
            </Typography>
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
        <StepBox />
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

const steps = ['Deposit', 'Finished'];
const StepBox = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onApprove = async () => {
    setLoading(true);
    try {
      await sleep();
      await handleNext();
    } catch (e) {
      console.error(e);
    }
    setLoading(false);
  };

  const onWithdraw = async () => {
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
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          return (
            <Step key={label} {...stepProps} sx={{ flex: 1, textAlign: 'center' }}>
              {index + 1}.{label}
            </Step>
          );
        })}
      </Stepper>
      <LinearProgress variant="determinate" value={((activeStep + 1) / steps.length) * 100} />
      <Box p={4}>
        {activeStep === steps.length - 1 ? (
          <Typography sx={{ mt: 1, mb: 5, textAlign: 'center' }}>2/2 Finished</Typography>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 1, mb: 5, textAlign: 'center' }}>
              1/2 Deposit
              <br />
              Please submit to deposit
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <LoadingButton
                size="large"
                variant="contained"
                fullWidth
                sx={{ height: 40 }}
                onClick={onWithdraw}
                loading={isLoading}
              >
                Deposit
              </LoadingButton>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

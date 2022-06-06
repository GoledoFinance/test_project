import { Box, Typography, Stepper, Step, LinearProgress } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BigNumber } from 'bignumber.js';

import { HealthFactorNumber } from 'src/components/HealthFactorNumber';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';

export const WithdrawModalContentNext = ({
  symbol,
  value = '0',
}: ModalWrapperProps & {
  value?: string;
}) => {
  return (
    <>
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
              Amount
            </Typography>
            <Typography variant="main14">
              {new BigNumber(value).toFormat(0)} {symbol}
              <Typography component={'span'} color={'#666'}>
                (${new BigNumber(value).toFormat(0)})
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
            <HealthFactorNumber value={'2.62'} variant="main14" />
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

export const CompleteIcon = () => (
  <Typography color="#2D88F2" minWidth={'160px'} textAlign="center">
    <CheckCircleOutlineIcon sx={{ fontSize: 14, verticalAlign: 'middle', mr: 1.5 }} />
    Complete
  </Typography>
);

export const StepHeader = ({ activeStep, steps }: { steps: string[]; activeStep: number }) => (
  <>
    <Stepper
      activeStep={activeStep}
      sx={{ height: 46, display: 'flex', justifyContent: 'space-between' }}
      connector={null}
    >
      {steps.map((label: string, index: number) => {
        const stepProps: { completed?: boolean } = {};
        return (
          <Step
            key={label}
            {...stepProps}
            sx={{ flex: 1, textAlign: 'center', fontWeight: activeStep < index ? 400 : 600 }}
          >
            {index + 1}.{label}
          </Step>
        );
      })}
    </Stepper>
    <LinearProgress variant="determinate" value={((activeStep + 1) / steps.length) * 100} />
  </>
);

const sleep = (time = 1) =>
  new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, 1000 * time);
  });

const steps = ['Approve', 'Withdraw', 'Finished'];
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
      <StepHeader activeStep={activeStep} steps={steps} />
      <Box p={4}>
        {activeStep === steps.length - 1 ? (
          <Box
            display={'flex'}
            justifyContent="center"
            alignItems={'center'}
            sx={{ mt: 1, mb: 5 }}
            flexDirection="column"
          >
            <Typography sx={{ mb: 5, textAlign: 'center', fontWeight: 600 }}>
              3/3 Withdraw <br />
              Finished
            </Typography>
            <CompleteIcon />
          </Box>
        ) : activeStep === 0 ? (
          <React.Fragment>
            <Typography sx={{ mt: 1, mb: 5, textAlign: 'center', fontWeight: 600 }}>
              1/3 Approve <br />
              Please Approve before withdrawal
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <LoadingButton
                size="large"
                variant="contained"
                fullWidth
                sx={{ height: 40 }}
                onClick={onApprove}
                loading={isLoading}
              >
                Approve
              </LoadingButton>
            </Box>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 1, mb: 5, textAlign: 'center', fontWeight: 600 }}>
              2/3 Withdraw
              <br />
              Please submit to withdraw
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
                Withdraw
              </LoadingButton>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};

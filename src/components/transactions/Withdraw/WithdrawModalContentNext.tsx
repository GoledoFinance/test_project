import { Box, Typography, Stepper, Step, LinearProgress, Alert, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import * as React from 'react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { BigNumber } from 'bignumber.js';

import { HealthFactorNumber } from 'src/components/HealthFactorNumber';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useModalContext } from 'src/hooks/useModal';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { WithdrawActions } from './WithdrawActions';
import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import {
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
} from '@goledo-sdk/math-utils';
import { Trans } from '@lingui/macro';
import { useState } from 'react';
import { TxSuccessView } from '../FlowCommons/Success';
import {
  DetailsHFLine,
  DetailsNumberLine,
  DetailsNumberLineWithSub,
  DetailsUnwrapSwitch,
  TxModalDetails,
} from '../FlowCommons/TxModalDetails';

enum ErrorType {
  CAN_NOT_WITHDRAW_THIS_AMOUNT,
  POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY,
}

export const WithdrawModalContentNext = ({
  poolReserve,
  userReserve,
  isWrongNetwork,
  unwrap: withdrawUnWrapped,
  amount = '0',
}: ModalWrapperProps & {
  amount: string;
  unwrap: boolean;
}) => {
  const [riskCheckboxAccepted, setRiskCheckboxAccepted] = useState(false);

  const { currentNetworkConfig } = useProtocolDataContext();
  const { user } = useAppDataContext();
  const symbol =
    withdrawUnWrapped && poolReserve.isWrappedBaseAsset
      ? currentNetworkConfig.baseAssetSymbol
      : poolReserve.symbol;
  const { gasLimit, txError, mainTxState: withdrawTxState } = useModalContext();

  const amountToWithdrawInEth = new BigNumber(amount || '0').multipliedBy(
    poolReserve.formattedPriceInETH
  );

  const reserveLiquidationThreshold = poolReserve.formattedReserveLiquidationThreshold;
  const underlyingBalance = valueToBigNumber(userReserve?.underlyingBalance || '0');
  const unborrowedLiquidity = valueToBigNumber(poolReserve.unborrowedLiquidity);

  // health factor calculations
  let totalCollateralInETHAfterWithdraw = valueToBigNumber(
    user.totalCollateralMarketReferenceCurrency
  );
  let liquidationThresholdAfterWithdraw = user.currentLiquidationThreshold;
  let healthFactorAfterWithdraw = valueToBigNumber(user.healthFactor);
  if (userReserve?.usageAsCollateralEnabledOnUser && poolReserve.usageAsCollateralEnabled) {
    totalCollateralInETHAfterWithdraw =
      totalCollateralInETHAfterWithdraw.minus(amountToWithdrawInEth);

    liquidationThresholdAfterWithdraw = valueToBigNumber(
      user.totalCollateralMarketReferenceCurrency
    )
      .multipliedBy(valueToBigNumber(user.currentLiquidationThreshold))
      .minus(valueToBigNumber(amountToWithdrawInEth).multipliedBy(reserveLiquidationThreshold))
      .div(totalCollateralInETHAfterWithdraw)
      .toFixed(4, BigNumber.ROUND_DOWN);

    healthFactorAfterWithdraw = calculateHealthFactorFromBalancesBigUnits({
      collateralBalanceMarketReferenceCurrency: totalCollateralInETHAfterWithdraw,
      borrowBalanceMarketReferenceCurrency: user.totalBorrowsMarketReferenceCurrency,
      currentLiquidationThreshold: liquidationThresholdAfterWithdraw,
    });
  }

  const displayRiskCheckbox =
    healthFactorAfterWithdraw.toNumber() >= 1 &&
    healthFactorAfterWithdraw.toNumber() < 1.5 &&
    userReserve.usageAsCollateralEnabledOnUser;

  let blockingError: ErrorType | undefined = undefined;
  if (!withdrawTxState.success && !withdrawTxState.txHash) {
    if (healthFactorAfterWithdraw.lt('1') && user.totalBorrowsMarketReferenceCurrency !== '0') {
      blockingError = ErrorType.CAN_NOT_WITHDRAW_THIS_AMOUNT;
    } else if (
      !blockingError &&
      (unborrowedLiquidity.eq('0') || valueToBigNumber(amount).gt(poolReserve.unborrowedLiquidity))
    ) {
      blockingError = ErrorType.POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY;
    }
  }

  // error render handling
  const handleBlocked = () => {
    switch (blockingError) {
      case ErrorType.CAN_NOT_WITHDRAW_THIS_AMOUNT:
        return (
          <Trans>You can not withdraw this amount because it will cause collateral call</Trans>
        );
      case ErrorType.POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY:
        return (
          <Trans>
            These funds have been borrowed and are not available for withdrawal at this time.
          </Trans>
        );
      default:
        return null;
    }
  };

  if (withdrawTxState.success)
    return (
      <TxSuccessView
        action={<Trans>withdrew</Trans>}
        amount={amount}
        symbol={
          withdrawUnWrapped && poolReserve.isWrappedBaseAsset
            ? currentNetworkConfig.baseAssetSymbol
            : poolReserve.symbol
        }
      />
    );

  return (
    <>
      {blockingError !== undefined && (
        <Typography variant="helperText" color="error.main">
          {handleBlocked()}
        </Typography>
      )}

      <TxModalDetails
        gasLimit={gasLimit}
        title={
          'These are your transaction details. Make sure to check if this is correct before submitting.'
        }
      >
        <DetailsNumberLineWithSub
          description={<Trans>Amount</Trans>}
          futureValue={new BigNumber(amount).toString(10)}
          symbol={symbol}
          futureValueUSD={new BigNumber(amountToWithdrawInEth).toFormat(2)}
        />
        <DetailsNumberLine
          description={<Trans>Remaining supply</Trans>}
          value={underlyingBalance.minus(amount || '0').toString(10)}
          symbol={
            poolReserve.isWrappedBaseAsset
              ? currentNetworkConfig.baseAssetSymbol
              : poolReserve.symbol
          }
        />
        <DetailsHFLine
          visibleHfChange={true}
          healthFactor={user ? user.healthFactor : '-1'}
          futureHealthFactor={healthFactorAfterWithdraw.toString(10)}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      {displayRiskCheckbox && (
        <>
          <Alert severity="error" sx={{ my: '24px' }}>
            <Trans>
              Withdrawing this amount will reduce your health factor and increase risk of
              liquidation.
            </Trans>
          </Alert>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              mx: '24px',
              mb: '12px',
            }}
          >
            <Checkbox
              checked={riskCheckboxAccepted}
              onChange={() => setRiskCheckboxAccepted(!riskCheckboxAccepted)}
              size="small"
              data-cy={`risk-checkbox`}
            />
            <Typography variant="description">
              <Trans>I acknowledge the risks involved.</Trans>
            </Typography>
          </Box>
        </>
      )}

      <WithdrawActions
        amountToWithdraw={amount}
        isWrongNetwork={isWrongNetwork}
        poolReserve={poolReserve}
        poolAddress={
          withdrawUnWrapped && poolReserve.isWrappedBaseAsset
            ? API_ETH_MOCK_ADDRESS
            : poolReserve.underlyingAsset
        }
        symbol={symbol}
        blocked={blockingError !== undefined || (displayRiskCheckbox && !riskCheckboxAccepted)}
        sx={displayRiskCheckbox ? { mt: 0 } : {}}
      />
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

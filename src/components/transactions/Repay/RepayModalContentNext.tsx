import * as React from 'react';
import { BigNumber } from 'bignumber.js';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { RepayActions } from './RepayActions';
import { RepayAsset } from './RepayModal';
import { useModalContext } from 'src/hooks/useModal';
import { TxSuccessView } from '../FlowCommons/Success';
import { Trans } from '@lingui/macro';
import {
  DetailsHFLine,
  DetailsNumberLineWithSub,
  TxModalDetails,
} from '../FlowCommons/TxModalDetails';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { InterestRate } from '@goledo-sdk/contract-helpers';
import {
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
} from '@goledo-sdk/math-utils';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';

export const RepayModalContentNext = ({
  poolReserve,
  userReserve,
  isWrongNetwork,
  repayToken,
  amount = '0',
}: ModalWrapperProps & { amount: string; repayToken?: RepayAsset }) => {
  const { currentNetworkConfig } = useProtocolDataContext();
  const { gasLimit, mainTxState: repayTxState, txError } = useModalContext();
  const { user } = useAppDataContext();

  if (!repayToken) return null;

  const debt = userReserve?.variableBorrows || '0';
  const debtInETH = new BigNumber(debt).multipliedBy(poolReserve.formattedPriceInETH);

  // calculate max amount abailable to repay
  const normalizedWalletBalance = valueToBigNumber(repayToken.balance).minus(
    userReserve?.reserve.symbol.toUpperCase() === currentNetworkConfig.baseAssetSymbol
      ? '0.004'
      : '0'
  );
  const maxAmountToRepay = BigNumber.min(normalizedWalletBalance, debt);

  // debt remaining after repay
  const amountAfterRepay = valueToBigNumber(debt)
    .minus(amount || '0')
    .toString(10);
  const displayAmountAfterRepay = BigNumber.min(amountAfterRepay, maxAmountToRepay);
  const displayAmountAfterRepayInETH = displayAmountAfterRepay.multipliedBy(
    poolReserve.formattedPriceInETH
  );

  // health factor calculations
  // we use usd values instead of MarketreferenceCurrency so it has same precision
  const newHF = amount
    ? calculateHealthFactorFromBalancesBigUnits({
        collateralBalanceMarketReferenceCurrency: user?.totalCollateralUSD || '0',
        borrowBalanceMarketReferenceCurrency: valueToBigNumber(user?.totalBorrowsUSD || '0').minus(
          valueToBigNumber(userReserve.reserve.priceInUSD).multipliedBy(amount)
        ),
        currentLiquidationThreshold: user?.currentLiquidationThreshold || '0',
      }).toString(10)
    : user?.healthFactor;

  if (repayTxState.success)
    return (
      <TxSuccessView action={<Trans>repaid</Trans>} amount={amount} symbol={repayToken.symbol} />
    );

  return (
    <>
      <TxModalDetails
        gasLimit={gasLimit}
        title={
          'These are your transaction details. Make sure to check if this is correct before submitting.'
        }
      >
        <DetailsNumberLineWithSub
          description={<Trans>Remaining debt</Trans>}
          futureValue={amountAfterRepay}
          futureValueUSD={displayAmountAfterRepayInETH.toString(10)}
          value={debt}
          valueUSD={debtInETH.toString()}
          symbol={
            poolReserve.iconSymbol === currentNetworkConfig.wrappedBaseAssetSymbol
              ? currentNetworkConfig.baseAssetSymbol
              : poolReserve.iconSymbol
          }
        />
        <DetailsHFLine
          visibleHfChange={true}
          healthFactor={user?.healthFactor}
          futureHealthFactor={newHF}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <RepayActions
        poolReserve={poolReserve}
        amountToRepay={amount}
        poolAddress={repayToken.address ?? ''}
        isWrongNetwork={isWrongNetwork}
        symbol={repayToken.symbol}
        debtType={InterestRate.Variable}
        repayWithATokens={false}
      />
    </>
  );
};

/*
const sleep = (time = 1) =>
  new Promise((r) => {
    setTimeout(() => {
      r(true);
    }, 1000 * time);
  });

const steps = ['Repay', 'Finished'];
const StepBox = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onRepay = async () => {
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
              2/2 Repay <br />
              Finished
            </Typography>
            <CompleteIcon />
          </Box>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 1, mb: 5, textAlign: 'center', fontWeight: 600 }}>
              1/2 Repay
              <br />
              Please submit to repay
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <LoadingButton
                size="large"
                variant="contained"
                fullWidth
                sx={{ height: 40 }}
                onClick={onRepay}
                loading={isLoading}
              >
                Repay
              </LoadingButton>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};
*/

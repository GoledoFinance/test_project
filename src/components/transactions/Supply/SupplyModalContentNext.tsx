import * as React from 'react';
import { BigNumber } from 'bignumber.js';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { SupplyActions } from './SupplyActions';
import { useModalContext } from 'src/hooks/useModal';
import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import {
  DetailsCollateralLine,
  DetailsHFLine,
  DetailsIncentivesLine,
  DetailsNumberLine,
  DetailsNumberLineWithSub,
  TxModalDetails,
} from '../FlowCommons/TxModalDetails';
import { TxSuccessView } from '../FlowCommons/Success';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { Trans } from '@lingui/macro';
import { ERC20TokenType } from 'src/libs/web3-data-provider/Web3Provider';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { CollateralType } from 'src/helpers/types';
import {
  calculateHealthFactorFromBalancesBigUnits,
  valueToBigNumber,
} from '@goledo-sdk/math-utils';

export enum ErrorType {
  CAP_REACHED,
}

export const SupplyModalContentNext = ({
  poolReserve,
  userReserve,
  underlyingAsset,
  symbol,
  isWrongNetwork,
  amount = '0',
}: ModalWrapperProps & { amount: string }) => {
  const { user } = useAppDataContext();
  const { currentNetworkConfig } = useProtocolDataContext();
  const { mainTxState: supplyTxState, txError, gasLimit } = useModalContext();
  const supplyUnWrapped = underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase();

  const supplyApy = poolReserve.supplyAPY;
  console.log('underlyingAsset2', underlyingAsset);

  // Calculation of future HF
  const amountIntEth = new BigNumber(amount || '0').multipliedBy(poolReserve.formattedPriceInETH);
  const totalCollateralMarketReferenceCurrencyAfter = user
    ? valueToBigNumber(user.totalCollateralMarketReferenceCurrency).plus(amountIntEth)
    : '-1';
  const liquidationThresholdAfter = user
    ? valueToBigNumber(user.totalCollateralMarketReferenceCurrency)
        .multipliedBy(user.currentLiquidationThreshold)
        .plus(amountIntEth.multipliedBy(poolReserve.formattedReserveLiquidationThreshold))
        .dividedBy(totalCollateralMarketReferenceCurrencyAfter)
    : '-1';
  let healthFactorAfterDeposit = user ? valueToBigNumber(user.healthFactor) : '-1';

  if (user) {
    healthFactorAfterDeposit = calculateHealthFactorFromBalancesBigUnits({
      collateralBalanceMarketReferenceCurrency: totalCollateralMarketReferenceCurrencyAfter,
      borrowBalanceMarketReferenceCurrency: valueToBigNumber(
        user.totalBorrowsMarketReferenceCurrency
      ),
      currentLiquidationThreshold: liquidationThresholdAfter,
    });
  }

  // error handler
  const blockingError: ErrorType | undefined = undefined;

  // token info to add to wallet
  const addToken: ERC20TokenType = {
    address: poolReserve.aTokenAddress,
    symbol: poolReserve.iconSymbol,
    decimals: poolReserve.decimals,
    aToken: true,
  };

  // collateralization state
  let willBeUsedAsCollateral: CollateralType = poolReserve.usageAsCollateralEnabled
    ? CollateralType.ENABLED
    : CollateralType.DISABLED;
  const userHasSuppliedReserve = userReserve && userReserve.scaledATokenBalance !== '0';

  if (user.isInIsolationMode) {
    willBeUsedAsCollateral = CollateralType.DISABLED;
  } else {
    if (userHasSuppliedReserve) {
      willBeUsedAsCollateral = userReserve.usageAsCollateralEnabledOnUser
        ? CollateralType.ENABLED
        : CollateralType.DISABLED;
    } else {
      willBeUsedAsCollateral = CollateralType.ENABLED;
    }
  }
  if (supplyTxState.success)
    return (
      <TxSuccessView
        action={<Trans>Supplied</Trans>}
        amount={amount}
        symbol={supplyUnWrapped ? currentNetworkConfig.baseAssetSymbol : poolReserve.symbol}
        addToken={addToken}
      />
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
          description={<Trans>Amount</Trans>}
          futureValue={new BigNumber(amount).toString(10)}
          symbol={symbol}
          futureValueUSD={new BigNumber(amountIntEth).toFormat(2)}
        />
        <DetailsNumberLine description={<Trans>Supply APY</Trans>} value={supplyApy} percent />
        <DetailsIncentivesLine
          incentives={poolReserve.aIncentivesData}
          symbol={poolReserve.symbol}
        />
        <DetailsCollateralLine collateralType={willBeUsedAsCollateral} />
        <DetailsHFLine
          visibleHfChange={true}
          healthFactor={user ? user.healthFactor : '-1'}
          futureHealthFactor={healthFactorAfterDeposit.toString(10)}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <SupplyActions
        amountToSupply={amount}
        isWrongNetwork={isWrongNetwork}
        poolReserve={poolReserve}
        poolAddress={supplyUnWrapped ? API_ETH_MOCK_ADDRESS : poolReserve.underlyingAsset}
        symbol={symbol}
        blocked={blockingError !== undefined}
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

const steps = ['Supply', 'Finished'];
const StepBox = () => {
  const [isLoading, setLoading] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const onSupply = async () => {
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
              2/2 Supply <br />
              Finished
            </Typography>
            <CompleteIcon />
          </Box>
        ) : (
          <React.Fragment>
            <Typography sx={{ mt: 1, mb: 5, textAlign: 'center', fontWeight: 600 }}>
              1/2 Supply
              <br />
              Please submit to supply
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <LoadingButton
                size="large"
                variant="contained"
                fullWidth
                sx={{ height: 40 }}
                onClick={onSupply}
                loading={isLoading}
              >
                Supply
              </LoadingButton>
            </Box>
          </React.Fragment>
        )}
      </Box>
    </Box>
  );
};
*/

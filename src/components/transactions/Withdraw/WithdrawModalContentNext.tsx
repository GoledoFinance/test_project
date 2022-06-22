import { Box, Typography, Alert, Checkbox } from '@mui/material';
import * as React from 'react';
import { BigNumber } from 'bignumber.js';

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
          futureValue={amount}
          symbol={symbol}
          futureValueUSD={amountToWithdrawInEth.toString()}
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

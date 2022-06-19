import * as React from 'react';
import { BigNumber } from 'bignumber.js';

import { useModalContext } from 'src/hooks/useModal';
import { TxSuccessView } from '../FlowCommons/Success';
import { Trans } from '@lingui/macro';
import { DetailsNumberLineWithSub, TxModalDetails } from '../FlowCommons/TxModalDetails';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { StakeActions } from './StakeActions';

export const StakeModalContentNext = ({
  type,
  isWrongNetwork,
  symbol,
  selectedToken,
  amount = '0',
}: {
  type: 'lock' | 'stake';
  amount: string;
  isWrongNetwork: boolean;
  selectedToken: string;
  symbol: string;
}) => {
  const { gasLimit, mainTxState: stakeTxState, txError } = useModalContext();

  if (stakeTxState.success)
    return <TxSuccessView action={<Trans>{`${type}ed`}</Trans>} amount={amount} symbol={symbol} />;

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
          futureValueUSD={'0'}
        />
        <DetailsNumberLineWithSub
          description={<Trans>{`${type === 'lock' ? 'Locked' : 'Staked'} ${symbol}`}</Trans>}
          futureValue={'0'}
          futureValueUSD={'0'}
          value={'0'}
          valueUSD={'0'}
          symbol={symbol}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <StakeActions
        amountToStake={amount}
        isWrongNetwork={isWrongNetwork}
        symbol={symbol}
        blocked={false}
        selectedToken={selectedToken}
        lock={type === 'lock'}
      />
    </>
  );
};

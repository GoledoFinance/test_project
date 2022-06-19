import * as React from 'react';

import { DetailsNumberLineWithSub, TxModalDetails } from '../FlowCommons/TxModalDetails';
import { Trans } from '@lingui/macro';
import { useModalContext } from 'src/hooks/useModal';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { UnStakeActions } from './UnStakeActions';
import { TxSuccessView } from '../FlowCommons/Success';

export const UnStakeModalContentNext = ({
  type,
  amount,
}: {
  type?: 'lock' | 'stake';
  amount: string;
  isWrongNetwork: boolean;
}) => {
  const { gasLimit, mainTxState: unstakeTxState, txError } = useModalContext();

  if (unstakeTxState.success)
    return (
      <TxSuccessView action={<Trans>{`un${type}`}</Trans>} amount={amount} symbol={'GDOCFX'} />
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
          futureValue={'0'}
          symbol={'GDOCFX'}
          futureValueUSD={'0'}
        />
        <DetailsNumberLineWithSub
          description={<Trans>{`${type === 'lock' ? 'Locked' : 'Staked'} ${'GDOCFX'}`}</Trans>}
          futureValue={'0'}
          futureValueUSD={'0'}
          value={'0'}
          valueUSD={'0'}
          symbol={'GDOCFX'}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <UnStakeActions
        amountToUnStake={amount}
        isWrongNetwork={false}
        symbol={'GDOCFX'}
        blocked={false}
        selectedToken={''}
      />
    </>
  );
};

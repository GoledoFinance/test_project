import * as React from 'react';
import { BigNumber } from 'bignumber.js';

import { useModalContext } from 'src/hooks/useModal';
import { TxSuccessView } from '../FlowCommons/Success';
import { Trans } from '@lingui/macro';
import { DetailsNumberLineWithSub, TxModalDetails } from '../FlowCommons/TxModalDetails';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { StakeActions } from './StakeActions';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { ChangeNetworkWarning } from '../Warnings/ChangeNetworkWarning';
import { TxModalTitle } from '../FlowCommons/TxModalTitle';
import { getNetworkConfig } from 'src/utils/marketsAndNetworksConfig';

export const StakeModalContentNext = ({
  type,
  symbol,
  selectedToken,
  amount = '0',
}: {
  type: 'lock' | 'stake';
  amount: string;
  selectedToken: string;
  symbol: string;
}) => {
  const { currentChainId } = useProtocolDataContext();
  const { chainId: connectedChainId } = useWeb3Context();
  const { gasLimit, mainTxState: stakeTxState, txError } = useModalContext();
  const { userGoledoStake } = useAppDataContext();

  // is Network mismatched
  const isWrongNetwork = currentChainId !== connectedChainId;
  const networkConfig = getNetworkConfig(currentChainId);

  const unlockedBalance = new BigNumber(userGoledoStake.unlockedBalance);
  const totalBalance = new BigNumber(userGoledoStake.totalBalance);

  const currentBalance = type === 'stake' ? unlockedBalance : totalBalance.minus(unlockedBalance);
  const futureBalance = currentBalance.plus(amount);

  if (stakeTxState.success)
    return (
      <TxSuccessView
        action={<Trans>{type === 'stake' ? 'staked' : 'locked'}</Trans>}
        amount={amount}
        symbol={symbol}
      />
    );

  return (
    <>
      <TxModalTitle title={type === 'stake' ? 'Stake Goledo' : 'Lock Goledo'} />

      {isWrongNetwork && (
        <ChangeNetworkWarning networkName={networkConfig.name} chainId={currentChainId} />
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
          futureValueUSD={'0'}
        />
        <DetailsNumberLineWithSub
          description={<Trans>{`${type === 'lock' ? 'Locked' : 'Staked'} ${symbol}`}</Trans>}
          futureValue={futureBalance.toPrecision(4)}
          futureValueUSD={'0'}
          value={currentBalance.toPrecision(4)}
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

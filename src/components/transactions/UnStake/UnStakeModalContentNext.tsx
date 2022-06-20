import * as React from 'react';

import BigNumber from 'bignumber.js';

import { DetailsNumberLineWithSub, TxModalDetails } from '../FlowCommons/TxModalDetails';
import { Trans } from '@lingui/macro';
import { useModalContext } from 'src/hooks/useModal';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { UnStakeActions } from './UnStakeActions';
import { TxSuccessView } from '../FlowCommons/Success';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { getNetworkConfig } from 'src/utils/marketsAndNetworksConfig';
import { TxErrorView } from '../FlowCommons/Error';
import { TxModalTitle } from '../FlowCommons/TxModalTitle';
import { ChangeNetworkWarning } from '../Warnings/ChangeNetworkWarning';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';

export const UnStakeModalContentNext = ({
  symbol,
  amount,
  underlyingAsset,
}: {
  amount: string;
  symbol: string;
  underlyingAsset: string;
}) => {
  const { gasLimit, mainTxState: unstakeTxState, txError } = useModalContext();
  const { currentChainId } = useProtocolDataContext();
  const { chainId: connectedChainId } = useWeb3Context();
  const { userMasterChefIncentives } = useAppDataContext();

  const lpUserIncentice = userMasterChefIncentives[0];

  const networkConfig = getNetworkConfig(currentChainId);

  const stakeBefore = new BigNumber(lpUserIncentice?.userStakedBalance || '0');
  const stakeAfter = stakeBefore.minus(amount);

  // is Network mismatched
  const isWrongNetwork = currentChainId !== connectedChainId;

  if (txError && txError.blocking) {
    return <TxErrorView txError={txError} />;
  }

  if (unstakeTxState.success)
    return <TxSuccessView action={<Trans>{`unstaked`}</Trans>} amount={amount} symbol={symbol} />;

  return (
    <>
      <TxModalTitle title="Withdraw Expired Locks" />

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
          futureValue={amount}
          symbol={symbol}
          futureValueUSD={'0'}
        />
        <DetailsNumberLineWithSub
          description={<Trans>{`Staked ${symbol}`}</Trans>}
          futureValue={stakeAfter.toString()}
          futureValueUSD={'0'}
          value={stakeBefore.toString()}
          valueUSD={'0'}
          symbol={symbol}
        />
      </TxModalDetails>

      {txError && <GasEstimationError txError={txError} />}

      <UnStakeActions
        amountToUnStake={amount}
        isWrongNetwork={isWrongNetwork}
        symbol={symbol}
        blocked={false}
        selectedToken={underlyingAsset}
      />
    </>
  );
};

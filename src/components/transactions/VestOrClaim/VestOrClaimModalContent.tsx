import { Trans } from '@lingui/macro';
import { FormControlLabel, Switch, Typography } from '@mui/material';
import { useState } from 'react';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { ModalType, useModalContext } from 'src/hooks/useModal';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { getNetworkConfig } from 'src/utils/marketsAndNetworksConfig';

import { BigNumber } from 'bignumber.js';

import { TxErrorView } from '../FlowCommons/Error';
import { GasEstimationError } from '../FlowCommons/GasEstimationError';
import { TxSuccessView } from '../FlowCommons/Success';
import { DetailsNumberLineWithSub, TxModalDetails } from '../FlowCommons/TxModalDetails';
import { TxModalTitle } from '../FlowCommons/TxModalTitle';
import { ChangeNetworkWarning } from '../Warnings/ChangeNetworkWarning';
import { VestOrClaimActions } from './VestOrClaimActions';
import { Row } from 'src/components/primitives/Row';

export enum ErrorType {
  NOT_ENOUGH_BALANCE,
}

export type VestOrClaimProps = {
  type: ModalType;
  tokens: string[];
  amount: string;
  stakingContract: string;
};

export const VestOrClaimModalContent = ({
  type,
  tokens,
  stakingContract,
  amount,
}: VestOrClaimProps) => {
  const { gasLimit, mainTxState, txError } = useModalContext();
  const { currentChainId } = useProtocolDataContext();
  const { userGoledoStake } = useAppDataContext();
  const { chainId: connectedChainId } = useWeb3Context();
  const [claimRewards, setClaimRewards] = useState(true);

  const networkConfig = getNetworkConfig(currentChainId);

  let penalty = new BigNumber('0');
  let vesting = new BigNumber('0');
  userGoledoStake.vestings.forEach((earn) => {
    penalty = penalty.plus(new BigNumber(earn.amount));
    vesting = vesting.plus(new BigNumber(earn.amount));
  });
  penalty = penalty.div(2);

  // error handling
  const blockingError: ErrorType | undefined = undefined;

  // error handling render
  const handleBlocked = () => {
    if (!blockingError) return null;
    switch (blockingError) {
      case ErrorType.NOT_ENOUGH_BALANCE:
        return <Trans>Your reward balance is 0</Trans>;
      default:
        return null;
    }
  };

  // is Network mismatched
  const isWrongNetwork = currentChainId !== connectedChainId;

  if (txError && txError.blocking) {
    return <TxErrorView txError={txError} />;
  }
  if (mainTxState.success) {
    if (type === ModalType.GoledoVesting) {
      return <TxSuccessView action={<Trans>Vested</Trans>} amount={amount} symbol={'GDO'} />;
    }
    if (type === ModalType.GoledoWithdraw) {
      return <TxSuccessView action={<Trans>Withdrawn</Trans>} amount={amount} symbol={'GDO'} />;
    }
    return <TxSuccessView />;
  }

  return (
    <>
      {type === ModalType.GoledoVesting && <TxModalTitle title="Vesting Goledo" />}
      {type === ModalType.GoledoWithdraw && <TxModalTitle title="Withdraw Goledo" />}
      {type === ModalType.GoledoExitStake && <TxModalTitle title="Exit Goledo Staking" />}
      {type === ModalType.GoledoClaimRewards && <TxModalTitle title="Claim Rewards" />}
      {type === ModalType.GoledoWithdrawExpireLocks && (
        <TxModalTitle title="Withdraw Expired Locks" />
      )}

      {isWrongNetwork && (
        <ChangeNetworkWarning networkName={networkConfig.name} chainId={currentChainId} />
      )}

      {blockingError !== undefined && (
        <Typography variant="helperText" color="error.main">
          {handleBlocked()}
        </Typography>
      )}

      {type === ModalType.GoledoVesting && (
        <TxModalDetails gasLimit={gasLimit}>
          <DetailsNumberLineWithSub
            description={<Trans>Amount</Trans>}
            futureValue={new BigNumber(amount).toString(10)}
            symbol={'GDO'}
            futureValueUSD={'0'}
          />
        </TxModalDetails>
      )}
      {type === ModalType.GoledoWithdraw && (
        <TxModalDetails gasLimit={gasLimit}>
          <DetailsNumberLineWithSub
            description={<Trans>Amount</Trans>}
            futureValue={new BigNumber(amount).toString(10)}
            symbol={'GDO'}
            futureValueUSD={'0'}
          />
        </TxModalDetails>
      )}
      {type === ModalType.GoledoWithdrawExpireLocks && (
        <TxModalDetails gasLimit={gasLimit}>
          <Row captionVariant="description" mb={4}>
            <FormControlLabel
              value="darkmode"
              control={
                <Switch
                  disableRipple
                  checked={claimRewards}
                  onClick={() => setClaimRewards(!claimRewards)}
                  data-cy={'wrappedSwitcher'}
                />
              }
              labelPlacement="end"
              label={''}
            />
            <Typography>Claim Pending Rewards</Typography>
          </Row>
        </TxModalDetails>
      )}
      {type === ModalType.GoledoExitStake && (
        <TxModalDetails gasLimit={gasLimit}>
          <Row captionVariant="description" mb={4}>
            <FormControlLabel
              value="darkmode"
              control={
                <Switch
                  disableRipple
                  checked={claimRewards}
                  onClick={() => setClaimRewards(!claimRewards)}
                  data-cy={'wrappedSwitcher'}
                />
              }
              labelPlacement="end"
              label={''}
            />
            <Typography>Claim Pending Rewards</Typography>
          </Row>{' '}
          <DetailsNumberLineWithSub
            description={<Trans>Amount</Trans>}
            futureValue={vesting.plus(userGoledoStake.unlockedBalance).toString(10)}
            symbol={'GDO'}
            futureValueUSD={'0'}
          />
          <DetailsNumberLineWithSub
            description={<Trans>Penaty</Trans>}
            futureValue={penalty.toString(10)}
            symbol={'GDO'}
            futureValueUSD={'0'}
          />
        </TxModalDetails>
      )}
      {type === ModalType.GoledoClaimRewards && (
        <TxModalDetails gasLimit={gasLimit}> </TxModalDetails>
      )}

      {txError && <GasEstimationError txError={txError} />}

      <VestOrClaimActions
        type={type}
        tokens={tokens}
        claimRewards={claimRewards}
        stakingContract={stakingContract}
        amount={amount}
        isWrongNetwork={isWrongNetwork}
        blocked={blockingError !== undefined}
      />
    </>
  );
};

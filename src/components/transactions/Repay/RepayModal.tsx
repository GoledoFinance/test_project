import { InterestRate } from '@goledo-sdk/contract-helpers';
import { Trans } from '@lingui/macro';
import React from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';
import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { RepayModalContent } from './RepayModalContent';
import { RepayModalContentNext } from './RepayModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';

export const RepayModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
    currentRateMode: InterestRate;
  }>;

  const { step, setStep } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Repay} setOpen={close}>
      <ModalWrapper title={<Trans>Repay</Trans>} underlyingAsset={args.underlyingAsset}>
        {(params) =>
          step !== 2 ? (
            <RepayModalContent
              {...params}
              onSubmit={async () => {
                setStep(2);
              }}
            />
          ) : (
            <RepayModalContentNext {...params} />
          )
        }
      </ModalWrapper>
    </BasicModal>
  );
};

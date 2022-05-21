import { InterestRate, PERMISSION } from '@aave/contract-helpers';
import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';
import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { RepayModalContent } from './RepayModalContent';
import { RepayModalContentNext } from './RepayModalContentNext';

export const RepayModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
    currentRateMode: InterestRate;
  }>;

  const [step, setStep] = useState(1);

  return (
    <BasicModal open={type === ModalType.Repay} setOpen={close}>
      <ModalWrapper
        title={<Trans>Repay</Trans>}
        underlyingAsset={args.underlyingAsset}
        requiredPermission={PERMISSION.BORROWER}
      >
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

import { Trans } from '@lingui/macro';
import React, { useState, useEffect } from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { WithdrawModalContent } from './WithdrawModalContent';
import { WithdrawModalContentNext } from './WithdrawModalContentNext';

export const useStep = (type?: ModalType) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (type === undefined) {
      setStep(1);
    }
  }, [type]);

  return {
    step,
    setStep,
  };
};

export const WithdrawModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;
  const [withdrawUnWrapped] = useState(true);
  const { step, setStep } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Withdraw} setOpen={close}>
      <ModalWrapper
        title={<Trans>Withdraw</Trans>}
        underlyingAsset={args.underlyingAsset}
        keepWrappedSymbol={!withdrawUnWrapped}
      >
        {(params) =>
          step !== 2 ? (
            <WithdrawModalContent
              {...params}
              onSubmit={async () => {
                setStep(2);
              }}
            />
          ) : (
            <WithdrawModalContentNext {...params} />
          )
        }
      </ModalWrapper>
    </BasicModal>
  );
};

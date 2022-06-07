import { Trans } from '@lingui/macro';
import React, { useState, useEffect } from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { WithdrawModalContent } from './WithdrawModalContent';
import { WithdrawModalContentNext } from './WithdrawModalContentNext';

export const useStep = (type?: ModalType) => {
  const [step, setStep] = useState(1);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (type === undefined) {
      setStep(1);
      setValue('');
    }
  }, [type]);

  return {
    step,
    setStep,
    value,
    setValue,
  };
};

export const WithdrawModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;
  const [withdrawUnWrapped] = useState(true);
  const { step, setStep, value, setValue } = useStep(type);

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
              onSubmit={async (value) => {
                setValue(value || '0');
                setStep(2);
              }}
            />
          ) : (
            <WithdrawModalContentNext {...params} value={value} />
          )
        }
      </ModalWrapper>
    </BasicModal>
  );
};

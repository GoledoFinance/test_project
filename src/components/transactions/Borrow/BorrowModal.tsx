import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { BorrowModalContent } from './BorrowModalContent';
import { BorrowModalContentNext } from './BorrowModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';

export const BorrowModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;
  const [borrowUnWrapped, setBorrowUnWrapped] = useState(true);
  const { step, setStep, value, setValue } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Borrow} setOpen={close}>
      <ModalWrapper
        title={<Trans>Borrow</Trans>}
        underlyingAsset={args.underlyingAsset}
        keepWrappedSymbol={!borrowUnWrapped}
      >
        {(params) =>
          step !== 2 ? (
            <BorrowModalContent
              {...params}
              amount={value}
              onAmountChange={async (value) => {
                setValue(value || '0');
              }}
              onSubmit={async () => {
                if (value && value !== '0') {
                  setStep(2);
                }
              }}
              unwrap={borrowUnWrapped}
              setUnwrap={setBorrowUnWrapped}
            />
          ) : (
            <BorrowModalContentNext {...params} unwrap={borrowUnWrapped} amount={value} />
          )
        }
      </ModalWrapper>
    </BasicModal>
  );
};

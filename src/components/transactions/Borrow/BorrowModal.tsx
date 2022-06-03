import { PERMISSION } from '@goledo-sdk/contract-helpers';
import { Trans } from '@lingui/macro';
import React from 'react';
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
  const { step, setStep } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Borrow} setOpen={close}>
      <ModalWrapper
        title={<Trans>Borrow</Trans>}
        underlyingAsset={args.underlyingAsset}
        keepWrappedSymbol={!true}
        requiredPermission={PERMISSION.BORROWER}
      >
        {(params) =>
          step !== 2 ? (
            <BorrowModalContent
              {...params}
              onSubmit={async () => {
                setStep(2);
              }}
            />
          ) : (
            <BorrowModalContentNext {...params} />
          )
        }
      </ModalWrapper>
    </BasicModal>
  );
};

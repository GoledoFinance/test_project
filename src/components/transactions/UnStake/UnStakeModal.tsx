import React from 'react';
import { ModalType, useModalContext } from 'src/hooks/useModal';
import { BasicModal } from '../../primitives/BasicModal';
import { UnStakeModalContent } from './UnStakeModalContent';
import { UnStakeModalContentNext } from './UnStakeModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';

export const UnStakeModal = () => {
  const { type, close, args } = useModalContext();
  const { step, setStep, value, setValue } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Unstake} setOpen={close}>
      {step !== 2 ? (
        <UnStakeModalContent
          type={args.type}
          amount={value}
          balance={'0'}
          symbol={'GDOCFX'}
          onAmountChange={async (value) => {
            setValue(value || '0');
          }}
          onSubmit={async () => {
            setStep(2);
          }}
        />
      ) : (
        <UnStakeModalContentNext type={args.type} amount={value} isWrongNetwork={false} />
      )}
    </BasicModal>
  );
};

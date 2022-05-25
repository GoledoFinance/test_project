import React from 'react';
import { ModalType, useModalContext } from 'src/hooks/useModal';
import { BasicModal } from '../../primitives/BasicModal';
import { UnStakeModalContent } from './UnStakeModalContent';
import { UnStakeModalContentNext } from './UnStakeModalContentNext';

export const UnStakeModal = () => {
  const { type, close, args } = useModalContext();
  const [step, setStep] = React.useState(1);
  return (
    <BasicModal open={type === ModalType.Unstake} setOpen={close}>
      {step !== 2 ? (
        <UnStakeModalContent
          type={args.type}
          onSubmit={async () => {
            setStep(2);
          }}
        />
      ) : (
        <UnStakeModalContentNext type={args.type} />
      )}
    </BasicModal>
  );
};

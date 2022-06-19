import React from 'react';
import { ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { useStep } from '../Withdraw/WithdrawModal';
import { StakeModalContent } from './StakeModalContent';

export const StakeModal = () => {
  const { type, close, args } = useModalContext();

  const { step, setStep, value, setValue } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Stake} setOpen={close}>
      {args?.type && (
        <StakeModalContent
          type={args.type}
          walletBalance={'0'}
          symbol={'GDO'}
          amount={value}
          onAmountChange={async (value) => {
            setValue(value || '0');
          }}
          onSubmit={async () => {
            if (value && value !== '0') {
              setStep(2);
            }
          }}
        />
      )}
    </BasicModal>
  );
};

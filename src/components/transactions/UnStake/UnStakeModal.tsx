import React from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';
import { BasicModal } from '../../primitives/BasicModal';
import { UnStakeModalContent } from './UnStakeModalContent';
import { UnStakeModalContentNext } from './UnStakeModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';

export const UnStakeModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
    stakeAssetName: string;
    balance: string;
  }>;
  const { step, setStep, value, setValue } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Unstake} setOpen={close}>
      {step !== 2 ? (
        <UnStakeModalContent
          amount={value}
          balance={args.balance}
          symbol={args.stakeAssetName}
          onAmountChange={async (value) => {
            setValue(value || '0');
          }}
          onSubmit={async () => {
            setStep(2);
          }}
        />
      ) : (
        <UnStakeModalContentNext
          underlyingAsset={args.underlyingAsset}
          symbol={args.stakeAssetName}
          amount={value}
        />
      )}
    </BasicModal>
  );
};

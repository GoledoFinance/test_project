import React from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { useStep } from '../Withdraw/WithdrawModal';
import { StakeModalContent } from './StakeModalContent';
import { StakeModalContentNext } from './StakeModalContentNext';

export const StakeModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
    stakeAssetName: string;
    balance: string;
    type: 'lock' | 'stake';
  }>;

  const { step, setStep, value, setValue } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Stake} setOpen={close}>
      {args?.type &&
        (step !== 2 ? (
          <StakeModalContent
            type={args.type}
            walletBalance={args.balance}
            symbol={args.stakeAssetName}
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
        ) : (
          <StakeModalContentNext
            type={args.type}
            isWrongNetwork={false}
            symbol={args.stakeAssetName}
            selectedToken={args.underlyingAsset}
            amount={value}
          />
        ))}
    </BasicModal>
  );
};

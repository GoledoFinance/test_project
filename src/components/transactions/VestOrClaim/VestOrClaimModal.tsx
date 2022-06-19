import React from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { VestOrClaimModalContent } from './VestOrClaimModalContent';

export const VestOrClaimModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    tokens: string[];
    balance: string;
    stakingContract: string;
  }>;

  return (
    <BasicModal
      open={
        type === ModalType.GoledoVesting ||
        type === ModalType.GoledoWithdraw ||
        type === ModalType.GoledoExitStake ||
        type === ModalType.GoledoClaimRewards ||
        type === ModalType.GoledoWithdrawExpireLocks
      }
      setOpen={close}
    >
      {type && (
        <VestOrClaimModalContent
          type={type}
          amount={args.balance}
          tokens={args.tokens}
          stakingContract={args.stakingContract}
        />
      )}
    </BasicModal>
  );
};

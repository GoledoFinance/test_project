import { PERMISSION } from '@goledo-sdk/contract-helpers';
import { Trans } from '@lingui/macro';
import React from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { SupplyModalContent } from './SupplyModalContent';
import { SupplyModalContentNext } from './SupplyModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';

export const SupplyModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;

  const { step, setStep } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Supply} setOpen={close}>
      <ModalWrapper
        title={<Trans>Supply</Trans>}
        underlyingAsset={args.underlyingAsset}
        requiredPermission={PERMISSION.DEPOSITOR}
      >
        {(params) =>
          step !== 2 ? (
            <SupplyModalContent
              {...params}
              onSubmit={async () => {
                setStep(2);
              }}
            />
          ) : (
            <SupplyModalContentNext {...params} />
          )
        }
      </ModalWrapper>
    </BasicModal>
  );
};

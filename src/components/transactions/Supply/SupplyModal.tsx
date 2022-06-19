import { Trans } from '@lingui/macro';
import React from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { SupplyModalContent } from './SupplyModalContent';
import { SupplyModalContentNext } from './SupplyModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';
import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';

export const SupplyModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;

  const { step, setStep, value, setValue } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Supply} setOpen={close} contentMaxWidth={740}>
      <ModalWrapper
        title={<Trans>Supply</Trans>}
        underlyingAsset={args.underlyingAsset}
        keepWrappedSymbol={
          args.underlyingAsset?.toLowerCase() !== API_ETH_MOCK_ADDRESS.toLowerCase()
        }
      >
        {(params) => {
          return (
            <>
              {step !== 2 ? (
                <SupplyModalContent
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
                />
              ) : (
                <SupplyModalContentNext {...params} amount={value} />
              )}
            </>
          );
        }}
      </ModalWrapper>
    </BasicModal>
  );
};

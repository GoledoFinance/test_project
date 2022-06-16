import { Trans } from '@lingui/macro';
import React, { useState } from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';
import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { RepayModalContent } from './RepayModalContent';
import { RepayModalContentNext } from './RepayModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';
import { Asset } from '../AssetInput';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';

export interface RepayAsset extends Asset {
  balance: string;
}

export const RepayModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
    symbol: string;
    tokenBalance: string;
    poolReserve: ComputedReserveData;
  }>;

  const { step, setStep, value, setValue } = useStep(type);

  const [repayToken, setRepayToken] = useState<RepayAsset>();

  return (
    <BasicModal open={type === ModalType.Repay} setOpen={close}>
      <ModalWrapper title={<Trans>Repay</Trans>} underlyingAsset={args.underlyingAsset}>
        {(params) =>
          step !== 2 ? (
            <RepayModalContent
              {...params}
              onRepayTokenChanged={async (value) => {
                setRepayToken(value);
              }}
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
            <RepayModalContentNext {...params} repayToken={repayToken} amount={value} />
          )
        }
      </ModalWrapper>
    </BasicModal>
  );
};

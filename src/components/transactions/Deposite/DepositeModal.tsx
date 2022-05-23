import { PERMISSION } from '@aave/contract-helpers';
import { Trans } from '@lingui/macro';
import { Typography, Box, Stack } from '@mui/material';
import React, { useState } from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { DepositeModalContent } from './DepositeModalContent';
import { DepositeModalContentNext } from './DepositeModalContentNext';

export const DepositeModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;
  const [withdrawUnWrapped] = useState(true);
  const [step, setStep] = useState(1);

  return (
    <BasicModal open={type === ModalType.Deposite} setOpen={close} contentMaxWidth={740}>
      <ModalWrapper
        title={<Trans>Desposit</Trans>}
        underlyingAsset={args.underlyingAsset}
        keepWrappedSymbol={!withdrawUnWrapped}
        requiredPermission={PERMISSION.DEPOSITOR}
      >
        {(params) => {
          return (
            <>
              <Typography variant="main14" color="#666">
                How much do you like to deposit?
              </Typography>
              <Box
                sx={{
                  p: 5,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  backgroundColor: '#F8F8F8',
                  mt: 2.5,
                }}
                borderColor="#E5E5E5"
                display={'flex'}
              >
                <Stack spacing={2.5} flex={1} mr={12.5}>
                  {[
                    {
                      label: 'Utilization rate',
                      value: '76.23%',
                    },
                    {
                      label: 'Available liquidity',
                      value: '5,332,889.12341',
                    },
                    {
                      label: 'Deposite APY',
                      value: '76.23%',
                    },
                    {
                      label: 'Can be used as coliateral',
                      value: 'Yes',
                    },
                  ].map((item, index) => (
                    <List key={index} {...item} />
                  ))}
                </Stack>
                <Stack spacing={2.5} flex={1}>
                  {[
                    {
                      label: 'Asset price',
                      value: '$1 USD',
                    },
                    {
                      label: 'Maximum LTV',
                      value: '75%',
                    },
                    {
                      label: 'Liquidation threshold',
                      value: '76.23%',
                    },
                    {
                      label: 'Liquidation penalty',
                      value: '5%',
                    },
                  ].map((item, index) => (
                    <List key={index} {...item} />
                  ))}
                </Stack>
              </Box>
              {step !== 2 ? (
                <DepositeModalContent
                  {...params}
                  onSubmit={async () => {
                    setStep(2);
                  }}
                />
              ) : (
                <DepositeModalContentNext {...params} />
              )}
            </>
          );
        }}
      </ModalWrapper>
    </BasicModal>
  );
};

const List = (props: { label: string; value: string }) => (
  <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
    <Typography color="#666">{props?.label}</Typography>
    <Typography variant="main14">{props?.value}</Typography>
  </Box>
);

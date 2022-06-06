import { Trans } from '@lingui/macro';
import { Typography, Box, Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { DepositeModalContent } from './DepositeModalContent';
import { DepositeModalContentNext } from './DepositeModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

export const DepositeModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;
  const { step, setStep } = useStep(type);

  return (
    <BasicModal open={type === ModalType.Deposite} setOpen={close} contentMaxWidth={740}>
      <ModalWrapper title={<Trans>Desposit</Trans>} underlyingAsset={args.underlyingAsset}>
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
                      value: (
                        <FormattedNumber
                          variant="main14"
                          percent
                          value={0.714}
                          visibleDecimals={2}
                          symbolsColor="#111"
                        />
                      ),
                    },
                    {
                      label: 'Available liquidity',
                      value: (
                        <FormattedNumber
                          variant="main14"
                          value={5332889.12341}
                          visibleDecimals={5}
                          compact={false}
                        />
                      ),
                    },
                    {
                      label: 'Deposite APY',
                      value: (
                        <FormattedNumber
                          variant="main14"
                          percent
                          value={0.714}
                          visibleDecimals={2}
                          symbolsColor="#111"
                        />
                      ),
                    },
                    {
                      label: 'Can be used as coliateral',
                      value: <Typography variant="main14">Yes</Typography>,
                    },
                  ].map((item, index) => (
                    <List key={index} {...item} />
                  ))}
                </Stack>
                <Stack spacing={2.5} flex={1}>
                  {[
                    {
                      label: 'Asset price',
                      value: (
                        <FormattedNumber
                          variant="main14"
                          symbol="usd"
                          value={5332889.12341}
                          visibleDecimals={5}
                          symbolsColor="#111"
                        />
                      ),
                    },
                    {
                      label: 'Maximum LTV',
                      value: (
                        <FormattedNumber
                          variant="main14"
                          percent
                          value={0.714}
                          visibleDecimals={2}
                          symbolsColor="#111"
                        />
                      ),
                    },
                    {
                      label: 'Liquidation threshold',
                      value: (
                        <FormattedNumber
                          variant="main14"
                          percent
                          value={0.714}
                          visibleDecimals={2}
                          symbolsColor="#111"
                        />
                      ),
                    },
                    {
                      label: 'Liquidation penalty',
                      value: (
                        <FormattedNumber
                          variant="main14"
                          percent
                          value={0.714}
                          visibleDecimals={2}
                          symbolsColor="#111"
                        />
                      ),
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

const List = (props: { label: string; value: ReactNode }) => (
  <Box display={'flex'} justifyContent={'space-between'} alignItems="center">
    <Typography color="#666">{props?.label}</Typography>
    {props?.value}
  </Box>
);

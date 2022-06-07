import { Trans } from '@lingui/macro';
import React, { ReactNode, useRef } from 'react';
import { ModalContextType, ModalType, useModalContext } from 'src/hooks/useModal';

import { BasicModal } from '../../primitives/BasicModal';
import { ModalWrapper } from '../FlowCommons/ModalWrapper';
import { SupplyModalContent } from './SupplyModalContent';
import { SupplyModalContentNext } from './SupplyModalContentNext';
import { useStep } from '../Withdraw/WithdrawModal';
import { Box, Stack, SvgIcon, Typography } from '@mui/material';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { CheckIcon } from '@heroicons/react/outline';

export const SupplyModal = () => {
  const { type, close, args } = useModalContext() as ModalContextType<{
    underlyingAsset: string;
  }>;

  const { step, setStep, value, setValue } = useStep(type);

  console.log('value', value);

  return (
    <BasicModal open={type === ModalType.Supply} setOpen={close} contentMaxWidth={740}>
      <ModalWrapper title={<Trans>Supply</Trans>} underlyingAsset={args.underlyingAsset}>
        {(params) => {
          return (
            <>
              <Typography variant="main14" color="#666">
                How much do you like to supply?
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
                          value={params.poolReserve.supplyUsageRatio}
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
                          value={params.poolReserve.formattedAvailableLiquidity}
                          visibleDecimals={5}
                          compact={false}
                        />
                      ),
                    },
                    {
                      label: 'Supply APY',
                      value: (
                        <FormattedNumber
                          variant="main14"
                          percent
                          value={params.poolReserve.supplyAPY}
                          visibleDecimals={2}
                          symbolsColor="#111"
                        />
                      ),
                    },
                    {
                      label: 'Collateralization',
                      value: (
                        <>
                          {params.poolReserve.usageAsCollateralEnabled && (
                            <Box display={'flex'} alignItems="center">
                              <SvgIcon sx={{ color: 'success.main', fontSize: 16, mr: '2px' }}>
                                <CheckIcon />
                              </SvgIcon>
                              <Typography variant="description" color="success.main">
                                <Trans>Enabled</Trans>
                              </Typography>
                            </Box>
                          )}
                          {!params.poolReserve.usageAsCollateralEnabled && (
                            <>
                              <Typography variant="description" color="grey">
                                <Trans>Disabled</Trans>
                              </Typography>
                            </>
                          )}
                        </>
                      ),
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
                          value={params.poolReserve.formattedPriceInETH}
                          visibleDecimals={4}
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
                          value={params.poolReserve.formattedBaseLTVasCollateral}
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
                          value={params.poolReserve.formattedReserveLiquidationThreshold}
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
                          value={params.poolReserve.formattedReserveLiquidationBonus}
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
                <SupplyModalContentNext {...params} value={value} />
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

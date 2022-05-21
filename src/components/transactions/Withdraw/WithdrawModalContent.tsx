import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { Box, Button, Typography, TextField, InputAdornment } from '@mui/material';
// import BigNumber from 'bignumber.js';
import { forwardRef } from 'react';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
}

const NumberFormatCustom = forwardRef<NumberFormatProps, CustomProps>(function NumberFormatCustom(
  props,
  ref
) {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(values) => {
        if (values.value !== props.value)
          onChange({
            target: {
              name: props.name,
              value: values.value || '',
            },
          });
      }}
      thousandSeparator
      isNumericString
      allowNegative={false}
    />
  );
});

export const AInput = ({
  symbol,
  max = true,
  placeholder,
}: {
  symbol: string;
  max?: boolean;
  placeholder?: string;
}) => (
  <TextField
    sx={{ width: '100%', mt: 2.5 }}
    InputProps={{
      sx: {
        backgroundColor: '#f1f1f1',
        borderColor: 'transparent !important',
        height: 40,
      },
      placeholder: placeholder || 'Amount',
      startAdornment: (
        <InputAdornment position="start">
          <img
            src={`/icons/tokens/${symbol?.toLocaleLowerCase()}.svg`}
            alt="icon"
            width={20}
            height={20}
          />
        </InputAdornment>
      ),
      endAdornment: max && (
        <InputAdornment position="end">
          <Typography
            sx={{ cursor: 'pointer', color: '#2D88F2' }}
            onClick={() => {
              console.log('change to max');
            }}
          >
            MAX
          </Typography>
        </InputAdornment>
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      inputComponent: NumberFormatCustom as any,
    }}
  />
);

export enum ErrorType {
  CAN_NOT_WITHDRAW_THIS_AMOUNT,
  POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY,
}

export const WithdrawModalContent = ({
  symbol,
  onSubmit,
}: ModalWrapperProps & { onSubmit: () => Promise<void> }) => {
  return (
    <>
      <Typography variant="description" color={'#666'}>
        How much do you want to withdraw?
      </Typography>

      <Box display={'flex'} justifyContent="space-between" alignItems={'center'} mt={10}>
        <Typography variant="main14">Available to withdaw</Typography>
        <Typography variant="description" color={'#666'}>
          20.101 ETH
        </Typography>
      </Box>
      <AInput symbol={symbol} />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 10, height: 40 }}
        onClick={onSubmit}
      >
        Continue
      </Button>
    </>
  );
};

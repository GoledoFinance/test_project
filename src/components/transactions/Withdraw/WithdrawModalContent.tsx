import NumberFormat, { NumberFormatProps } from 'react-number-format';
import { Box, Button, Typography, TextField, InputAdornment } from '@mui/material';
import BigNumber from 'bignumber.js';
import { forwardRef, useRef, useImperativeHandle, useState } from 'react';

import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
  value: string;
}

const NumberFormatCustom = forwardRef<
  {
    setValue: (v: string) => void;
    getValue: () => string;
  } & NumberFormatProps,
  CustomProps
>(function NumberFormatCustom(props, ref) {
  const { onChange, ...other } = props;

  const [value, setValue] = useState('');

  // TODO: 待修复
  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (v: string) => {
      setValue(v);
      onChange({
        target: {
          name: props.name,
          value: v,
        },
      });
    },
  }));

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      value={value}
      onValueChange={(values) => {
        if (values.value !== props.value) {
          setValue(values.value);
          onChange({
            target: {
              name: props.name,
              value: values.value || '',
            },
          });
        }
      }}
      thousandSeparator
      isNumericString
      allowNegative={false}
    />
  );
});

// eslint-disable-next-line react/display-name
export const AInput = forwardRef<
  {
    getValue: () => string;
  },
  {
    symbol: string;
    max?: false | number | string;
    placeholder?: string;
  }
>(({ symbol, max = false, placeholder }, ref1) => {
  const ref = useRef(null);

  useImperativeHandle(ref1, () => ({
    getValue: () => ref.current?.getValue?.(),
  }));

  return (
    <TextField
      sx={{ width: '100%', mt: 2.5 }}
      inputRef={ref}
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
        endAdornment: max !== false && (
          <InputAdornment position="end">
            <Typography
              sx={{ cursor: 'pointer', color: '#2D88F2' }}
              onClick={() => {
                if (ref?.current) {
                  ref.current?.setValue(max);
                }
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
});

export enum ErrorType {
  CAN_NOT_WITHDRAW_THIS_AMOUNT,
  POOL_DOES_NOT_HAVE_ENOUGH_LIQUIDITY,
}

export const WithdrawModalContent = ({
  symbol,
  onSubmit,
}: ModalWrapperProps & { onSubmit: (v?: string) => Promise<void> }) => {
  const ref = useRef(null);

  const maxV = '20.101';

  return (
    <>
      <Typography variant="description" color={'#666'}>
        How much do you want to withdraw?
      </Typography>

      <Box display={'flex'} justifyContent="space-between" alignItems={'center'} mt={10}>
        <Typography variant="main14">Available to withdaw</Typography>

        <FormattedNumber
          variant="description"
          symbol="ETH"
          value={maxV}
          visibleDecimals={4}
          symbolsColor="#666"
          sx={{ color: '#666' }}
        />
      </Box>
      <AInput symbol={symbol} ref={ref} max={maxV} />
      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 10, height: 40 }}
        onClick={() => {
          const inputV: string = ref.current?.getValue?.() || '0';
          onSubmit(BigNumber.minimum(inputV, maxV).toString());
        }}
      >
        Continue
      </Button>
    </>
  );
};

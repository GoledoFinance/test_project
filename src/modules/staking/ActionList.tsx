/* eslint-disable @typescript-eslint/no-empty-function */
import { Divider, Stack, Box, Typography, Button } from '@mui/material';
import { ReactNode } from 'react';

import { ModalType, useModalContext } from 'src/hooks/useModal';
import BigNumber from 'bignumber.js';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

export const ActionList = () => {
  const { userGoledoStake } = useAppDataContext();
  const { currentMarketData } = useProtocolDataContext();
  const { openVestOrClaim } = useModalContext();

  const timestamp = Math.floor(Date.now() / 1000);

  let penalty = new BigNumber('0');
  let vesting = new BigNumber('0');
  let expiredLockBalance = new BigNumber('0');
  let unlockedBalance = new BigNumber('0');
  userGoledoStake.vestings.forEach((earn) => {
    penalty = penalty.plus(new BigNumber(earn.amount));
    vesting = vesting.plus(new BigNumber(earn.amount));
  });
  penalty = penalty.div(2);
  userGoledoStake.lockings.forEach((lock) => {
    if (lock.expire <= timestamp) {
      expiredLockBalance = expiredLockBalance.plus(lock.amount);
    }
  });
  unlockedBalance = unlockedBalance.plus(userGoledoStake.unlockedBalance);

  return (
    <Stack divider={<Divider />} spacing={3}>
      <ListItem
        title={'Unlocked Goledo'}
        desc={'Staked Goledo and expried Goledo vests'}
        num={unlockedBalance.toPrecision(4)}
        claimFn={() =>
          openVestOrClaim(
            ModalType.GoledoWithdraw,
            unlockedBalance.toString(),
            [],
            currentMarketData.addresses.MULTI_FEE_DISTRIBUTION
          )
        }
        disabled={unlockedBalance.isZero()}
        buttonText={'Claim Goledo'}
      />
      <ListItem
        title={'Vesting Goledo'}
        desc={
          <>
            Goledo that can be claimed with a{' '}
            <Typography component={'span'} color="red">
              50% penalty
            </Typography>
          </>
        }
        num={vesting.toPrecision(4)}
        buttonText={''}
      />
      <ListItem
        title={'Claim all of the above'}
        desc={
          <>
            Early exit penalty{' '}
            <FormattedNumber
              value={penalty.toString()}
              variant="secondary14"
              color={'red'}
              symbol={'Goledo'}
            />
          </>
        }
        disabled={vesting.isZero()}
        buttonText={'Claim All'}
        claimFn={() =>
          openVestOrClaim(
            ModalType.GoledoExitStake,
            vesting.plus(unlockedBalance).toString(),
            [],
            currentMarketData.addresses.MULTI_FEE_DISTRIBUTION
          )
        }
      />
      <ListItem
        title={'Expired locked Goledo'}
        desc={'Goledo locks that have exceeded the 3 month lock period and are now withdrawable'}
        num={expiredLockBalance.toPrecision()}
        claimFn={() =>
          openVestOrClaim(
            ModalType.GoledoWithdrawExpireLocks,
            unlockedBalance.toString(),
            [],
            currentMarketData.addresses.MULTI_FEE_DISTRIBUTION
          )
        }
        disabled={expiredLockBalance.isZero()}
        buttonText={'Withdraw'}
      />
    </Stack>
  );
};

const ListItem = ({
  title,
  desc,
  num,
  claimFn,
  disabled,
  buttonText,
}: {
  title: ReactNode;
  desc: ReactNode;
  buttonText: string;
  num?: string;
  claimFn?: () => void;
  disabled?: boolean;
}) => (
  <Box display={'flex'} alignItems="center">
    <Box width={353}>
      <Typography variant="main16">{title}</Typography>
      <Typography variant="description">{desc}</Typography>
    </Box>
    <Box flex={1} />
    <Box
      display={'flex'}
      sx={{ flexDirection: { xs: 'column', lg: 'row' } }}
      alignItems={{ xs: 'flex-end', lg: 'center' }}
    >
      {num && (
        <Box display={'flex'} alignItems="center" marginRight={7.5}>
          <img src={'/icons/tokens/gol.svg'} alt="goledo" width={22} height={22} />
          <FormattedNumber variant="main16" marginLeft={2} value={num} symbol={'Goledo'} />
        </Box>
      )}
      {claimFn ? (
        <Button
          sx={{ width: '140px', height: '40px' }}
          variant="contained"
          onClick={claimFn}
          disabled={disabled}
          size="large"
        >
          {buttonText}
        </Button>
      ) : (
        <Box width={140} />
      )}
    </Box>
  </Box>
);

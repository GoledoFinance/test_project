import { Divider, Stack, Box, Typography, Button } from '@mui/material';
import { ReactNode } from 'react';
import { useRewardData } from 'src/hooks/app-data-provider/useRewardData';

// import { useModalContext } from 'src/hooks/useModal';
import BigNumber from 'bignumber.js';
import { useStakeTxBuilderContext } from 'src/hooks/useStakeTxBuilder';
import { useTransactionHandler } from 'src/helpers/useTransactionHandler';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export const ActionList = () => {
  const { currentAccount, loading } = useWeb3Context();
  const { currentMarketData } = useProtocolDataContext();
  const { data: rewardData } = useRewardData();

  const timestamp = Math.floor(Date.now() / 1000);

  let penalty = new BigNumber('0');
  let vesting = new BigNumber('0');
  let expiredLockBalance = new BigNumber('0');
  let unlockedBalance = new BigNumber('0');
  if (rewardData) {
    rewardData.stakeUserData.earnedBalances.forEach((earn) => {
      penalty = penalty.plus(new BigNumber(earn.amount));
      vesting = vesting.plus(new BigNumber(earn.amount));
    });
    penalty = penalty.dividedBy(2);
    rewardData.stakeUserData.lockedBalances.forEach((lock) => {
      if (lock.unlockTime <= timestamp) {
        expiredLockBalance = expiredLockBalance.plus(lock.amount);
      }
    });
    unlockedBalance = unlockedBalance.plus(rewardData.stakeUserData.unlockedBalance);
  }

  const { staking } = useStakeTxBuilderContext('');

  const { action: withdrawExpiredLocksAction, loadingTxns: loadingWithdrawExpiredLocksTxns } =
    useTransactionHandler({
      handleGetTxns: async () => {
        return staking.withdrawExpiredLocks({
          user: currentAccount,
          distributionAddress: currentMarketData.addresses.MULTI_FEE_DISTRIBUTION,
        });
      },
      skip: loading,
      deps: [currentAccount, loading],
    });

  const { action: exitAction, loadingTxns: loadingExitTxns } = useTransactionHandler({
    handleGetTxns: async () => {
      return staking.exit({
        user: currentAccount,
        distributionAddress: currentMarketData.addresses.MULTI_FEE_DISTRIBUTION,
      });
    },
    skip: loading,
    deps: [currentAccount, loading],
  });

  const { action: withdrawAction, loadingTxns: loadingWithdrawTxns } = useTransactionHandler({
    handleGetTxns: async () => {
      return staking.withdraw({
        user: currentAccount,
        amount: '1',
        distributionAddress: currentMarketData.addresses.MULTI_FEE_DISTRIBUTION,
      });
    },
    skip: loading,
    deps: [currentAccount, loading, unlockedBalance],
  });

  return (
    <Stack divider={<Divider />} spacing={3}>
      <ListItem
        title={'Unlocked Goledo'}
        desc={'Staked Goledo and expried Goledo vests'}
        num={unlockedBalance.toFixed(2)}
        claimFn={withdrawAction}
        disabled={!rewardData || loading || loadingWithdrawTxns || unlockedBalance.isZero()}
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
        num={vesting.toFixed(2)}
        buttonText={''}
      />
      <ListItem
        title={'Claim all of the above'}
        desc={
          <>
            Early exit penalty{' '}
            <Typography component={'span'} color="red">
              {penalty.toFixed(2)} Goledo
            </Typography>
          </>
        }
        disabled={!rewardData || loading || loadingExitTxns}
        buttonText={'Claim All'}
        claimFn={exitAction}
      />
      <ListItem
        title={'Expired locked Goledo'}
        desc={'Goledo locks that have exceeded the 3 month lock period and are now withdrawable'}
        num={expiredLockBalance.toPrecision()}
        claimFn={withdrawExpiredLocksAction}
        disabled={
          !rewardData || loading || loadingWithdrawExpiredLocksTxns || expiredLockBalance.isZero()
        }
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
    {num && (
      <Box display={'flex'} alignItems="center" marginRight={7.5}>
        <img src={'/icons/tokens/gdo.svg'} alt="goledo" width={22} height={22} />
        <Typography variant="main16" marginLeft={2}>
          {num} Goledo
        </Typography>
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
);

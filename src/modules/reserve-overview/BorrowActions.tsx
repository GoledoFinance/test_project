import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  // Button,
  // CircularProgress,
  // Paper,
  Skeleton,
  Stack,
  Typography,
  // Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import {
  ComputedReserveData,
  ComputedUserReserveData,
  useAppDataContext,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { useWalletBalances } from 'src/hooks/app-data-provider/useWalletBalances';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import { Row } from '../../components/primitives/Row';
import { PaperWrapper } from './ReserveActions';
import { HealthFactorNumber } from 'src/components/HealthFactorNumber';
import { ListButtonsColumn } from '../dashboard/lists/ListButtonsColumn';
import { useModalContext } from 'src/hooks/useModal';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import { API_ETH_MOCK_ADDRESS, InterestRate } from '@goledo-sdk/contract-helpers';
import { getMaxAmountAvailableToBorrow } from 'src/utils/getMaxAmountAvailableToBorrow';
import { AvailableTooltip } from 'src/components/infoTooltips/AvailableTooltip';
import { CapType } from 'src/components/caps/helper';

interface ReserveActionsProps {
  underlyingAsset: string;
}

export const BorrowActions = ({ underlyingAsset }: ReserveActionsProps) => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const { openBorrow, openRepay } = useModalContext();

  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { reserves, user, isUserHasDeposits, loading: loadingReserves } = useAppDataContext();
  const { loading: loadingBalance } = useWalletBalances();

  if (!currentAccount)
    return (
      <Paper sx={{ pt: 4, pb: { xs: 4, xsm: 6 }, px: { xs: 4, xsm: 6 } }}>
        {web3Loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h3" sx={{ mb: { xs: 6, xsm: 10 } }}>
              <Trans>Borrows</Trans>
            </Typography>
            <Typography sx={{ mb: 6 }} color="text.secondary">
              <Trans>Please connect a wallet to view your personal information here.</Trans>
            </Typography>
            <ConnectWalletButton />
          </>
        )}
      </Paper>
    );

  if (loadingReserves || loadingBalance)
    return (
      <PaperWrapper title="Deposits">
        <Row
          caption={<Skeleton width={100} height={20} />}
          align="flex-start"
          mb={6}
          captionVariant="description"
        >
          <Skeleton width={70} height={20} />
        </Row>

        <Row caption={<Skeleton width={100} height={20} />} mb={3}>
          <Skeleton width={70} height={20} />
        </Row>

        <Row caption={<Skeleton width={100} height={20} />} mb={10}>
          <Skeleton width={70} height={20} />
        </Row>

        <Stack direction="row" spacing={2}>
          <Skeleton width={downToXSM ? '100%' : 70} height={36} />
          <Skeleton width={downToXSM ? '100%' : 70} height={36} />
        </Stack>
      </PaperWrapper>
    );

  const poolReserve = reserves.find(
    (reserve) => reserve.underlyingAsset === underlyingAsset
  ) as ComputedReserveData;
  const userReserve = user?.userReservesData.find((userReserve) => {
    if (underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase())
      return userReserve.reserve.isWrappedBaseAsset;
    return underlyingAsset === userReserve.underlyingAsset;
  }) as ComputedUserReserveData;

  const maxAmountToBorrow = getMaxAmountAvailableToBorrow(
    poolReserve,
    user,
    InterestRate.Variable
  ).toString();

  return (
    <PaperWrapper
      title="Borrows"
      subTitle={
        <ListButtonsColumn>
          <Button
            sx={{ height: 32 }}
            disabled={!isUserHasDeposits}
            variant="contained"
            onClick={() => openBorrow(underlyingAsset)}
          >
            <Trans>Borrow</Trans>
          </Button>
          <Button
            sx={{ height: 32 }}
            disabled={!userReserve || userReserve.scaledVariableDebt === '0'}
            variant="outlined"
            onClick={() => openRepay(underlyingAsset, InterestRate.Variable)}
          >
            <Trans>Repay</Trans>
          </Button>
        </ListButtonsColumn>
      }
    >
      <Row caption={<Trans>Borrowed</Trans>} align="flex-start" mb={3} captionVariant="description">
        <FormattedNumber
          value={userReserve?.variableBorrows}
          variant="secondary14"
          symbol={poolReserve.symbol}
        />
      </Row>

      <Row caption={<Trans>Health Factor</Trans>} mb={3} captionVariant="description">
        <HealthFactorNumber
          value={user?.healthFactor || '-1'}
          variant={'secondary14'}
          // onInfoClick={() => setOpen(true)}
        />
      </Row>

      <Row caption={<Trans>Loan to Value</Trans>} mb={3} captionVariant="description">
        <FormattedNumber
          value={user?.currentLoanToValue}
          variant={'secondary14'}
          visibleDecimals={2}
          compact
          symbol="USD"
          symbolsColor="#fff"
          symbolsVariant={'description'}
          data-cy={'Claim_Value'}
        />
      </Row>

      <Row
        caption={
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Trans>Available to borrow</Trans>
            <AvailableTooltip capType={CapType.borrowCap} />{' '}
          </Box>
        }
        mb={1}
        captionVariant="description"
      >
        <FormattedNumber
          value={maxAmountToBorrow}
          variant="secondary14"
          symbol={poolReserve.symbol}
        />
      </Row>
    </PaperWrapper>
  );
};

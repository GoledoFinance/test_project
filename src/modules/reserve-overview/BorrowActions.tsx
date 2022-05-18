import { Trans } from '@lingui/macro';
import {
  Button,
  CircularProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import {
  ComputedReserveData,
  useAppDataContext,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { useWalletBalances } from 'src/hooks/app-data-provider/useWalletBalances';
import { usePermissions } from 'src/hooks/usePermissions';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { getMaxAmountAvailableToSupply } from 'src/utils/getMaxAmountAvailableToSupply';

import { Row } from '../../components/primitives/Row';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import { ListButtonsColumn } from '../dashboard/lists/ListButtonsColumn';
import { ListItemUsedAsCollateral } from '../dashboard/lists/ListItemUsedAsCollateral';
import { PaperWrapper } from './ReserveActions';
import { HealthFactorNumber } from 'src/components/HealthFactorNumber';

interface ReserveActionsProps {
  underlyingAsset: string;
}

export const BorrowActions = ({ underlyingAsset }: ReserveActionsProps) => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  // const { openBorrow, openSupply } = useModalContext();

  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { reserves, loading: loadingReserves } = useAppDataContext();
  const { walletBalances, loading: loadingBalance } = useWalletBalances();
  const { isPermissionsLoading } = usePermissions();

  if (!currentAccount && !isPermissionsLoading) return null;

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

  const balance = walletBalances[underlyingAsset];
  const maxAmountToSupply = getMaxAmountAvailableToSupply(
    balance.amount,
    poolReserve,
    underlyingAsset
  ).toString();

  return (
    <PaperWrapper title="Borrows">
      <Row caption={<Trans>Borrowed</Trans>} align="flex-start" mb={3} captionVariant="description">
        <FormattedNumber
          value={balance?.amount || 0}
          variant="secondary14"
          symbol={poolReserve.symbol}
        />
      </Row>

      <Row caption={<Trans>Health Factor</Trans>} mb={3} captionVariant="description">
        <HealthFactorNumber
          value={'1.1' || '-1'}
          variant={'secondary14'}
          // onInfoClick={() => setOpen(true)}
        />
      </Row>

      <Row caption={<Trans>Loan to Value</Trans>} mb={3} captionVariant="description">
        <FormattedNumber
          value={12}
          variant={'secondary14'}
          visibleDecimals={2}
          compact
          symbol="USD"
          symbolsColor="#fff"
          symbolsVariant={'description'}
          data-cy={'Claim_Value'}
        />
      </Row>

      <Row caption={<Trans>Available to you</Trans>} mb={1} captionVariant="description">
        <FormattedNumber
          value={maxAmountToSupply}
          variant="secondary14"
          symbol={poolReserve.symbol}
        />
      </Row>
    </PaperWrapper>
  );
};

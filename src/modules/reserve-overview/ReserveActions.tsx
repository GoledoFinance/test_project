import { Trans } from '@lingui/macro';
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  Skeleton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React, { ReactNode } from 'react';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import {
  ComputedReserveData,
  useAppDataContext,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { useModalContext } from 'src/hooks/useModal';
import { useWalletBalances } from 'src/hooks/app-data-provider/useWalletBalances';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { getMaxAmountAvailableToSupply } from 'src/utils/getMaxAmountAvailableToSupply';

import { Row } from '../../components/primitives/Row';
import { ConnectWalletButton } from 'src/components/WalletConnection/ConnectWalletButton';
import { ListButtonsColumn } from '../dashboard/lists/ListButtonsColumn';
import { ListItemUsedAsCollateral } from '../dashboard/lists/ListItemUsedAsCollateral';
import { UserReserveData } from '@goledo-sdk/math-utils';
import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export const PaperWrapper = ({
  children,
  title,
  subTitle,
}: {
  children: ReactNode;
  title: ReactNode;
  subTitle?: ReactNode;
}) => {
  return (
    <Paper sx={{ pt: 4, pb: { xs: 4, xsm: 6 }, px: { xs: 4, xsm: 6 } }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: { xs: 3, xsm: 4 },
        }}
      >
        <Typography variant="h3">
          <Trans>{title}</Trans>
        </Typography>
        {subTitle}
      </Box>

      {children}
    </Paper>
  );
};

interface ReserveActionsProps {
  underlyingAsset: string;
}

export const ReserveActions = ({ underlyingAsset }: ReserveActionsProps) => {
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const { openWithdraw, openSupply, openCollateralChange } = useModalContext();

  const { currentAccount, loading: web3Loading } = useWeb3Context();
  const { currentNetworkConfig } = useProtocolDataContext();
  const { reserves, userReserves, loading: loadingReserves } = useAppDataContext();
  const { walletBalances, loading: loadingBalance } = useWalletBalances();

  if (!currentAccount)
    return (
      <Paper sx={{ pt: 4, pb: { xs: 4, xsm: 6 }, px: { xs: 4, xsm: 6 } }}>
        {web3Loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h3" sx={{ mb: { xs: 6, xsm: 10 } }}>
              <Trans>Supplies</Trans>
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
      <PaperWrapper title="Supplies">
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
  const userReserve = userReserves.find(
    (reserve) => reserve.underlyingAsset === underlyingAsset
  ) as UserReserveData;

  const balance = walletBalances[underlyingAsset];
  const nativeBalance = walletBalances[API_ETH_MOCK_ADDRESS.toLowerCase()];

  return (
    <PaperWrapper
      title="Supplies"
      subTitle={
        <ListButtonsColumn>
          <Button
            sx={{ height: 32 }}
            disabled={
              (!balance || balance.amount === '0') &&
              (!poolReserve.isWrappedBaseAsset || !nativeBalance || nativeBalance.amount === '0')
            }
            variant="contained"
            onClick={() => openSupply(underlyingAsset)}
          >
            <Trans>Supply</Trans>
          </Button>
          <Button
            sx={{ height: 32 }}
            disabled={!userReserve || userReserve.scaledATokenBalance === '0'}
            variant="outlined"
            onClick={() => openWithdraw(underlyingAsset)}
          >
            <Trans>Withdraw</Trans>
          </Button>
        </ListButtonsColumn>
      }
    >
      {poolReserve.isWrappedBaseAsset && (
        <Row
          caption={<Trans>Your {currentNetworkConfig.baseAssetSymbol} balance</Trans>}
          align="flex-start"
          mb={3}
          captionVariant="description"
        >
          <FormattedNumber
            value={nativeBalance?.amount || 0}
            variant="secondary14"
            symbol={currentNetworkConfig.baseAssetSymbol}
          />
        </Row>
      )}
      <Row
        caption={<Trans>Your wallet balance</Trans>}
        align="flex-start"
        mb={3}
        captionVariant="description"
      >
        <FormattedNumber
          value={balance?.amount || 0}
          variant="secondary14"
          symbol={poolReserve.symbol}
        />
      </Row>

      <Row caption={<Trans>You already deposited</Trans>} mb={1} captionVariant="description">
        <FormattedNumber
          value={userReserve.scaledATokenBalance}
          variant="secondary14"
          symbol={poolReserve.symbol}
        />
      </Row>

      <Row caption={<Trans>Use as coliateral</Trans>} captionVariant="description">
        <ListItemUsedAsCollateral
          isIsolated={false}
          usageAsCollateralEnabledOnUser={userReserve.usageAsCollateralEnabledOnUser}
          canBeEnabledAsCollateral={poolReserve.usageAsCollateralEnabled}
          onToggleSwitch={() => openCollateralChange(underlyingAsset)}
          data-cy={`collateralStatus`}
        />
      </Row>
    </PaperWrapper>
  );
};

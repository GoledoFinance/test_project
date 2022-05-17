import { Trans } from '@lingui/macro';
import { CircularProgress, Paper, PaperProps, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { ConnectWalletButton } from './WalletConnection/ConnectWalletButton';

import Empty from '/public/empty.svg';

interface ConnectWalletPaperProps extends PaperProps {
  loading?: boolean;
  description?: ReactNode;
}

export const ConnectWalletPaper = ({
  loading,
  description,
  sx,
  ...rest
}: ConnectWalletPaperProps) => {
  return (
    <Paper
      {...rest}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        p: 4,
        flex: 1,
        borderRadius: '8px',
        ...sx,
      }}
    >
      <Empty style={{ marginBottom: '16px' }} />
      <>
        {loading ? (
          <CircularProgress />
        ) : (
          <>
            <Typography variant="h2" sx={{ mb: 2 }}>
              <Trans>Connect Your Wallet</Trans>
            </Typography>
            <Typography sx={{ mb: 6, maxWidth: '300px' }} color="text.secondary">
              {description || (
                <Trans>
                  Conncet your wallet to see your supplies, borrowings and open positions.
                </Trans>
              )}
            </Typography>
            <ConnectWalletButton />
          </>
        )}
      </>
    </Paper>
  );
};

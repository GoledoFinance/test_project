import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import { useWalletModalContext } from 'src/hooks/useWalletModal';
import { WalletModal } from './WalletModal';

export const ConnectWalletButton = () => {
  const { setWalletModalOpen } = useWalletModalContext();

  return (
    <>
      <Button
        variant="contained"
        color="success"
        size="large"
        onClick={() => setWalletModalOpen(true)}
        sx={{
          borderRadius: '100px',
          color: 'white',
        }}
      >
        <Trans>Connect Wallet</Trans>
      </Button>
      <WalletModal />
    </>
  );
};

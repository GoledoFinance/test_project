import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Button, ButtonProps, SvgIcon, Typography } from '@mui/material';

import { NetworkConfig } from '../ui-config/networksConfig';
import { Link } from './primitives/Link';

interface BridgeButtonProps extends Pick<NetworkConfig, 'bridge'>, ButtonProps<typeof Link> {
  withoutIcon?: boolean;
}

export const BridgeButton = ({ bridge, withoutIcon, ...rest }: BridgeButtonProps) => {
  if (bridge.length === 0) return null;
  const _bridge = bridge[0];

  return (
    <Button
      component={Link}
      size="small"
      href={_bridge.url || ''}
      sx={{ p: '2px 4px', ...rest.sx }}
      {...rest}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {!withoutIcon && (
          <img src={_bridge.icon} alt={_bridge.name} style={{ width: 14, height: 14 }} />
        )}

        <Typography sx={{ mx: 1 }}>{withoutIcon ? <Trans>Bridge</Trans> : _bridge.name}</Typography>
        <SvgIcon sx={{ fontSize: 14 }}>
          <ExternalLinkIcon />
        </SvgIcon>
      </Box>
    </Button>
  );
};

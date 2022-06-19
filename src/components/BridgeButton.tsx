import { ExternalLinkIcon } from '@heroicons/react/outline';
import { Trans } from '@lingui/macro';
import { Box, Button, ButtonProps, SvgIcon, Typography, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { NetworkConfig } from '../ui-config/networksConfig';
import { Link } from './primitives/Link';

interface BridgeButtonProps extends Pick<NetworkConfig, 'bridge'>, ButtonProps<typeof Link> {
  title: string;
  withoutIcon?: boolean;
}

export const BridgeButton = ({ title, bridge, withoutIcon }: BridgeButtonProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  if (bridge.length === 0) return null;

  return (
    <Box>
      <Button
        variant="outlined"
        id="bridge-button-1"
        aria-controls={open ? 'bridge-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        size="small"
        endIcon={<ArrowDropDownIcon />}
      >
        {title}
      </Button>
      <Menu
        id="bridge-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'bridge-button-1',
        }}
      >
        {bridge.map((_bridge) => {
          return (
            <MenuItem onClick={handleClose} key={_bridge.name}>
              <Box
                sx={{ display: 'flex', alignItems: 'center' }}
                component={Link}
                href={_bridge.url || ''}
              >
                {!withoutIcon && (
                  <img src={_bridge.icon} alt={_bridge.name} style={{ width: 14, height: 14 }} />
                )}

                <Typography sx={{ mx: 2 }}>
                  {withoutIcon ? <Trans>Bridge</Trans> : _bridge.name}
                </Typography>
                <SvgIcon sx={{ fontSize: 14 }}>
                  <ExternalLinkIcon />
                </SvgIcon>
              </Box>
            </MenuItem>
          );
        })}
      </Menu>
    </Box>
  );
};

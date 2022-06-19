import { Trans } from '@lingui/macro';
import * as React from 'react';
import { Typography } from '@mui/material';

import { TopInfoPanel } from '../../components/TopInfoPanel/TopInfoPanel';

export const MoreTopPanel = () => {
  return (
    <TopInfoPanel bridge={[]} pageTitle={<Trans>Protocol Owned DEX Liquidity Module</Trans>}>
      <Typography variant="description" maxWidth={685}>
        Sell GoledoFTM LP tokens directly to the protocol for a 10% premium
        <br />
        <br />
        50% of the FTM treasury rewards (earned from bottowing fees) are redifrected to purchase
        these LP tokens which are locked forever, ensuring healthy ongoing liquidty for the
        protocol.
      </Typography>
    </TopInfoPanel>
  );
};

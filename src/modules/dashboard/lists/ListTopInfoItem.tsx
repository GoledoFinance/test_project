import { Paper, Typography } from '@mui/material';
import { ReactNode } from 'react';

import { FormattedNumber } from '../../../components/primitives/FormattedNumber';

interface ListTopInfoItemProps {
  title: ReactNode;
  value: number | string;
  percent?: boolean;
  tooltip?: ReactNode;
  size?: 'small' | 'medium';
}

export const ListTopInfoItem = ({
  size = 'medium',
  title,
  value,
  percent,
  tooltip,
}: ListTopInfoItemProps) => {
  return (
    <Paper
      variant="outlined"
      sx={{
        mr: { lg: 2 },
        p: size === 'small' ? '0px 4px' : '2px 4px',
        display: 'flex',
        alignItems: 'center',
        boxShadow: 'none',
        bgcolor: 'transparent',
        borderRadius: '4px',
      }}
    >
      <Typography color="text.secondary" sx={{ mr: 1 }} noWrap>
        {title}
      </Typography>
      <FormattedNumber value={value} percent={percent} variant="secondary14" symbol="USD" />

      {tooltip}
    </Paper>
  );
};

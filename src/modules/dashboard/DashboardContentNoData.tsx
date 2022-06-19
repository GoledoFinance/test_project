import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface DashboardContentNoDataProps {
  text: ReactNode;
  img?: string;
}

export const DashboardContentNoData = ({ text, img }: DashboardContentNoDataProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 4, xsm: 6 },
        pt: { xs: 1.5, xsm: 1.5 },
        pb: { xs: 6, sxm: 7 },
      }}
    >
      {img && <img src={'/empty-2.svg'} alt="empty img" />}
      <Typography color="#ccc" sx={{ mt: 3.5 }}>
        {text}
      </Typography>
    </Box>
  );
};

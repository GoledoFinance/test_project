import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface DashboardContentNoDataProps {
  text: ReactNode;
}

export const DashboardContentNoData = ({ text }: DashboardContentNoDataProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 4, xsm: 6 },
        pt: { xs: 3.5, xsm: 5.5 },
        pb: { xs: 6, sxm: 7 },
      }}
    >
      <img src={'/icons/common/empty.svg'} alt="empty-icon" width={96} height={86} />
      <Typography color="#ccc" sx={{ mt: 3.5 }}>
        {text}
      </Typography>
    </Box>
  );
};

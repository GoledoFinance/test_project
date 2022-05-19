import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';

interface InfoWrapperProps {
  topValue: ReactNode;
  topTitle: ReactNode;
  topDescription: ReactNode;
  children?: ReactNode;
  bottomText?: ReactNode;
  isWarning?: boolean;
  isError?: boolean;
}

export const InfoWrapper = ({
  topValue,
  topTitle,
  topDescription,
  children,
  bottomText,
  isWarning,
  isError,
}: InfoWrapperProps) => {
  return (
    <Box
      sx={() => ({
        mb: 6,
        '&:last-of-type': {
          mb: 0,
        },
      })}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ width: 'calc(100% - 72px)' }}>
          <Typography variant="subheader1" mb={1}>
            {topTitle}
          </Typography>
          <Typography variant="caption" color="text.secondary" maxWidth={330}>
            {topDescription}
          </Typography>
        </Box>

        <Box
          sx={{
            alignSelf: 'center',
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: isError ? 'error.main' : isWarning ? 'warning.main' : 'success.main',
            borderWidth: 1,
            borderStyle: 'dotted',
            bgcolor: isError
              ? 'rgba(233, 30, 30, 0.1)'
              : isWarning
              ? 'rgba(255, 193, 7, 0.1)'
              : 'rgba(58, 193, 112, 0.1)',
          }}
        >
          {topValue}
        </Box>
      </Box>

      <Box>{children}</Box>

      <Typography variant="secondary12" color="text.secondary" textAlign="left">
        {bottomText}
      </Typography>
    </Box>
  );
};

import React, { ReactNode } from 'react';
import { Trans } from '@lingui/macro';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  BoxProps,
  Divider,
  Typography,
  TypographyProps,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Stack,
  StackProps,
} from '@mui/material';
import Paper from '@mui/material/Paper';
import { ComputedReserveData } from 'src/hooks/app-data-provider/useAppDataProvider';
// TODO: 记得替换
import { NetAPYTooltip } from 'src/components/infoTooltips/NetAPYTooltip';

export const PanelRow: React.FC<BoxProps> = (props) => (
  <Box
    {...props}
    sx={{
      position: 'relative',
      display: { xs: 'block', md: 'flex' },
      margin: '0 auto',
      ...props.sx,
    }}
  />
);
export const PanelTitle: React.FC<TypographyProps> = (props) => (
  <Typography
    {...props}
    variant="subheader1"
    sx={{ minWidth: { xs: '170px' }, mr: 4, mb: { xs: 6, md: 0 }, ...props.sx }}
  />
);

interface PanelColumnProps {
  children?: ReactNode;
}

export const PanelColumn = ({ children }: PanelColumnProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-end',
        flex: 1,
        overflow: 'hidden',
        py: 1,
      }}
    >
      {children}
    </Box>
  );
};

interface PanelItemProps {
  title: ReactNode;
}

export const PanelItem: React.FC<PanelItemProps> = ({ title, children }) => {
  const theme = useTheme();
  const mdUp = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <Box
      sx={{
        position: 'relative',
        mb: 4,
        '&:not(:last-child)': {
          pr: 4,
          mr: 4,
        },
        ...(mdUp
          ? {
              '&:not(:last-child)::after': {
                content: '""',
                height: '32px',
                position: 'absolute',
                right: 4,
                top: 'calc(50% - 17px)',
                borderRight: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }
          : {}),
      }}
    >
      <Typography color="text.secondary">{title}</Typography>
      <PanelColumn>{children}</PanelColumn>
    </Box>
  );
};

export const ReserveConfiguration: React.FC<{ reserve: ComputedReserveData }> = () => {
  return (
    <Paper sx={{ py: '20px', px: '20px' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          flexWrap: 'wrap',
          mb: '36px',
        }}
      >
        <Typography variant="h3">
          <Trans>Reserve Overview</Trans>
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Box
          sx={{
            ml: '30px',
            mr: '50px',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: 'max-content',
          }}
        >
          <CircularProgress
            variant="determinate"
            color="success"
            sx={{ position: 'absolute', zIndex: 1, left: 0, top: 0, color: '#3AC170' }}
            value={100}
            size={120}
          />
          <CircularProgress
            variant="determinate"
            color="error"
            sx={{ position: 'relative', zIndex: 2, color: '#FE6060' }}
            value={75}
            size={120}
          />
          <img
            src={'/icons/tokens/eth.svg'}
            alt="token img"
            width={96}
            height={96}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
            }}
          />
        </Box>
        <Box sx={{ flex: 1 }}>
          <LabelList
            sx={{ mb: 6 }}
            arr={[
              {
                key: '1',
                label: (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 600,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '100%',
                        backgroundColor: '#3AC170',
                        mr: 2,
                      }}
                    />
                    Total Borrowed
                  </Box>
                ),
                value: (
                  <Box>
                    231,465,798
                    <Box component={'span'} sx={{ color: '#888' }}>
                      ($320,102,399)
                    </Box>
                  </Box>
                ),
              },
              {
                key: '2',
                label: (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 600,
                    }}
                  >
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '100%',
                        backgroundColor: '#FE6060',
                        mr: 2,
                      }}
                    />
                    Available Liquidity
                  </Box>
                ),
                value: (
                  <Box>
                    231,465,798
                    <Box component={'span'} sx={{ color: '#888' }}>
                      ($320,102,399)
                    </Box>
                  </Box>
                ),
              },
              {
                key: '3',
                label: (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 600,
                    }}
                  >
                    Maximum LTV
                    <NetAPYTooltip />
                  </Box>
                ),
                value: <Box>$638,192,190</Box>,
              },
              {
                key: '4',
                label: (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      fontWeight: 600,
                    }}
                  >
                    Used Colloteral
                    <NetAPYTooltip />
                  </Box>
                ),
                value: <Box>Yes</Box>,
              },
            ]}
          />
          <Box sx={{ display: 'flex', mb: 4 }}>
            <Card sx={{ flex: 1, mr: 5, backgroundColor: '#F8F8F8' }}>
              <CardHeader title="Deposits" sx={{ fontWeight: 700 }} />
              <Divider />
              <CardContent>
                <LabelList
                  arr={[
                    {
                      key: '1',
                      label: <Box sx={{ color: '#666' }}>Deposit APY</Box>,
                      value: <Box>1.51%</Box>,
                    },
                    {
                      key: '2',
                      label: <Box sx={{ color: '#666' }}>Past 30D Avg.</Box>,
                      value: <Box>-</Box>,
                    },
                  ]}
                />
              </CardContent>
            </Card>
            <Card sx={{ flex: 1, backgroundColor: '#F8F8F8' }}>
              <CardHeader title="Variable Borrowing" sx={{ fontWeight: 700 }} />
              <Divider />
              <CardContent>
                <LabelList
                  arr={[
                    {
                      key: '1',
                      label: <Box sx={{ color: '#666' }}>Borrow APY</Box>,
                      value: <Box>1.51%</Box>,
                    },
                    {
                      key: '2',
                      label: <Box sx={{ color: '#666' }}>Past 30D Avg.</Box>,
                      value: <Box>-</Box>,
                    },
                    {
                      key: '3',
                      label: <Box sx={{ color: '#666' }}>% over total</Box>,
                      value: <Box>100.00%</Box>,
                    },
                  ]}
                />
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export const LabelList = ({
  arr,
  ...rest
}: {
  arr: Array<{ key: string; label: string | ReactNode; value: ReactNode | string }>;
} & StackProps) => (
  <Stack {...rest} spacing={3} sx={{ color: '#111', ...(rest?.sx || {}) }}>
    {arr.map((item) => {
      return (
        <Box
          key={item.key}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {item.label}
          {item.value}
        </Box>
      );
    })}
  </Stack>
);

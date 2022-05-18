import { Box, Paper, TextField, Typography, Button } from '@mui/material';

import { LabelList } from '../../../pages/staking.staking';

export const ActionList = () => {
  return (
    <>
      <Typography fontWeight={600}>Buy FTM with GoledoFTM LP Tokens</Typography>
      <Typography color={'#666'} mt={2.5}>
        This can only be done once a day per address
      </Typography>
      <Paper sx={{ backgroundColor: '#F8F8F8', p: 4, mt: 5, borderRadius: 2 }}>
        <LabelList
          divider={null}
          spacing={2.5}
          arr={[
            {
              key: '1',
              label: <Typography fontWeight={600}>Current LP Token Price</Typography>,
              value: <Typography fontWeight={600}>$0.23</Typography>,
            },
            {
              key: '2',
              label: (
                <Typography fontWeight={600}>
                  The price Goledo Finance is offering per LP token
                </Typography>
              ),
              value: (
                <Typography fontWeight={600}>
                  $0.23{' '}
                  <Typography component={'span'} color="green">
                    +$0.02
                  </Typography>
                </Typography>
              ),
            },
          ]}
        />
      </Paper>
      <LabelList
        sx={{ mt: 7.5 }}
        divider={null}
        spacing={2.5}
        arr={[
          {
            key: '1',
            label: <Typography fontWeight={600}>Your Balance</Typography>,
            value: <Typography>100 GoledoFTM</Typography>,
          },
          {
            key: '2',
            label: <Typography color={'#666'}>Based on your locked Goledo, you can buy</Typography>,
            value: <Typography>100 FTM</Typography>,
          },
        ]}
      />

      <Box display={'flex'} marginTop={4} alignItems="center" justifyContent={'space-between'}>
        <Box display={'flex'} alignItems="center">
          <TextField
            id="Enter-Amount"
            label="Enter Amount"
            variant="outlined"
            size="small"
            sx={{ width: 380, height: 40 }}
          />
          <Typography ml={2.5} color="#666">
            = 0.00 GoledoFTM
          </Typography>
        </Box>
        <Box display={'flex'} alignItems="center">
          <Button
            // disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
            variant="contained"
            // onClick={() => openSupply(underlyingAsset)}
            sx={{ mr: 1.5, height: 40, width: 100 }}
          >
            Approve
          </Button>
          <Button
            sx={{ height: 40, width: 100 }}
            variant="outlined"
            disabled
            // component={Link}
            // href={ROUTES.reserveOverview(reserve.underlyingAsset, currentMarket)}
          >
            Buy FTM
          </Button>
        </Box>
      </Box>

      <Typography color={'#666'} mt={4}>
        The minimum buy amount is 1 FTM. This is currently 2.35 GoledoFTM.
      </Typography>
    </>
  );
};

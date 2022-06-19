import { Box, Paper, TextField, Typography, Button } from '@mui/material';

import { FormattedNumber } from 'src/components/primitives/FormattedNumber';
import { LabelList } from '../../../pages/staking.staking';

export const ActionList = () => {
  return (
    <>
      <Typography fontWeight={600}>Buy CFX with GoledoCFX LP Tokens</Typography>
      <Typography color={'#666'} mt={2.5}>
        This can only be done once a day per address
      </Typography>
      <Paper sx={{ backgroundColor: '#F8F8F8', p: 4, mt: 5, borderRadius: 2 }}>
        <LabelList
          divider={null}
          spacing={2.5}
          arr={[
            {
              label: <Typography fontWeight={600}>Current LP Token Price</Typography>,
              value: (
                <FormattedNumber
                  variant="main14"
                  symbol="usd"
                  value={0.21}
                  visibleDecimals={2}
                  symbolsColor="#111"
                />
              ),
            },
            {
              label: (
                <Typography fontWeight={600}>
                  The price Goledo Finance is offering per LP token
                </Typography>
              ),
              value: (
                <Typography fontWeight={600}>
                  <FormattedNumber
                    variant="main14"
                    symbol="usd"
                    value={0.21}
                    visibleDecimals={2}
                    symbolsColor="#111"
                  />{' '}
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
            label: <Typography fontWeight={600}>Your Balance</Typography>,
            value: (
              <FormattedNumber
                variant="description"
                symbol="GoledoCFX"
                value={61.9202}
                visibleDecimals={4}
                symbolsColor="#111"
              />
            ),
          },
          {
            label: <Typography color={'#666'}>Based on your locked Goledo, you can buy</Typography>,
            value: (
              <FormattedNumber
                variant="description"
                symbol="CFX"
                value={61.9202}
                visibleDecimals={4}
                symbolsColor="#111"
              />
            ),
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
            = 0.00 GoledoCFX
          </Typography>
        </Box>
        <Box display={'flex'} alignItems="center">
          <Button
            // disabled={!isActive || isFreezed || Number(walletBalance) <= 0}
            variant="contained"
            // onClick={() => openSupply(underlyingAsset)}
            sx={{ mr: 1.5, height: 40, width: 100, p: 0 }}
            size="large"
          >
            Approve
          </Button>
          <Button
            sx={{ height: 40, width: 100, p: 0 }}
            size="large"
            variant="outlined"
            disabled
            // component={Link}
            // href={ROUTES.reserveOverview(reserve.underlyingAsset, currentMarket)}
          >
            Buy CFX
          </Button>
        </Box>
      </Box>

      <Typography color={'#666'} mt={4}>
        The minimum buy amount is 1 CFX. This is currently 2.35 GoledoCFX.
      </Typography>
    </>
  );
};

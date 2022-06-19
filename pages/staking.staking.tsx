import { Trans } from '@lingui/macro';
import {
  Box,
  Paper,
  // useMediaQuery,
  // useTheme,
  Stack,
  Typography,
  Button,
  Grid,
  Divider,
  StackProps,
} from '@mui/material';
import { ReactNode } from 'react';
import { ContentContainer } from 'src/components/ContentContainer';
import { StakeModal } from 'src/components/transactions/Stake/StakeModal';
import { UnStakeModal } from 'src/components/transactions/UnStake/UnStakeModal';
// import { StakeDataProvider, useStakeData } from 'src/hooks/stake-data-provider/StakeDataProvider';
import { MainLayout } from 'src/layouts/MainLayout';
import { StakingHeader } from 'src/modules/staking/StakingHeader';
import { StakeTxBuilderProvider } from 'src/providers/StakeTxBuilderProvider';
import { VestList } from 'src/modules/staking/VestList1';
import { LocksList } from 'src/modules/staking/LocksList';
import { ActionList } from 'src/modules/staking/ActionList';
import { useModalContext } from 'src/hooks/useModal';
import { FormattedNumber } from 'src/components/primitives/FormattedNumber';

import BigNumber from 'bignumber.js';

import { ConnectWalletPaper } from '../src/components/ConnectWalletPaper';
import { useWeb3Context } from '../src/libs/hooks/useWeb3Context';
// TODO: need to update tooltip text
import { NetAPYTooltip } from 'src/components/infoTooltips/NetAPYTooltip';
import { useRewardData } from 'src/hooks/app-data-provider/useRewardData';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export default function Staking() {
  const { currentAccount, loading } = useWeb3Context();
  const { loading: rewardLoading, data: rewardData } = useRewardData();
  const { currentMarketData } = useProtocolDataContext();
  const { openStake, openUnstake } = useModalContext();

  // const { breakpoints } = useTheme();
  // const lg = useMediaQuery(breakpoints.up('lg'));
  const rewardPerSecond = rewardData
    ? new BigNumber(rewardData.chefData.rewardsPerSecond)
    : new BigNumber('0');
  const rewardPerDay = rewardPerSecond.multipliedBy(86400);
  const rewardPerWeek = rewardPerDay.multipliedBy(7);

  return (
    <>
      <StakingHeader loading={rewardLoading || loading} rewardData={rewardData} />

      <ContentContainer>
        {currentAccount ? (
          <Box sx={{ display: 'flex' }}>
            <Stack spacing={2.5} sx={{ width: '470px', mr: 5 }}>
              <Paper sx={{ p: 5 }}>
                <Title
                  img={'/icons/staking/shield.svg'}
                  title="Stake Goledo"
                  desc={
                    <Typography
                      sx={{ fontSize: 20, fontWeight: 700, color: 'rgba(58, 193, 112, 1)' }}
                    >
                      APR -%
                    </Typography>
                  }
                />
                <Typography sx={{ my: 4, color: '#666', fontSize: 14 }}>
                  Stake Goledo and earn platform fees with no lockup period.
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ height: 40 }}
                  disabled={!rewardData}
                  onClick={() => {
                    openStake(
                      'stake',
                      rewardData?.stakeData.token || currentMarketData.addresses.STAKE_TOKEN,
                      'GDO',
                      rewardData?.stakeUserData.walletBalance || '0'
                    );
                  }}
                >
                  Stake
                </Button>
              </Paper>
              <Paper sx={{ p: 5 }}>
                <Title
                  img={'/icons/staking/lock.svg'}
                  title="Lock Goledo"
                  desc={
                    <Typography
                      sx={{ fontSize: 20, fontWeight: 700, color: 'rgba(58, 193, 112, 1)' }}
                    >
                      APR -%
                    </Typography>
                  }
                />
                <Typography sx={{ my: 4, color: '#666', fontSize: 14 }}>
                  Lock Goldo and earn platform fees and penalty fees in unlocked Goledo.
                  <br />
                  <br />
                  Locked Goledo is subjext to a three month lock and will continue to earn fees
                  after the locks expire if you do not withdraw.
                </Typography>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ height: 40 }}
                  disabled={!rewardData}
                  onClick={() =>
                    openStake(
                      'lock',
                      rewardData?.stakeData.token || currentMarketData.addresses.STAKE_TOKEN,
                      'GDO',
                      rewardData?.stakeUserData.walletBalance || '0'
                    )
                  }
                >
                  Lock
                </Button>
              </Paper>

              <Paper sx={{ p: 5 }}>
                <Title img={'/icons/staking/bi.svg'} title="GDO/CFX LP" />
                <Box sx={{ my: 5 }}>
                  <LabelList
                    arr={[
                      {
                        key: '1',
                        label: <Typography sx={{ color: '#666' }}>Staking APR</Typography>,
                        value: (
                          <FormattedNumber
                            variant="description"
                            percent
                            value={0}
                            visibleDecimals={2}
                            symbolsColor="#111"
                          />
                        ),
                      },
                      {
                        key: '2',
                        label: <Typography sx={{ color: '#666' }}>LP Token Price</Typography>,
                        value: (
                          <FormattedNumber
                            variant="description"
                            symbol="usd"
                            value={0}
                            visibleDecimals={2}
                            symbolsColor="#111"
                          />
                        ),
                      },
                      {
                        key: '3',
                        label: (
                          <Box sx={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                            <Typography sx={{ color: '#666' }}>Total LP Tokens Staked</Typography>
                          </Box>
                        ),
                        value: (
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                            <FormattedNumber
                              variant="description"
                              value={rewardData?.chefUserData[0]?.totalSupply || '0'}
                              symbol="Goledo"
                              visibleDecimals={2}
                              symbolsColor="#111"
                            />
                            <FormattedNumber
                              variant="caption"
                              value={0}
                              symbol="usd"
                              compact={false}
                              visibleDecimals={2}
                              symbolsColor="#666"
                              sx={{ color: '#666' }}
                            />
                          </Box>
                        ),
                      },
                      {
                        key: '4',
                        label: (
                          <Box sx={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                            <Typography sx={{ color: '#666' }}>Total Rewards per day</Typography>
                            <NetAPYTooltip />
                          </Box>
                        ),
                        value: (
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                            <FormattedNumber
                              variant="description"
                              value={rewardPerDay.toString()}
                              symbol="Goledo"
                              visibleDecimals={2}
                              symbolsColor="#111"
                            />
                            <FormattedNumber
                              variant="caption"
                              value={0}
                              symbol="usd"
                              compact={false}
                              visibleDecimals={2}
                              symbolsColor="#666"
                              sx={{ color: '#666' }}
                            />
                          </Box>
                        ),
                      },
                      {
                        key: '5',
                        label: (
                          <Box sx={{ display: 'flex', alignItems: 'center', height: '20px' }}>
                            <Typography sx={{ color: '#666' }}>Total Rewards per week</Typography>
                            <NetAPYTooltip />
                          </Box>
                        ),
                        value: (
                          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
                            <FormattedNumber
                              variant="description"
                              value={rewardPerWeek.toString()}
                              symbol="Goledo"
                              visibleDecimals={2}
                              symbolsColor="#111"
                            />
                            <FormattedNumber
                              variant="caption"
                              value={0}
                              symbol="usd"
                              compact={false}
                              visibleDecimals={2}
                              symbolsColor="#666"
                              sx={{ color: '#666' }}
                            />
                          </Box>
                        ),
                      },
                    ]}
                  />
                </Box>

                <Grid spacing={2} container>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ height: 40 }}
                      onClick={() => openStake('stake', '', 'GDOCFX', '0')}
                    >
                      Stake
                    </Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ height: 40 }}
                      onClick={() => openUnstake('stake', '', 'GDOCFX', '0')}
                    >
                      UnStake
                    </Button>
                  </Grid>
                  {/*<Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ height: 40 }}
                      // onClick={() => openStakeRewardsClaim('aave')}
                    >
                      Vest
                    </Button>
                  </Grid>*/}
                </Grid>
              </Paper>
            </Stack>
            <Stack spacing={2.5} sx={{ flex: 1 }}>
              <Paper sx={{ p: 5 }}>
                <ActionList />
              </Paper>
              <Paper sx={{ p: 5 }}>
                <Title title="Goledo vest" />
                <VestList />
                <Typography variant="description">Total Goledo Vesting</Typography>
              </Paper>
              <Paper sx={{ p: 5 }}>
                <Title title="Goledo Locks" />
                <LocksList />
                <Typography variant="description">Total Goledo Locked</Typography>
              </Paper>
            </Stack>
          </Box>
        ) : (
          <ConnectWalletPaper
            description={<Trans>We couldn’t detect a wallet. Connect a wallet to stake.</Trans>}
            loading={loading}
          />
        )}
      </ContentContainer>
    </>
  );
}

const Title = ({ img, title, desc }: { img?: string; title: ReactNode; desc?: ReactNode }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Stack direction={'row'} spacing={2} sx={{ alignItems: 'center' }}>
      {img && <img src={img} alt="img" width={20} height={20} />}
      <Typography variant="main16">{title}</Typography>
    </Stack>
    {desc}
  </Box>
);

export const LabelList = ({
  arr,
  ...rest
}: {
  arr: Array<{ key: string; label: string | ReactNode; value: ReactNode | string }>;
} & StackProps) => (
  <Stack divider={<Divider />} spacing={3} {...rest} sx={{ color: '#111', ...(rest?.sx || {}) }}>
    {arr.map((item) => {
      return (
        <Box
          key={item.key}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            // alignItems: 'center',
          }}
        >
          {item.label}
          {item.value}
        </Box>
      );
    })}
  </Stack>
);

Staking.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <MainLayout>
      <StakeTxBuilderProvider>
        <>
          {/*<StakeDataProvider>*/}
          {page}
          {/** Modals */}
          <StakeModal />
          <UnStakeModal />
          {/** End of modals */}
          {/*</StakeDataProvider>*/}
        </>
      </StakeTxBuilderProvider>
    </MainLayout>
  );
};

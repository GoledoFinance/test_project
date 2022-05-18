import { Box, Paper, Stack, Typography } from '@mui/material';

import { MainLayout } from 'src/layouts/MainLayout';
import { MoreTopPanel } from 'src/modules/more/MoreTopPanel';
import { ActionList } from 'src/modules/more/ActionList';

import { ContentContainer } from '../src/components/ContentContainer';
import { LabelList } from './staking.staking';

export default function MorePage() {
  return (
    <>
      <MoreTopPanel />
      <ContentContainer>
        <Box sx={{ display: 'flex' }}>
          <Paper sx={{ flex: 1, p: 5 }}>
            <ActionList />
          </Paper>
          <Stack spacing={2.5} sx={{ width: '470px', ml: 5 }}>
            <Paper sx={{ p: 5 }}>
              <Box>
                <LabelList
                  arr={[
                    {
                      key: '1',
                      label: <Typography sx={{ fontWeight: 600 }}>Buyable FTM</Typography>,
                      value: (
                        <Stack spacing={1.5} alignItems="end">
                          <Typography sx={{ fontWeight: 600 }}>61.9202 FTM</Typography>
                          <Typography sx={{ color: '#666' }}>$920,001.01</Typography>
                        </Stack>
                      ),
                    },
                  ]}
                />
              </Box>
            </Paper>
            <Paper sx={{ p: 5 }}>
              <Box>
                <LabelList
                  arr={[
                    {
                      key: '1',
                      label: (
                        <Stack spacing={4}>
                          <Typography sx={{ fontWeight: 600 }}>
                            Goledo Finance Treasury Information
                          </Typography>
                          <Typography sx={{ color: '#666' }}>
                            Total share of GoledoFTM in treasury
                          </Typography>
                        </Stack>
                      ),
                      value: (
                        <Stack spacing={4}>
                          <Box height={22} />
                          <Typography sx={{ fontWeight: 600 }}>80%</Typography>
                        </Stack>
                      ),
                    },
                    {
                      key: '2',
                      label: <Typography sx={{ color: '#666' }}>GoledoFTM in treasury</Typography>,
                      value: (
                        <Stack spacing={1.5} alignItems="end">
                          <Typography>61.9202 GoledoFTM</Typography>
                          <Typography sx={{ color: '#666' }}>$36.23</Typography>
                          <Typography>61.9202 GoledoFTM</Typography>
                          <Typography sx={{ color: '#666' }}>$36.23</Typography>
                          <Typography>61.9202 GoledoFTM</Typography>
                          <Typography sx={{ color: '#666' }}>$36.23</Typography>
                        </Stack>
                      ),
                    },
                    {
                      key: '3',
                      label: <Typography sx={{ color: '#666' }}>Total FTM sold</Typography>,
                      value: (
                        <Stack spacing={1.5} alignItems="end">
                          <Typography>61.9202 FTM</Typography>
                          <Typography sx={{ color: '#666' }}>$36.23</Typography>
                        </Stack>
                      ),
                    },
                  ]}
                />
              </Box>
            </Paper>
          </Stack>
        </Box>
      </ContentContainer>
    </>
  );
}

MorePage.getLayout = function getLayout(page: React.ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};

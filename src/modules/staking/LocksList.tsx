import { Trans } from '@lingui/macro';
import { useMediaQuery } from '@mui/material';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListHeaderTitle } from '../../components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from '../../components/lists/ListHeaderWrapper';
import { VestListItem } from './VestListItem';
import { VestListItemLoader } from './VestListItemLoader';
import { DashboardContentNoData } from 'src/modules/dashboard/DashboardContentNoData';
import { useRewardData } from 'src/hooks/app-data-provider/useRewardData';

export function LocksList() {
  const { loading } = useAppDataContext();
  const { loading: rewardLoading, data: rewardData } = useRewardData();

  const isTableChangedToCards = useMediaQuery('(max-width:1125px)');

  const header = [
    {
      title: <Trans>Locked</Trans>,
    },
    {
      title: <Trans>Expiry</Trans>,
    },
  ];

  return (
    <>
      {!isTableChangedToCards && (
        <ListHeaderWrapper px={0} sx={{ borderWidth: 0 }}>
          {header.map((col, index) => (
            <ListColumn key={index}>
              <ListHeaderTitle>{col.title}</ListHeaderTitle>
            </ListColumn>
          ))}
        </ListHeaderWrapper>
      )}

      {loading || rewardLoading || !rewardData ? (
        isTableChangedToCards ? (
          <></>
        ) : (
          <>
            <VestListItemLoader />
            <VestListItemLoader />
          </>
        )
      ) : rewardData.stakeUserData.lockedBalances.length > 0 ? (
        rewardData.stakeUserData.lockedBalances.map(({ amount, unlockTime }, index) =>
          isTableChangedToCards ? null : (
            <VestListItem amount={amount} expire={unlockTime} key={index} />
          )
        )
      ) : (
        <DashboardContentNoData text={<Trans>No Data</Trans>} />
      )}
    </>
  );
}

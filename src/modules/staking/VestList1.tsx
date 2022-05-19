import { Trans } from '@lingui/macro';
import { useMediaQuery } from '@mui/material';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListHeaderTitle } from '../../components/lists/ListHeaderTitle';
import { ListHeaderWrapper } from '../../components/lists/ListHeaderWrapper';
import { VestListItem } from './VestListItem';
import { VestListItemLoader } from './VestListItemLoader';
import { DashboardContentNoData } from 'src/modules/dashboard/DashboardContentNoData';

export function VestList() {
  const { loading } = useAppDataContext();

  const isTableChangedToCards = useMediaQuery('(max-width:1125px)');

  const filteredData = [{ id: 1 }];

  const header = [
    {
      title: <Trans>Vesting</Trans>,
    },
    {
      title: <Trans>Expiry</Trans>,
    },
    {
      title: <Trans>Total Goledo Vesiting</Trans>,
    },
    {
      title: <Trans>Total Value</Trans>,
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

      {loading ? (
        isTableChangedToCards ? (
          <></>
        ) : (
          <>
            <VestListItemLoader />
            <VestListItemLoader />
          </>
        )
      ) : filteredData?.length > 0 ? (
        filteredData.map((reserve) =>
          isTableChangedToCards ? null : <VestListItem key={reserve.id} />
        )
      ) : (
        <DashboardContentNoData text={<Trans>No Data</Trans>} />
      )}
    </>
  );
}

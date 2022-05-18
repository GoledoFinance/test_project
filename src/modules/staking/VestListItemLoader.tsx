import { Skeleton } from '@mui/material';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';

export const VestListItemLoader = () => {
  return (
    <ListItem px={6} minHeight={76}>
      <ListColumn>
        <Skeleton width={70} height={24} />
      </ListColumn>

      <ListColumn>
        <Skeleton width={100} height={24} />
      </ListColumn>

      <ListColumn>
        <Skeleton width={70} height={24} />
      </ListColumn>

      <ListColumn>
        <Skeleton width={70} height={24} />
      </ListColumn>
    </ListItem>
  );
};

import { Typography } from '@mui/material';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';

export const VestListItem = ({ amount, expire }: { amount: string; expire: number }) => {
  return (
    <ListItem px={0} minHeight={36} sx={{ cursor: 'pointer' }} button>
      <ListColumn>
        <FormattedNumber
          variant="description"
          value={amount}
          symbol="GDO"
          visibleDecimals={2}
          symbolsColor="palette.text"
        />
      </ListColumn>

      <ListColumn>
        <Typography>{new Date(expire * 1000).toUTCString()}</Typography>
      </ListColumn>
    </ListItem>
  );
};

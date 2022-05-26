import { Typography } from '@mui/material';
import dayjs from 'dayjs';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';

export const VestListItem = () => {
  return (
    <ListItem px={0} minHeight={36} sx={{ cursor: 'pointer' }} button>
      <ListColumn>
        <FormattedNumber
          variant="description"
          value={9.8}
          symbol="FTM"
          visibleDecimals={2}
          symbolsColor="palette.text"
        />
      </ListColumn>

      <ListColumn>
        <Typography>{dayjs(Date.now()).format('dddd MMM DD, YYYY hh:mmA')}</Typography>
      </ListColumn>

      <ListColumn>
        <FormattedNumber compact value={0.1} variant="main16" />
      </ListColumn>

      <ListColumn>
        <FormattedNumber compact value={0.0001} variant="main16" />
      </ListColumn>
    </ListItem>
  );
};

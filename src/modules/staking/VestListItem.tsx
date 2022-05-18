import { Typography } from '@mui/material';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';

export const VestListItem = () => {
  return (
    <ListItem px={0} minHeight={36} sx={{ cursor: 'pointer' }} button>
      <ListColumn>
        <Typography>9.80 FTM</Typography>
      </ListColumn>

      <ListColumn>
        <Typography>Monday Jun 14, 2022 11:12PM</Typography>
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

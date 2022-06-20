import { Box, Typography } from '@mui/material';

import { ListColumn } from '../../components/lists/ListColumn';
import { ListItem } from '../../components/lists/ListItem';
import { FormattedNumber } from '../../components/primitives/FormattedNumber';

export const VestListItem = ({ amount, expire }: { amount: string; expire: number }) => {
  return (
    <ListItem px={0} minHeight={36} sx={{ cursor: 'pointer' }} button>
      <ListColumn>
        <Box display={'flex'} alignItems="center">
          <img src={'/icons/tokens/gol.svg'} alt="goledo" width={15} height={15} />
          <Typography marginLeft={1}>
            <FormattedNumber
              variant="description"
              value={amount}
              symbol="Goledo"
              visibleDecimals={2}
              symbolsColor="palette.text"
            />
          </Typography>
        </Box>
      </ListColumn>

      <ListColumn>
        <Typography>{new Date(expire * 1000).toUTCString()}</Typography>
      </ListColumn>
    </ListItem>
  );
};

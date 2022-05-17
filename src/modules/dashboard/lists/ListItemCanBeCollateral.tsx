import { ExclamationCircleIcon } from '@heroicons/react/outline';
import { Box, SvgIcon } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { NoData } from '../../../components/primitives/NoData';
import { ListItemIsolationBadge } from './ListItemIsolationBadge';

interface ListItemCanBeCollateralProps {
  isIsolated: boolean;
  usageAsCollateralEnabled: boolean;
}

export const ListItemCanBeCollateral = ({
  isIsolated,
  usageAsCollateralEnabled,
}: ListItemCanBeCollateralProps) => {
  const CollateralStates = () => {
    if (usageAsCollateralEnabled && !isIsolated) {
      return (
        <SvgIcon sx={{ color: 'success.main', fontSize: { xs: '14px', xsm: '14px' } }}>
          <CheckCircleOutlineIcon />
        </SvgIcon>
      );
    } else if (usageAsCollateralEnabled && isIsolated) {
      return (
        <SvgIcon sx={{ color: 'warning.main', fontSize: { xs: '14px', xsm: '14px' } }}>
          <ExclamationCircleIcon />
        </SvgIcon>
      );
    } else {
      return <NoData variant="main14" color="text.secondary" />;
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {!isIsolated ? (
        <CollateralStates />
      ) : (
        <ListItemIsolationBadge>
          <CollateralStates />
        </ListItemIsolationBadge>
      )}
    </Box>
  );
};

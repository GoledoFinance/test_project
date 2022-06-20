import { Trans } from '@lingui/macro';
import { Button } from '@mui/material';
import {
  ComputedUserReserveData,
  ExtendedFormattedUser,
  ReserveIncentiveData,
} from 'src/hooks/app-data-provider/useAppDataProvider';
import { useModalContext } from 'src/hooks/useModal';

import { ListColumn } from '../../../../components/lists/ListColumn';
import { useProtocolDataContext } from '../../../../hooks/useProtocolDataContext';
// import { isFeatureEnabled } from '../../../../utils/marketsAndNetworksConfig';
import { ListAPRColumn } from '../ListAPRColumn';
import { ListButtonsColumn } from '../ListButtonsColumn';
import { ListItemUsedAsCollateral } from '../ListItemUsedAsCollateral';
import { ListItemWrapper } from '../ListItemWrapper';
import { ListValueColumn } from '../ListValueColumn';

export const SuppliedPositionsListItem = ({
  reserve,
  underlyingBalance,
  underlyingBalanceUSD,
  usageAsCollateralEnabledOnUser,
  underlyingAsset,
  reservesIncentives,
}: ComputedUserReserveData & {
  user: ExtendedFormattedUser;
  reservesIncentives: ReserveIncentiveData[];
}) => {
  const { isActive } = reserve;
  const { currentMarket } = useProtocolDataContext();
  const { openWithdraw, openCollateralChange } = useModalContext();
  const incentives = reservesIncentives.find(
    (x) => x.tokenAddress.toLowerCase() === reserve.aTokenAddress.toLowerCase()
  );

  const canBeEnabledAsCollateral = reserve.usageAsCollateralEnabled;

  return (
    <ListItemWrapper
      symbol={reserve.symbol}
      iconSymbol={reserve.iconSymbol}
      name={reserve.name}
      detailsAddress={underlyingAsset}
      currentMarket={currentMarket}
      data-cy={`dashboardSuppliedListItem_${reserve.symbol.toUpperCase()}_${
        canBeEnabledAsCollateral && usageAsCollateralEnabledOnUser ? 'Collateral' : 'NoCollateral'
      }`}
    >
      <ListValueColumn
        symbol={reserve.iconSymbol}
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />

      <ListAPRColumn
        value={Number(reserve.supplyAPY)}
        incentives={incentives}
        symbol={reserve.symbol}
      />

      <ListColumn>
        <ListItemUsedAsCollateral
          isIsolated={false}
          usageAsCollateralEnabledOnUser={usageAsCollateralEnabledOnUser}
          canBeEnabledAsCollateral={canBeEnabledAsCollateral}
          onToggleSwitch={() => openCollateralChange(underlyingAsset)}
          data-cy={`collateralStatus`}
        />
      </ListColumn>

      <ListButtonsColumn>
        <Button
          sx={{ height: 32 }}
          disabled={!isActive}
          variant="contained"
          onClick={() => openWithdraw(underlyingAsset)}
          fullWidth
        >
          <Trans>Withdraw</Trans>
        </Button>

        {/*<Button
          sx={{ height: 32 }}
          disabled={!isActive || isFrozen}
          variant="outlined"
          // onClick={() => openSwap(underlyingAsset)}
          data-cy={`swapButton`}
        >
          <Trans>Swap</Trans>
        </Button>*/}
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};

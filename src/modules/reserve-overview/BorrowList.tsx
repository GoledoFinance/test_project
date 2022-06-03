import { Trans } from '@lingui/macro';
import { useMediaQuery, useTheme, Paper, Button } from '@mui/material';
import { fetchIconSymbolAndName } from 'src/ui-config/reservePatches';

import { useModalContext } from 'src/hooks/useModal';
import { useAppDataContext } from 'src/hooks/app-data-provider/useAppDataProvider';
import { DashboardContentNoData } from 'src/modules/dashboard/DashboardContentNoData';
import { ListHeader } from 'src/modules/dashboard/lists/ListHeader';
import { ListItemWrapper } from 'src/modules/dashboard/lists/ListItemWrapper';
import { ListValueColumn } from 'src/modules/dashboard/lists/ListValueColumn';
import { ListButtonsColumn } from 'src/modules/dashboard/lists/ListButtonsColumn';

const ListItem = ({
  symbol,
  iconSymbol,
  name,
  underlyingAsset,
  underlyingBalance,
  underlyingBalanceUSD,
  borrowRateMode,
}: {
  symbol: string;
  iconSymbol: string;
  name: string;
  underlyingAsset: string;
  underlyingBalance: string | number;
  underlyingBalanceUSD: string | number;
  borrowRateMode: string;
}) => {
  const { openBorrow, openRepay } = useModalContext();
  return (
    <ListItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      detailsAddress={underlyingAsset}
      data-cy={`dashboardRewardsListItem_${symbol.toUpperCase()}`}
    >
      <ListValueColumn
        symbol={iconSymbol}
        value={Number(underlyingBalance)}
        subValue={Number(underlyingBalanceUSD)}
        disabled={Number(underlyingBalance) === 0}
      />
      <ListButtonsColumn>
        <Button
          sx={{ height: 26 }}
          //   disabled={borrowButtonDisable}
          variant="contained"
          onClick={() => openBorrow(underlyingAsset)}
        >
          <Trans>Borrow</Trans>
        </Button>
        <Button
          sx={{ height: 26 }}
          variant="outlined"
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onClick={() => openRepay(underlyingAsset, borrowRateMode as any)}
        >
          <Trans>Repay</Trans>
        </Button>
      </ListButtonsColumn>
    </ListItemWrapper>
  );
};

export const BorrowList = () => {
  const { loading } = useAppDataContext();
  //   const { currentNetworkConfig } = useProtocolDataContext();
  const theme = useTheme();
  const downToXSM = useMediaQuery(theme.breakpoints.down('xsm'));

  const data = [
    {
      underlyingAsset: '0xe22da380ee6b445bb8273c81944adeb6e8450422',
      underlyingBalance: 20.04,
      underlyingBalanceUSD: 17.19,
      ...fetchIconSymbolAndName({
        symbol: 'ETH',
        underlyingAsset: '0xe22da380ee6b445bb8273c81944adeb6e8450422',
      }),
      supplyAPR: 0.0111,
      borrowRateMode: 'Stable',
    },
  ];

  const head = [<Trans key="Borrowed">Borrowed</Trans>];

  if (loading) return null;

  return (
    <Paper
      sx={(theme) => ({
        border: `1px solid ${theme.palette.divider}`,
        overflow: 'hidden',
      })}
    >
      {data?.length > 0 ? (
        <>
          {!downToXSM && (
            <ListHeader
              sx={{ borderBottom: 0 }}
              assetsTitle={<Trans>Your Borrows</Trans>}
              head={head}
            />
          )}
          {data.map((item) =>
            downToXSM ? null : ( //   <SuppliedPositionsListMobileItem {...item} user={user} key={item.underlyingAsset} />
              <ListItem {...item} key={item.underlyingAsset} />
            )
          )}
        </>
      ) : (
        <DashboardContentNoData text={<Trans>Nothing supplied yet</Trans>} />
      )}
    </Paper>
  );
};

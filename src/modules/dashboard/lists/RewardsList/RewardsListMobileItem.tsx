import { Trans } from '@lingui/macro';
import { Box, Button } from '@mui/material';

import { IncentivesCard } from '../../../../components/incentives/IncentivesCard';
import { Row } from '../../../../components/primitives/Row';
import { useModalContext, ModalType } from '../../../../hooks/useModal';
import { ListMobileItemWrapper } from '../ListMobileItemWrapper';
import { ListValueRow } from '../ListValueRow';
import { RewardsItem } from './types';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { useProtocolDataContext } from '../../../../hooks/useProtocolDataContext';
import { ListValueColumn } from '../ListValueColumn';
import { ListTopInfoItem } from '../../../dashboard/lists/ListTopInfoItem';

export const RewardsListMobileItem = ({
  iconSymbol,
  symbol,
  name,
  tokens,
  underlyingAsset,
  earned,
  lockedBalance,
  stakedBalance,
  stakingContract,
}: RewardsItem) => {
  const { loading } = useWeb3Context();
  const { openVestOrClaim } = useModalContext();
  const { currentMarket } = useProtocolDataContext();

  return (
    <ListMobileItemWrapper
      symbol={symbol}
      iconSymbol={iconSymbol}
      name={name}
      underlyingAsset={underlyingAsset}
      data-cy={`dashboardRewardsListItem_${symbol.toUpperCase()}`}
      currentMarket={currentMarket}
    >
      <ListValueRow
        title={<Trans>Earned</Trans>}
        value={earned}
        subValue={'0'}
        disabled={earned === '0'}
      />

      <Row caption={<Trans>APY</Trans>} align="flex-start" captionVariant="description" mb={2}>
        <IncentivesCard value={0} symbol={symbol} variant="secondary14" />
      </Row>

      <Row
        caption={<Trans>Your staked balance</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <Box>
          <ListValueColumn
            align="right"
            symbol={iconSymbol}
            value={stakedBalance ?? '0'}
            subValue={'0'}
            disabled={stakedBalance === undefined || stakedBalance == '0'}
            capsComponent={
              <Box sx={{ ml: 2.5 }}>
                <ListTopInfoItem
                  size="small"
                  title={<Trans>APR</Trans>}
                  value={0}
                  percent
                  // tooltip={<TotalSupplyAPYTooltip />}
                />
              </Box>
            }
          />
        </Box>
      </Row>

      <Row
        caption={<Trans>Your locked balance</Trans>}
        align="flex-start"
        captionVariant="description"
        mb={2}
      >
        <Box>
          <ListValueColumn
            align="right"
            symbol={iconSymbol}
            value={lockedBalance ?? '0'}
            subValue={'0'}
            disabled={lockedBalance === undefined || lockedBalance == '0'}
            capsComponent={
              <Box sx={{ ml: 2.5 }}>
                <ListTopInfoItem
                  size="small"
                  title={<Trans>APR</Trans>}
                  value={0}
                  percent
                  // tooltip={<TotalSupplyAPYTooltip />}
                />
              </Box>
            }
          />
        </Box>
      </Row>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mt: 5 }}>
        <Button
          sx={{ height: 32 }}
          variant="contained"
          disabled={loading || earned === '0'}
          onClick={() => openVestOrClaim(ModalType.GoledoVesting, earned, tokens, stakingContract)}
          fullWidth
        >
          <Trans>Vest</Trans>
        </Button>
      </Box>
    </ListMobileItemWrapper>
  );
};

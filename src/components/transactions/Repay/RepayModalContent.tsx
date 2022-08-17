import { Button, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import BigNumber from 'bignumber.js';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { RepayAsset } from './RepayModal';
import { valueToBigNumber } from '@goledo-sdk/math-utils';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';
import { AssetInput } from '../AssetInput';
import { Trans } from '@lingui/macro';
import { getNetworkConfig } from 'src/utils/marketsAndNetworksConfig';

export const RepayModalContent = ({
  poolReserve,
  userReserve,
  onSubmit,
  tokenBalance,
  nativeBalance,
  onAmountChange,
  onRepayTokenChanged,
  amount,
}: ModalWrapperProps & {
  onSubmit: () => Promise<void>;
  onAmountChange: (v?: string) => Promise<void>;
  amount?: string;
  onRepayTokenChanged: (v: RepayAsset) => Promise<void>;
}) => {
  const { currentChainId, currentNetworkConfig } = useProtocolDataContext();
  const [isMaxSelected, setIsMaxSelected] = useState(false);
  const amountRef = useRef<string>();
  const [tokenToRepayWith, setTokenToRepayWith] = useState<RepayAsset>({
    address: poolReserve.underlyingAsset,
    symbol: poolReserve.symbol,
    iconSymbol: poolReserve.iconSymbol,
    balance: tokenBalance,
  });

  const networkConfig = getNetworkConfig(currentChainId);

  const amountIntEth = new BigNumber(amount || '0').multipliedBy(poolReserve.formattedPriceInETH);

  const debt = userReserve?.variableBorrows || '0';
  const safeAmountToRepayAll = valueToBigNumber(debt).multipliedBy('1.0025');

  const assets: RepayAsset[] = [];
  if (poolReserve.symbol === networkConfig.wrappedBaseAssetSymbol) {
    // we substract a bit so user can still pay for the tx
    const nativeTokenWalletBalance = valueToBigNumber(nativeBalance).minus('0.004');
    const maxNativeToken = BigNumber.max(
      nativeTokenWalletBalance,
      BigNumber.min(nativeTokenWalletBalance, debt)
    );
    assets.push({
      address: API_ETH_MOCK_ADDRESS.toLowerCase(),
      symbol: networkConfig.baseAssetSymbol,
      balance: maxNativeToken.toString(10),
    });
  }
  // push reserve asset
  const minReserveTokenRepay = BigNumber.min(valueToBigNumber(tokenBalance), debt);
  const maxReserveTokenForRepay = BigNumber.max(minReserveTokenRepay, tokenBalance);
  assets.push({
    address: poolReserve.underlyingAsset,
    symbol: poolReserve.symbol,
    iconSymbol: poolReserve.iconSymbol,
    balance: maxReserveTokenForRepay.toString(10),
  });

  // calculate max amount abailable to repay
  const normalizedWalletBalance = valueToBigNumber(tokenToRepayWith.balance).minus(
    userReserve?.reserve.symbol.toUpperCase() === currentNetworkConfig.baseAssetSymbol
      ? '0.004'
      : '0'
  );
  const maxAmountToRepay = BigNumber.min(normalizedWalletBalance, debt);

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    onRepayTokenChanged(tokenToRepayWith);
    setIsMaxSelected(maxSelected);
    amountRef.current = maxSelected ? maxAmountToRepay.toString(10) : value;
    onAmountChange(maxSelected ? maxAmountToRepay.toString(10) : value);
    if (maxSelected && maxAmountToRepay.eq(debt)) {
      if (tokenToRepayWith.address === API_ETH_MOCK_ADDRESS.toLowerCase()) {
        // for native token and synthetix (only mainnet) we can't send -1 as
        // contract does not accept max unit256
        onAmountChange(safeAmountToRepayAll.toString(10));
      } else {
        onAmountChange(
          safeAmountToRepayAll.lt(normalizedWalletBalance)
            ? safeAmountToRepayAll.toString(10)
            : maxAmountToRepay.toString(10)
        );
      }
    }
  };

  // debt remaining after repay
  const amountAfterRepay = valueToBigNumber(debt)
    .minus(amount || '0')
    .toString(10);
  const displayAmountAfterRepay = BigNumber.min(amountAfterRepay, maxAmountToRepay);
  const displayAmountAfterRepayInETH = displayAmountAfterRepay.multipliedBy(
    poolReserve.formattedPriceInETH
  );
  const maxRepayWithDustRemaining = isMaxSelected && displayAmountAfterRepayInETH.toNumber() > 0;

  return (
    <>
      <AssetInput
        inputTitle={'How much do you want to repay?'}
        value={amount || '0'}
        onChange={handleChange}
        usdValue={amountIntEth.toString(10)}
        symbol={tokenToRepayWith.symbol}
        assets={assets}
        onSelect={(v) => {
          setTokenToRepayWith(v);
          onRepayTokenChanged(v);
        }}
        isMaxSelected={isMaxSelected}
        maxValue={maxAmountToRepay.toString(10)}
      />

      {maxRepayWithDustRemaining && (
        <Typography color="warning.main" variant="helperText">
          <Trans>
            You don’t have enough funds in your wallet to repay the full amount. If you proceed to
            repay with your current amount of funds, you will still have a small borrowing position
            in your dashboard.
          </Trans>
        </Typography>
      )}

      <Button
        variant="contained"
        size="large"
        fullWidth
        sx={{ mt: 10, height: 40 }}
        onClick={onSubmit}
      >
        Continue
      </Button>
    </>
  );
};

import { Button } from '@mui/material';
import { useRef, useState } from 'react';
import BigNumber from 'bignumber.js';

import { ModalWrapperProps } from '../FlowCommons/ModalWrapper';
import { API_ETH_MOCK_ADDRESS } from '@goledo-sdk/contract-helpers';
import { getMaxAmountAvailableToSupply } from 'src/utils/getMaxAmountAvailableToSupply';
import { AssetInput } from '../AssetInput';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { CapType } from 'src/components/caps/helper';

export const SupplyModalContent = ({
  underlyingAsset,
  poolReserve,
  nativeBalance,
  tokenBalance,
  onSubmit,
  onAmountChange,
  amount,
}: ModalWrapperProps & {
  onSubmit: () => Promise<void>;
  onAmountChange: (v?: string) => Promise<void>;
  amount?: string;
}) => {
  const { currentNetworkConfig } = useProtocolDataContext();
  const [isMaxSelected, setIsMaxSelected] = useState(false);

  const amountRef = useRef<string>();
  const supplyUnWrapped = underlyingAsset.toLowerCase() === API_ETH_MOCK_ADDRESS.toLowerCase();
  const walletBalance = supplyUnWrapped ? nativeBalance : tokenBalance;
  const maxAmountToSupply = getMaxAmountAvailableToSupply(
    walletBalance,
    poolReserve,
    underlyingAsset
  );
  // Calculation of future HF
  const amountIntEth = new BigNumber(amount || '0').multipliedBy(poolReserve.formattedPriceInETH);

  const handleChange = (value: string) => {
    const maxSelected = value === '-1';
    if (!maxSelected && maxAmountToSupply.lt(new BigNumber(value))) {
      value = maxAmountToSupply.toString(10);
    }
    amountRef.current = maxSelected ? maxAmountToSupply.toString(10) : value;
    setIsMaxSelected(maxSelected);
    onAmountChange(amountRef.current);
  };

  return (
    <>
      <AssetInput
        inputTitle={'Available to supply'}
        value={amount || '0'}
        onChange={handleChange}
        usdValue={amountIntEth.toString(10)}
        symbol={supplyUnWrapped ? currentNetworkConfig.baseAssetSymbol : poolReserve.symbol}
        assets={[
          {
            balance: maxAmountToSupply.toString(10),
            symbol: supplyUnWrapped ? currentNetworkConfig.baseAssetSymbol : poolReserve.symbol,
            iconSymbol: supplyUnWrapped
              ? currentNetworkConfig.baseAssetSymbol
              : poolReserve.iconSymbol,
          },
        ]}
        capType={CapType.supplyCap}
        isMaxSelected={isMaxSelected}
        disabled={false}
        maxValue={maxAmountToSupply.toString(10)}
      />
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

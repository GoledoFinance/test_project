import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';

import { useConnectionStatusContext } from '../useConnectionStatusContext';
import { useModalContext } from '../useModal';
import { useProtocolDataContext } from '../useProtocolDataContext';
import { useRewardDataCached } from './useRewardDataCached';
import { useRewardDataRPC } from './useRewardDataRPC';

export const useRewardData = () => {
  const { currentAccount } = useWeb3Context();
  const { mainTxState } = useModalContext();
  const { currentMarketData, currentChainId, currentMarket } = useProtocolDataContext();
  const { isRPCActive } = useConnectionStatusContext();

  const rpcMode =
    isRPCActive || !currentMarketData.cachingWSServerUrl || !currentMarketData.cachingServerUrl;

  const txLoading = mainTxState.loading === true;

  const { loading: cachedDataLoading } = useRewardDataCached(
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentChainId,
    currentMarket,
    currentAccount,
    rpcMode || mainTxState.loading
  );

  const {
    error: rpcDataError,
    loading: rpcDataLoading,
    refresh,
  } = useRewardDataRPC(
    currentMarketData.addresses.INCENTIVE_DATA_PROVIDER,
    currentMarketData.addresses.LENDING_POOL_ADDRESS_PROVIDER,
    currentChainId,
    !rpcMode || txLoading,
    currentAccount
  );

  if (rpcMode) {
    return {
      loading: rpcDataLoading,
      error: rpcDataError,
      refresh,
    };
  }

  return {
    loading: cachedDataLoading,
  };
};

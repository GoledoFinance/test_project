import { IncentiveDataHumanized, IncentiveDataProvider } from '@goledo-sdk/contract-helpers';
import { useState } from 'react';
import { useWeb3Context } from 'src/libs/hooks/useWeb3Context';
import { getProvider } from 'src/utils/marketsAndNetworksConfig';

import { useConnectionStatusContext } from '../useConnectionStatusContext';
import { useModalContext } from '../useModal';
import { usePolling } from '../usePolling';
import { useProtocolDataContext } from '../useProtocolDataContext';

const POLLING_INTERVAL = 30 * 1000;

export const useRewardData = () => {
  const { currentAccount } = useWeb3Context();
  const { mainTxState } = useModalContext();
  const { currentMarketData, currentChainId } = useProtocolDataContext();
  const { isRPCActive } = useConnectionStatusContext();
  const { connected } = useWeb3Context();

  const [loadingRewardData, setLoadingRewardData] = useState<boolean>(true);
  const [errorRewardData, setErrorRewardData] = useState<boolean>(false);
  const [data, setData] = useState<IncentiveDataHumanized>();

  const rpcMode =
    isRPCActive || !currentMarketData.cachingWSServerUrl || !currentMarketData.cachingServerUrl;

  const txLoading = mainTxState.loading === true;

  const fetchRewardData = async () => {
    const provider = getProvider(currentChainId);

    try {
      setLoadingRewardData(true);
      const incentiveDataProviderContract = new IncentiveDataProvider({
        incentiveDataProviderAddress: currentMarketData.addresses.INCENTIVE_DATA_PROVIDER,
        provider,
        chainId: currentChainId,
      });
      const reservesResponse = await incentiveDataProviderContract.getUserIncentiveHumanized({
        user: currentAccount,
      });
      setData(reservesResponse);
      setErrorRewardData(false);
    } catch (e) {
      console.log('e', e);
      setErrorRewardData(e.message);
    }
    setLoadingRewardData(false);
  };

  usePolling(fetchRewardData, POLLING_INTERVAL, !rpcMode || txLoading, [
    connected,
    currentChainId,
    rpcMode,
    txLoading,
  ]);

  return {
    loading: loadingRewardData,
    error: errorRewardData,
    data,
  };
};

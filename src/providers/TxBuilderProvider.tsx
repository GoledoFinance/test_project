import {
  IncentivesController,
  IncentivesControllerInterface,
  LendingPool,
  MasterChef,
  MasterChefInterface,
  MultiFeeDistribution,
  MultiFeeDistributionInterface,
} from '@goledo-sdk/contract-helpers';
import React, { ReactElement } from 'react';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';
import { TxBuilderContext } from 'src/hooks/useTxBuilder';

export interface TxBuilderContextInterface {
  lendingPool: LendingPool;
  masterChef: MasterChefInterface;
  incentivesController: IncentivesControllerInterface;
  staking: MultiFeeDistributionInterface;
}

export const TxBuilderProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { currentMarketData, jsonRpcProvider } = useProtocolDataContext();

  const lendingPool = new LendingPool(jsonRpcProvider, {
    LENDING_POOL: currentMarketData.addresses.LENDING_POOL,
    REPAY_WITH_COLLATERAL_ADAPTER: currentMarketData.addresses.REPAY_WITH_COLLATERAL_ADAPTER,
    SWAP_COLLATERAL_ADAPTER: currentMarketData.addresses.SWAP_COLLATERAL_ADAPTER,
    WETH_GATEWAY: currentMarketData.addresses.WETH_GATEWAY,
  });

  const staking = new MultiFeeDistribution(jsonRpcProvider);
  const masterChef: MasterChefInterface = new MasterChef(jsonRpcProvider);
  const incentivesController: IncentivesControllerInterface = new IncentivesController(
    jsonRpcProvider
  );

  return (
    <TxBuilderContext.Provider value={{ lendingPool, masterChef, incentivesController, staking }}>
      {children}
    </TxBuilderContext.Provider>
  );
};

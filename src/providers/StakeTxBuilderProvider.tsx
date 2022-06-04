import {
  IncentivesController,
  IncentivesControllerInterface,
  MasterChef,
  MasterChefInterface,
  MultiFeeDistribution,
  MultiFeeDistributionInterface,
} from '@goledo-sdk/contract-helpers';
import React, { ReactElement } from 'react';
import { useProtocolDataContext } from 'src/hooks/useProtocolDataContext';

export interface StakeTxBuilderContextInterface {
  staking: MultiFeeDistributionInterface;
  masterChef: MasterChefInterface;
  incentivesController: IncentivesControllerInterface;
}
export const StakeTxBuilderContext = React.createContext({} as StakeTxBuilderContextInterface);

export const StakeTxBuilderProvider: React.FC<{ children: ReactElement }> = ({ children }) => {
  const { jsonRpcProvider } = useProtocolDataContext();

  const staking = new MultiFeeDistribution(jsonRpcProvider);
  const masterChef: MasterChefInterface = new MasterChef(jsonRpcProvider);
  const incentivesController: IncentivesControllerInterface = new IncentivesController(
    jsonRpcProvider
  );

  return (
    <StakeTxBuilderContext.Provider value={{ staking, masterChef, incentivesController }}>
      {children}
    </StakeTxBuilderContext.Provider>
  );
};

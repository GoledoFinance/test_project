import {
  IncentivesControllerInterface,
  MasterChefInterface,
  LendingPool,
  MultiFeeDistributionInterface,
} from '@goledo-sdk/contract-helpers';
import React, { useContext } from 'react';

export interface TxBuilderContextInterface {
  lendingPool: LendingPool;
  masterChef: MasterChefInterface;
  incentivesController: IncentivesControllerInterface;
  staking: MultiFeeDistributionInterface;
}

export const TxBuilderContext = React.createContext({} as TxBuilderContextInterface);
export const useTxBuilderContext = () => useContext(TxBuilderContext);

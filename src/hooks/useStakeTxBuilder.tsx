import { useContext } from 'react';
import {
  StakeTxBuilderContext,
  StakeTxBuilderContextInterface,
} from 'src/providers/StakeTxBuilderProvider';

export const useStakeTxBuilderContext = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _selectedToken: string
): StakeTxBuilderContextInterface => {
  const context = useContext(StakeTxBuilderContext);

  return context;
};

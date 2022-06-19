import { ReserveIncentiveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { IncentivesCard } from '../../../components/incentives/IncentivesCard';
import { ListColumn } from '../../../components/lists/ListColumn';

interface ListAPRColumnProps {
  value: number;
  incentives?: ReserveIncentiveData;
  symbol: string;
}

export const ListAPRColumn = ({ value, incentives, symbol }: ListAPRColumnProps) => {
  return (
    <ListColumn>
      <IncentivesCard value={value} incentives={incentives} symbol={symbol} data-cy={`apyType`} />
    </ListColumn>
  );
};

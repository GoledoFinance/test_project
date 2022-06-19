import { ReserveIncentiveData } from 'src/hooks/app-data-provider/useAppDataProvider';
import { ReserveIncentiveResponse } from '../../../../hooks/app-data-provider/useIncentiveData';

export type SupplyAssetsItem = {
  underlyingAsset: string;
  aTokenAddress: string;
  symbol: string;
  iconSymbol: string;
  name: string;
  walletBalance: string;
  walletBalanceUSD: string;
  availableToDeposit: string;
  availableToDepositUSD: string;
  supplyAPY: number | string;
  aIncentivesData?: ReserveIncentiveResponse[];
  reservesIncentives: ReserveIncentiveData[];
  isFreezed?: boolean;
  totalLiquidity: string;
  isActive?: boolean;
  usageAsCollateralEnabledOnUser: boolean;
  detailsAddress: string;
};

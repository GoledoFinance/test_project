import { ChainId } from '@goledo-sdk/contract-helpers';
import { ReactNode } from 'react';
// import { PermissionView } from 'src/components/transactions/FlowCommons/PermissionView';

export type MarketDataType = {
  v3?: boolean;
  marketTitle: string;
  // the network the market operates on
  chainId: ChainId;
  enabledFeatures?: {
    liquiditySwap?: boolean;
    staking?: boolean;
    governance?: boolean;
    faucet?: boolean;
    collateralRepay?: boolean;
    incentives?: boolean;
    permissions?: boolean;
  };
  cachingServerUrl?: string;
  cachingWSServerUrl?: string;
  rpcOnly?: boolean;
  isFork?: boolean;
  permissionComponent?: ReactNode;
  addresses: {
    LENDING_POOL_ADDRESS_PROVIDER: string;
    LENDING_POOL: string;
    WETH_GATEWAY?: string;
    MULTICALL: string;
    INCENTIVE_CONTROLLER: string;
    MASTER_CHEF: string;
    MULTI_FEE_DISTRIBUTION: string;
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    FAUCET?: string;
    WALLET_BALANCE_PROVIDER: string;
    L2_ENCODER?: string;
    STAKE_TOKEN: string;
    /**
     * UiPoolDataProvider currently requires a non-master version
     * https://github.com/aave/protocol-v2/blob/feat/split-ui-dataprovider-logic/contracts/misc/UiPoolDataProvider.sol
     * If you deploy a market with the non default oracle or incentive controller you have to redeploy the UiPoolDataProvider as well as currently the addresses are static.
     * In the upcoming version this will no longer be needed.
     */
    UI_POOL_DATA_PROVIDER: string;
    INCENTIVE_DATA_PROVIDER: string;
    UI_INCENTIVE_DATA_PROVIDER?: string;
  };
  /**
   * https://www.hal.xyz/ has integrated aave for healtfactor warning notification
   * the integration doesn't follow aave market naming & only supports a subset of markets.
   * When a halMarketName is specified a link to hal will be displayed on the ui.
   */
  halMarketName?: string;
};

export enum CustomMarket {
  proto_espace_testnet = 'proto_espace_testnet',
}

export const marketsData: {
  [key in keyof typeof CustomMarket]: MarketDataType;
} = {
  [CustomMarket.proto_espace_testnet]: {
    marketTitle: 'Conflux eSpace (Testnet)',
    chainId: ChainId.conflux_espace_testnet,
    enabledFeatures: {
      liquiditySwap: false,
      incentives: true,
      collateralRepay: false,
    },
    addresses: {
      LENDING_POOL_ADDRESS_PROVIDER: '0x5e480547FE15Ca943A3273de67337f0A24d4f02c'.toLowerCase(),
      LENDING_POOL: '0x78A5975d19DEA62BBcCE6fB8f3fee6e2efc21E12',
      WETH_GATEWAY: '0x7fd31999daEF36C0a33D4E7EBc82cB8461aF533d',
      MULTICALL: '0xd59149a01f910c3c448e41718134baeae55fa784',
      WALLET_BALANCE_PROVIDER: '0xB14B6110452D2B5730f8CDa74e1C1e533969a8cb',
      UI_POOL_DATA_PROVIDER: '0x4812D9323471C01db44FE6C165B003609FD4E69f',
      INCENTIVE_DATA_PROVIDER: '0x6D0843431F215ADEf6077Ba3f6584Bc3805d3E9E',
      MULTI_FEE_DISTRIBUTION: '0x0967AdE2AEDb34841cc5fe18F65c8AA4534cEe14',
      INCENTIVE_CONTROLLER: '0x33612Ef1c8b2e769CfEbb2637952af104b5c8ea8',
      MASTER_CHEF: '0x3e0C276DE70722A572b1CD71cA422382594b49d7',
      STAKE_TOKEN: '0x4E5Fd994B783FD8877926dc48BD3c2659Ae05aC4',
    },
    halMarketName: 'conflux espace testnet',
  },
} as const;

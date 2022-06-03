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
    SWAP_COLLATERAL_ADAPTER?: string;
    REPAY_WITH_COLLATERAL_ADAPTER?: string;
    FAUCET?: string;
    WALLET_BALANCE_PROVIDER: string;
    L2_ENCODER?: string;
    /**
     * UiPoolDataProvider currently requires a non-master version
     * https://github.com/aave/protocol-v2/blob/feat/split-ui-dataprovider-logic/contracts/misc/UiPoolDataProvider.sol
     * If you deploy a market with the non default oracle or incentive controller you have to redeploy the UiPoolDataProvider as well as currently the addresses are static.
     * In the upcoming version this will no longer be needed.
     */
    UI_POOL_DATA_PROVIDER: string;
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
      LENDING_POOL_ADDRESS_PROVIDER: '0xD6C051Bedf2ee76AdB8F02dCd7DB28255A9300b4'.toLowerCase(),
      LENDING_POOL: '0x2e6cABC1f2722e034Ec48a9c4aaf07e96a23588e',
      WETH_GATEWAY: '0xd6Fe60Ab87f39c473bf8aD137E5b2A5D59Fd3Cc4',
      WALLET_BALANCE_PROVIDER: '0xdf50bf3b642F8ba24d640dFe55D650c708791E7F',
      UI_POOL_DATA_PROVIDER: '0x1542Bf01199c87BeEE0511D970828f6CB3532e2B',
    },
    halMarketName: 'conflux espace testnet',
  },
} as const;

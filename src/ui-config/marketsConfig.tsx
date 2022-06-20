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
    GOLEDO_TOKEN: string;
    SWAPPI_LP_TOKEN: string;
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
      LENDING_POOL_ADDRESS_PROVIDER: '0x023619D3df82473e249bD8ccEcc44C5610b58b86'.toLowerCase(),
      LENDING_POOL: '0xB31cc812a2A868A8F9C0e09a6A316922c9C1e163',
      WETH_GATEWAY: '0x7fd31999daEF36C0a33D4E7EBc82cB8461aF533d',
      MULTICALL: '0xd59149a01f910c3c448e41718134baeae55fa784',
      WALLET_BALANCE_PROVIDER: '0xB14B6110452D2B5730f8CDa74e1C1e533969a8cb',
      UI_POOL_DATA_PROVIDER: '0xCbc16C9F92C4Abee9b04fF3137Cf43fbAc274328',
      INCENTIVE_DATA_PROVIDER: '0x821760efC34A7586Ce26410062B381AB00ED7948',
      MULTI_FEE_DISTRIBUTION: '0x4E57aE057ced065BBF8a9039e29575168033122B',
      INCENTIVE_CONTROLLER: '0xFb6a7A25049C71Ac559d7dA40457D60f036052a9',
      MASTER_CHEF: '0x4F3286BeBC329A0D222F21de44a92Df235558208',
      GOLEDO_TOKEN: '0x825c33cDc4C5a985Ca85Ab6a88049c423fB6E53E',
      SWAPPI_LP_TOKEN: '0xfd8742ccec4b37b5cbafe0e3471ae846024fcce4',
    },
    halMarketName: 'conflux espace testnet',
  },
} as const;

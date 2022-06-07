import { ChainId } from '@goledo-sdk/contract-helpers';

export type ExplorerLinkBuilderProps = {
  tx?: string;
  address?: string;
};

export type ExplorerLinkBuilderConfig = {
  baseUrl: string;
  addressPrefix?: string;
  txPrefix?: string;
};

export type NetworkConfig = {
  name: string;
  privateJsonRPCUrl?: string; // private rpc will be used for rpc queries inside the client. normally has private api key and better rate
  privateJsonRPCWSUrl?: string;
  publicJsonRPCUrl: readonly string[]; // public rpc used if not private found, and used to add specific network to wallets if user don't have them. Normally with slow rates
  publicJsonRPCWSUrl?: string;
  // protocolDataUrl: string;
  // https://github.com/aave/aave-api
  ratesHistoryApiUrl?: string;
  // cachingServerUrl?: string;
  // cachingWSServerUrl?: string;
  baseUniswapAdapter?: string;
  /**
   * When this is set withdrawals will automatically be unwrapped
   */
  wrappedBaseAssetSymbol?: string;
  baseAssetSymbol: string;
  // needed for configuring the chain on metemask when it doesn't exist yet
  baseAssetDecimals: number;
  // usdMarket?: boolean;
  // function returning a link to etherscan et al
  explorerLink: string;
  explorerLinkBuilder: (props: ExplorerLinkBuilderProps) => string;
  // rpcOnly?: boolean;
  // set this to show faucets and similar
  isTestnet?: boolean;
  // get's automatically populated on fork networks
  isFork?: boolean;
  networkLogoPath: string;
  // contains the forked off chainId
  underlyingChainId?: number;
  bridge: ReadonlyArray<{
    icon: string;
    name: string;
    url: string;
  }>;
};

export type BaseNetworkConfig = Omit<NetworkConfig, 'explorerLinkBuilder'>;

export const networkConfigs: Record<string, BaseNetworkConfig> = {
  [ChainId.mainnet]: {
    name: 'Ethereum',
    publicJsonRPCUrl: ['https://cloudflare-eth.com', 'https://rpc.flashbots.net/'],
    publicJsonRPCWSUrl: 'wss://eth-mainnet.alchemyapi.io/v2/demo',
    baseUniswapAdapter: '0xc3efa200a60883a96ffe3d5b492b121d6e9a1f3f',
    baseAssetSymbol: 'ETH',
    wrappedBaseAssetSymbol: 'WETH',
    baseAssetDecimals: 18,
    explorerLink: 'https://etherscan.io',
    ratesHistoryApiUrl: 'https://aave-api-v2.aave.com/data/rates-history',
    networkLogoPath: '/icons/networks/ethereum.svg',
    bridge: [],
  },
  [ChainId.conflux_espace_testnet]: {
    name: 'Conflux eSpace Testnet',
    publicJsonRPCUrl: ['https://evmtestnet.confluxrpc.com/'],
    publicJsonRPCWSUrl: '',
    baseUniswapAdapter: '0x0',
    baseAssetSymbol: 'CFX',
    wrappedBaseAssetSymbol: 'WCFX',
    baseAssetDecimals: 18,
    explorerLink: 'https://evmtestnet.confluxscan.net',
    isTestnet: true,
    networkLogoPath: '/icons/networks/conflux.svg',
    bridge: [
      {
        icon: '/icons/bridge/multichain.png',
        name: 'Multichain Bridge',
        url: 'https://conflux.multichain.org/',
      },
      {
        icon: '/icons/bridge/cbridge.png',
        name: 'Celer cBridge',
        url: 'https://cbridge.celer.network/',
      },
      {
        icon: '/icons/bridge/meson.png',
        name: 'Meson Bridge',
        url: 'https://meson.fi/',
      },
    ],
  },
} as const;

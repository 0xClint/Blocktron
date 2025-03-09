import { defineChain } from "viem";

export const coreDaoTestnet = defineChain({
  id: 1114,
  name: "CoreDaoTestnet2",
  nativeCurrency: {
    decimals: 18,
    name: "Ether",
    symbol: "ETH",
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.test2.btcs.network"],
      webSocket: ["wss://rpc.test2.btcs.network"],
    },
  },
  blockExplorers: {
    default: { name: "Explorer", url: "https://scan.test2.btcs.network" },
  },
  contracts: {
    multicall3: {
      address: "0xcA11bde05977b3631167028862bE2a173976CA11",
      blockCreated: 1847951,
    },
  },
});

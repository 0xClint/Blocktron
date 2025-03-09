import { http, createConfig } from "wagmi";
import { coreDaoTestnet } from "./coreDaoTestChainConfig";

export const wagmiConfig = createConfig({
  chains: [coreDaoTestnet],
  transports: {
    [coreDaoTestnet.id]: http("https://rpc.test2.btcs.network"),
  },
});

import { createPublicClient, http } from "viem";
import { coreDaoTestnet } from "./coreDaoTestChainConfig";

export const publicClient = createPublicClient({
  chain: coreDaoTestnet,
  transport: http("https://rpc.test2.btcs.network"),
});

import "@/styles/global.css";
import { RecoilRoot } from "recoil";
import { Layout } from "@/components";
import { GameContextProvider } from "@/contexts/GameProvider";
import soundsManager from "@/classes/Sounds";
import { NextUIProvider } from "@nextui-org/react";
import { WagmiProvider } from "wagmi";
import { wagmiConfig } from "@/utils/wagmiConfig";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  // useEffect(() => {
  //   soundsManager.init();
  // }, []);

  return (
    <NextUIProvider>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <GameContextProvider>
              <Layout>
                <Component {...pageProps} /> <div id="portal"></div>
              </Layout>
            </GameContextProvider>
          </RecoilRoot>
        </QueryClientProvider>
      </WagmiProvider>
    </NextUIProvider>
  );
}

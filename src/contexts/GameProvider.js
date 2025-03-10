import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  convertWalletData,
  extractIpfsHash,
  filterNftTokens,
  findObjectByCid,
  getContractByAddress,
  replaceUri,
} from "@/helpers/convertor";
import {
  GAME_CONTRACT_ABI,
  GAME_CONTRACT_ADDRESS,
  WORLD_ITEM_CONTRACT_ABI,
  WORLD_ITEMS_CONTRACT_ADDRESS,
  WORLD_SPACE_CONTRACT_ABI,
  WORLD_SPACE_CONTRACT_ADDRESS,
} from "@/contracts/conts";
import { encodeFunctionData } from "viem";
import { publicClient } from "@/utils/viemConfig";
import { INITIAL_SPACE_SIZE } from "@/helpers/consts";
import { uploadFile } from "@/utils/lighthouse";
import axios from "axios";
import {
  injected,
  simulateContract,
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { useAccount, useConnect } from "wagmi";
import { wagmiConfig } from "@/utils/wagmiConfig";
import { electroneumTestnet, polygonAmoy } from "viem/chains";
import { coreDaoTestnet } from "@/utils/coreDaoTestChainConfig";

const GameProviderFn = () => {
  const account = useAccount();
  const { connect, isConnected } = useConnect();
  const [connectWallet, setConnectWallet] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [userName, setUserName] = useState(null);
  const [lands, setLands] = useState([]);
  const [userLevels, setUserLevels] = useState(null);
  const [gameLevels, setGameLevels] = useState([]);
  const [wallets, setWallets] = useState(null);

  const createLand = useCallback(
    async (landName, newLevelData) => {
      if (!account.address) {
        setConnectWallet(true);
        return;
      }
      const cid = await uploadFile(newLevelData);
      try {
        const data = {
          uri: `https://gateway.lighthouse.storage/ipfs/${cid}`,
          name: landName,
        };
        const { request } = await simulateContract(wagmiConfig, {
          abi: WORLD_SPACE_CONTRACT_ABI,
          address: WORLD_SPACE_CONTRACT_ADDRESS,
          functionName: "createSpace",
          args: [landName, INITIAL_SPACE_SIZE, JSON.stringify(data)],
        });

        const approveResult = await writeContract(wagmiConfig, request);
        console.log(approveResult);

        const approveReceipt = await waitForTransactionReceipt(wagmiConfig, {
          hash: approveResult,
          chainId: coreDaoTestnet.id,
        });
        console.log(approveReceipt);
        return cid;
      } catch (e) {
        console.log(e);
        console.log(e.name);
      }
    },
    [account]
  );

  const saveLand = useCallback(
    async (currCid, lands, gameData) => {
      // console.log(gameData);
      const prevData = lands.find(
        ({ cid }) => cid.toLowerCase() == currCid.toLowerCase()
      );
      console.log(prevData);

      if (prevData && gameData && account.address) {
        const newCid = await uploadFile(gameData);
        console.log("new CID : " + newCid);
        try {
          const data = {
            uri: `https://gateway.lighthouse.storage/ipfs/${newCid}`,
            name: prevData.name,
          };
          const { request } = await simulateContract(wagmiConfig, {
            abi: WORLD_SPACE_CONTRACT_ABI,
            address: WORLD_SPACE_CONTRACT_ADDRESS,
            functionName: "setSpaceURI",
            args: [prevData.tokenID, JSON.stringify(data)],
          });

          const approveResult = await writeContract(wagmiConfig, request);
          console.log(approveResult);

          const approveReceipt = await waitForTransactionReceipt(wagmiConfig, {
            hash: approveResult,
            chainId: coreDaoTestnet.id,
          });
          console.log(approveReceipt);
          return cid;
        } catch (e) {
          console.log(e);
          console.log(e.name);
        }

        await getAllLands();
        return newCid;
      } else {
        console.log("Your are on wrong world url!");
        return null;
      }
    },
    [account]
  );

  const transferNFT = useCallback(
    async (to, tokenID) => {
      if (account.address) {
        try {
          const { request } = await simulateContract(wagmiConfig, {
            abi: WORLD_SPACE_CONTRACT_ABI,
            address: WORLD_SPACE_CONTRACT_ADDRESS,
            functionName: "transferFrom",
            args: [account.address, to, Number(tokenID)],
          });

          const approveResult = await writeContract(wagmiConfig, request);
          console.log(approveResult);

          const approveReceipt = await waitForTransactionReceipt(wagmiConfig, {
            hash: approveResult,
            chainId: coreDaoTestnet.id,
          });
          console.log(approveReceipt);
        } catch (e) {
          console.log(e);
          console.log(e.name);
        }
        await getAllLands();
      } else {
        console.log("Your are on wrong world url!");
        return null;
      }
    },
    [account]
  );

  const saveLevelData = useCallback(
    async (levelIndex) => {
      if (account.address) {
        try {
          const { request } = await simulateContract(wagmiConfig, {
            abi: WORLD_ITEM_CONTRACT_ABI,
            address: WORLD_ITEMS_CONTRACT_ADDRESS,
            functionName: "awardItem",
            args: [account.address, levelIndex],
          });

          const approveResult = await writeContract(wagmiConfig, request);
          console.log(approveResult);

          const approveReceipt = await waitForTransactionReceipt(wagmiConfig, {
            hash: approveResult,
            chainId: coreDaoTestnet.id,
          });
          console.log(approveReceipt);
        } catch (e) {
          console.log(e);
          console.log(e.name);
        }
        await getAllLands();
      } else {
        console.log("Your are on wrong world url!");
      }
    },
    [account]
  );

  //**********************getter****************** */

  const getMetaData = async (tokenID) => {
    try {
      if (account) {
        const res = await publicClient.readContract({
          address: WORLD_SPACE_CONTRACT_ADDRESS,
          abi: WORLD_SPACE_CONTRACT_ABI,
          functionName: "tokenURI",
          args: [tokenID],
        });
        // console.log(res);

        const data = JSON.parse(res);
        data.cid = extractIpfsHash(data.uri);
        data.tokenID = tokenID;
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllLands = async () => {
    try {
      const response = await axios.get("https://api.test2.btcs.network/api", {
        params: {
          module: "account",
          action: "tokennfttx",
          contractaddress: WORLD_SPACE_CONTRACT_ADDRESS,
          address: account.address,
          startblock: 2781789,
          endblock: 999999999,
          sort: "desc",
          apikey: process.env.NEXT_PUBLIC_CORE_API_KEY,
        },
      });
      if (response.data.result === null) return;
      console.log("[token events] : ", response.data.result);
      const result = filterNftTokens(response.data.result, account.address);
      console.log("[tokenIDs] : ", result);

      const arr = await Promise.all(
        result.map((tokenID) => getMetaData(tokenID))
      );
      console.log("[user lands] : ", arr);

      setLands(arr);
    } catch (error) {
      console.error("Error fetching NFT transactions:", error);
    }
  };

  useEffect(() => {
    getAllLands();
  }, [setConnectWallet, account, createLand, saveLand]);

  const getAllLevels = async () => {
    try {
      const res = await publicClient.readContract({
        address: WORLD_ITEMS_CONTRACT_ADDRESS,
        abi: WORLD_ITEM_CONTRACT_ABI,
        functionName: "getAllLevels",
      });
      // console.log(res);
      setGameLevels(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllLevels();
  }, []);

  const getUserLevels = async () => {
    try {
      if (account.address) {
        const res = await publicClient.readContract({
          address: WORLD_ITEMS_CONTRACT_ADDRESS,
          abi: WORLD_ITEM_CONTRACT_ABI,
          functionName: "balanceOf",
          args: [account.address],
        });
        // console.log(res);
        setUserLevels(Number(res));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserLevels();
  }, [account, saveLevelData]);

  return {
    connectWallet,
    setConnectWallet,
    userName,
    userDetails,
    wallets,
    createLand,
    getAllLands,
    lands,
    account,
    setLands,
    saveLand,
    userLevels,
    gameLevels,
    saveLevelData,
    transferNFT,
  };
};

const GameContext = createContext(null);

export const GameContextProvider = ({ children }) => {
  return (
    <GameContext.Provider value={GameProviderFn()}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};

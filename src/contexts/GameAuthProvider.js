import { createContext, useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

const GameAuthProviderFn = () => {
  const [isConnected, setConnected] = useState(false);
  const account = useAccount();

  const checkIsConnected = () => {
    if (!account) setConnected(false);
    else setConnected(true);
  };

  useEffect(() => {
    checkIsConnected();
  }, [setConnected]);

  return { isConnected, setConnected };
};

const GameAuthContext = createContext(null);

export const GameAuthProvider = ({ children }) => {
  return (
    <GameAuthContext.Provider value={GameAuthProviderFn()}>
      {children}
    </GameAuthContext.Provider>
  );
};

export const useGameAuth = () => {
  const context = useContext(GameAuthContext);
  if (!context) {
    throw new Error("useGameAuth must be used within a GameAuthProvider");
  }

  return context;
};

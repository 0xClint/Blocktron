import React from "react";
import { WalletConnectModal } from ".";

const Layout = ({ children }) => {
  return (
    <>
      {children}
      {<WalletConnectModal />}
    </>
  );
};

export default Layout;

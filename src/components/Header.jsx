"use client";

import { BlockTronName, MusicIcon, MusicOffIcon } from "@/assets/Icons";
import soundsManager from "@/classes/Sounds";
import { useGame } from "@/contexts/GameProvider";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { ConnectWallet } from "./ConnectWallet";

const Header = () => {
  const { userName, account } = useGame();
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);
  const [isThemePlaying, setIsThemePlaying] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // const handleSelect = async (key) => {
  //   if (key == "copy") {
  //     navigator.clipboard.writeText(account);
  //   } else {
  //     await userLogout();
  //   }
  // };

  const handleMusic = () => {
    if (soundsManager.isThemePlaying) soundsManager.stopTheme();
    else soundsManager.playTheme();
    setIsThemePlaying(soundsManager.isThemePlaying);
  };

  return (
    <div className="flex justify-between p-3">
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer hover:scale-105 ease-in duration-100"
      >
        <img src="/blocktron.png" className="h-10 rounded" />
      </div>
      {isClient && (
        <div className="flex">
          <button className="w-12" onClick={handleMusic}>
            {isThemePlaying ? <MusicIcon /> : <MusicOffIcon />}
          </button>
          <ConnectWallet />
        </div>
      )}
    </div>
  );
};

export default Header;

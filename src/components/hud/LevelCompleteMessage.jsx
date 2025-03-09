import { currentLevelIdAtom } from "@/atoms/currentLevelIdAtom";

import { useRecoilState } from "recoil";
import styles from "@/components/hud/PopupMessage.module.css";
import LevelCompleted from "../object-graphics/LevelCompleted";
import { useKeyPress } from "@/hooks/useKeyPress";
import { useGame } from "@/contexts/GameProvider";
import { useRouter } from "next/router";
import { findIndexOf } from "@/helpers/convertor";
import { Loader } from "..";
import { useState } from "react";

export default function LevelCompleteMessage() {

  const router = useRouter();
  const [loader, setLoader] = useState(false);
  const { gameLevels, saveLevelData } = useGame();

  const handleGoToNextLevel = async () => {
    setLoader(true);
    const currLevelCID = router.query.id;
    const index = findIndexOf(gameLevels, currLevelCID);
    // console.log("level Index: " + index);
    // console.log(gameLevels[index + 1].itemURI);

    if (index + 1 == gameLevels?.length) router.push(`/`);
    else {
      await saveLevelData(index);
      setLoader(false);
      router.push(`/levels/${gameLevels[index + 1].itemURI}`);
    }
    setLoader(false);
  };

  useKeyPress(["Enter"], () => {
    handleGoToNextLevel();
  });

  return (
    <div className="fixed w-screen h-screen flex-center">
      {loader && <Loader />}
      <div>
        <div>
          <LevelCompleted handleGoToNextLevel={handleGoToNextLevel} />
        </div>
      </div>
    </div>
  );
}

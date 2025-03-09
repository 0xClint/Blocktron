import { THEME_BACKGROUNDS } from "@/helpers/consts";
import styles from "./RenderLevel.module.css";
import LevelBackgroundTilesLayer from "./LevelBackgroundTilesLayer";
import LevelPlacementsLayer from "./LevelPlacementsLayer";
import { useEffect, useState } from "react";
import { LevelState } from "@/classes/Levelstate";
import TopHud from "@/components/hud/TopHud";
import { DeathMessage } from "../hud/DeathMessage";
import LevelCompleteMessage from "../hud/LevelCompleteMessage";
import LevelsList from "../hud/LevelsList";
import EditorDropdown from "../hud/EditorDropdown";
import { useRouter } from "next/router";

export default function RenderGame({ gameData }) {
  const router = useRouter();
  const [level, setLevel] = useState(null);

  useEffect(() => {
    //Create and subscribe to state change
    const levelState = new LevelState(
      gameData?.name || "DemoName",
      gameData,
      (newState) => {
        setLevel(newState);
      }
    );

    //Get initial state
    const check = router?.pathname.includes("/levels");
    if (check) {
      levelState.getState().setEditorMode(false);
    } else {
      levelState.getState().turnOffClock();
    }

    setLevel(levelState.getState());

    //Destroy method when this component unmounts or cleanup
    return () => {
      levelState.destroy();
    };
  }, []);

  if (!level) return null;

  const cameraTranslate = `translate3d(${level.cameraTransformX}, ${level.cameraTransformY},0)`;
  return (
    <div
      className={styles.fullScreenContainer}
      style={{ background: THEME_BACKGROUNDS[level.theme] }}
    >
      <div className={styles.gameScreen}>
        <div style={{ transform: cameraTranslate }}>
          <LevelBackgroundTilesLayer level={level} />
          <LevelPlacementsLayer level={level} />
        </div>
        {level.showLevelList && <LevelsList level={level} />}
      </div>
      {level.deathOutcome && <DeathMessage level={level} />}
      {level.isCompleted && <LevelCompleteMessage />}
      <TopHud
        level={level}
        isLevelMode={router?.pathname.includes("/levels")}
      />
      {/* {!router?.pathname.includes("/levels") && ( */}
      <EditorDropdown level={level} />
      {/* )} */}
    </div>
  );
}

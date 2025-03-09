import Sprite from "@/components/object-graphics/EditorSprite";
import {
  DEATH_TYPE_CLOCK,
  PLACEMENT_TYPE_CIABATTA,
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_FLYING_ENEMY,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_ROAMING_ENEMY,
  PLACEMENT_TYPE_WATER,
} from "@/helpers/consts";
import { TILES } from "@/helpers/tiles";
import { useKeyPress } from "@/hooks/useKeyPress";
import soundsManager, { SFX } from "@/classes/Sounds";
import { useEffect } from "react";
import { useRouter } from "next/router";

const showDeathType = (deathType) => {
  switch (deathType) {
    case PLACEMENT_TYPE_FIRE:
      return <Sprite frameCoord={TILES.FIRE1} multipler={5}/>;
    case PLACEMENT_TYPE_WATER:
      return <Sprite frameCoord={TILES.WATER1} size={16} multipler={5} />;
    case DEATH_TYPE_CLOCK:
      return <Sprite frameCoord={TILES.CLOCK} multipler={5}/>;
    case PLACEMENT_TYPE_GROUND_ENEMY:
      return (
        <div
          style={{
            paddingBottom: 12,
          }}
        >
          <Sprite frameCoord={TILES.ENEMY_RIGHT} size={32} multipler={5}/>
        </div>
      );
    case PLACEMENT_TYPE_ROAMING_ENEMY:
      return (
        <div
          style={{
            paddingBottom: 12,
          }}
        >
          <Sprite frameCoord={TILES.ENEMY_ROAMING} size={32} multipler={5}/>
        </div>
      );
    case PLACEMENT_TYPE_FLYING_ENEMY:
      return (
        <div
          style={{
            paddingBottom: 12,
          }}
        >
          <Sprite frameCoord={TILES.ENEMY_FLYING_RIGHT} size={32} multipler={5}/>
        </div>
      );
    case PLACEMENT_TYPE_CIABATTA:
      return (
        <div
          style={{
            paddingBottom: 4,
          }}
        >
          <Sprite frameCoord={TILES.CIABATTA_RIGHT} size={48} multipler={5}/>
        </div>
      );
    default:
      return null;
  }
};

export const DeathMessage = ({ level }) => {
  const router = useRouter();

  const handleRestartLevel = () => {
    level.restart();
  };

  useKeyPress(["Enter"], () => {
    handleRestartLevel();
  });

  useEffect(() => {
    soundsManager.playSfx(SFX.LOSE);
  }, []);

  return (
    <div className="fixed w-screen h-screen flex-center">
      <div className="md:w-[300px] card-container border-2 rounded-lg w-full py-4 px-3  relative flex flex-col gap-4 overflow-y-auto">
        <span className="font-inter font-regular  my-4 text-center">
          Game Over
        </span>
        <div className="w-20 h-20 mx-auto mb-3">{showDeathType(level.deathOutcome)}</div>
        <div className=" flex justify-between">
          <button
            onClick={() => router.push("/")}
            className="w-[120px] border-2 border-tertiary text-sm hover:scale-[105%] text-white py-1  rounded text-center"
          >
            Home
          </button>
          <button
            onClick={() => handleRestartLevel()}
            className="w-[120px] border-2 border-tertiary text-sm  hover:scale-[105%] text-white py-1  rounded text-center"
          >
            Restart
          </button>
        </div>
      </div>
    </div>
  );
};

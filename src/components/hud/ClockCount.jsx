import { TILES } from "@/helpers/tiles";
import Sprite from "@/components/object-graphics/Sprite";

export const ClockCount = ({ level }) => {
  return (
    <div className="flex gap-1 items-center">
      <Sprite frameCoord={TILES.CLOCK} />
      {level.secondsRemaining}
    </div>
  );
};

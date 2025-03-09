import { PLACEMENT_TYPE_FLOUR } from "@/helpers/consts";
import Sprite from "@/components/object-graphics/Sprite";
import { TILES } from "@/helpers/tiles";

export const FlourCount = ({ level }) => {
  const count = level.placements.filter((p) => {
    return p.type === PLACEMENT_TYPE_FLOUR && !p.hasBeenCollected;
  }).length;
  return (
    <div className="flex items-center">
      <Sprite frameCoord={TILES.FLOUR} />
      {count}
    </div>
  );
};

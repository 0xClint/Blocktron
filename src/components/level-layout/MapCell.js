import Sprite from "@/components/object-graphics/Sprite";
import { CELL_SIZE } from "@/helpers/consts";

export default function MapCell({ level, x, y, frameCoord }) {
  return (
    <div
      style={{
        position: "absolute",
        left: x * CELL_SIZE,
        top: y * CELL_SIZE,
      }}
      onClick={() => {
        if (level.editorMode) {
          level.addPlacement({
            x: x,
            y: y,
            type: level.editModePlacementType.type,
            trait: level.editModePlacementType.trait,
          });
        }
      }}
    >
      <Sprite frameCoord={frameCoord} />
    </div>
  );
}

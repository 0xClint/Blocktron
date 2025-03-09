import { TILES } from "@/helpers/tiles";
import Sprite from "./Sprite";

export default function Animal({ frameCoord, yTranslate, showShadow }) {
  return (
    <div className="relative pointer-events-none">
      <div>{showShadow && <Sprite frameCoord={TILES.SHADOW} />}</div>
      <div
        className="absolute left-0 top-0"
        style={{
          transform: `translateY(${yTranslate}px)`,
        }}
      >
        <Sprite frameCoord={frameCoord} size={16} />
      </div>
    </div>
  );
}

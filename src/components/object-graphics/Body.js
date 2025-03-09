import { TILES } from "@/helpers/tiles";
import Sprite from "./Sprite";

export default function Body({ frameCoord, yTranslate, showShadow }) {
  return (
    <div className="relative pointer-events-none">
      <div>{showShadow && <Sprite frameCoord={TILES.SHADOW} />}</div>
      <div
        className="absolute -left-2 -top-5"
        style={{
          transform: `translateY(${yTranslate}px)`,
        }}
      >
        <Sprite frameCoord={frameCoord} size={32} />
      </div>
    </div>
  );
}

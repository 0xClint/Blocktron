import { THEME_TILES_MAP } from "@/helpers/consts";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";

export class WallPlacement extends Placement {
  isSolidForBody(_body) {
    return true;
  }

  renderComponent() {
    const WallTileCoord = THEME_TILES_MAP[this.level.theme].WALL;
    return <Sprite frameCoord={WallTileCoord} />;
  }
}

import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";

export class LevelEntryPlacement extends Placement {
  showsLevelListOnCollide() {
    return true;
  }
  canBeDeleted() {
    return false;
  }
  renderComponent() {
    return <Sprite frameCoord={TILES.TELEPORT1} size={16} />;
  }
}

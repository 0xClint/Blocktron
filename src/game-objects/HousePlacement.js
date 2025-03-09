import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";

export class HousePlacement extends Placement {
  isSolidForBody(_body) {
    return true;
  }
  renderComponent() {
    return <Sprite frameCoord={TILES.HOUSE} size={16*8} />;
  }
}

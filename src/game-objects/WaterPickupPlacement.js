import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";

export class WaterPickupPlacement extends Placement {
  addsItemToInventoryOnColide() {
    return this.type;
  }

  renderComponent() {
    return <Sprite frameCoord={TILES.WATER_PICKUP} />;
  }
}

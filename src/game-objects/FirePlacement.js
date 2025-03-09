import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";
import {
  BODY_SKINS,
  PLACEMENT_TYPE_CIABATTA,
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_HERO,
} from "@/helpers/consts";

export class FirePlacement extends Placement {
  changesHeroSkinOnCollide() {
    return BODY_SKINS.FIRE;
  }

  damagesBodyOnCollide(body) {
    const { inventory } = this.level;
    if (
      body.type === PLACEMENT_TYPE_HERO &&
      !inventory.has(PLACEMENT_TYPE_FIRE_PICKUP)
    ) {
      return this.type;
    }

    if (body.type === PLACEMENT_TYPE_CIABATTA) {
      return this.type;
    }

    return null;
  }
  renderComponent() {
    const fireFrame = this.level.animatedFrames.fireFrame;
    return <Sprite frameCoord={fireFrame} />;
  }
}

import { LOCK_KEY_COLORS } from "@/helpers/consts";
import { Placement } from "./Placement";
import { TILES } from "@/helpers/tiles";
import ElevatedSprite from "@/components/object-graphics/ElevatedSprite";

export class KeyPlacement extends Placement {
  constructor(properties, level) {
    super(properties, level);
    this.color = properties.color ?? LOCK_KEY_COLORS.BLUE;
  }

  addsItemToInventoryOnColide() {
    return `KEY_${this.color}`;
  }

  renderComponent() {
    const framCoord =
      this.color === LOCK_KEY_COLORS.BLUE ? TILES.BLUE_KEY : TILES.GREEN_KEY;

    return <ElevatedSprite frameCoord={framCoord} />;
  }
}

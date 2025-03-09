import { TILES } from "@/helpers/tiles";
import { Placement } from "./Placement";
import Sprite from "@/components/object-graphics/Sprite";
import {
  BODY_SKINS,
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from "@/helpers/consts";

const directionFramMap = {
  [DIRECTION_LEFT]: TILES.CONVEYOR_LEFT,
  [DIRECTION_DOWN]: TILES.CONVEYOR_DOWN,
  [DIRECTION_RIGHT]: TILES.CONVEYOR_RIGHT,
  [DIRECTION_UP]: TILES.CONVEYOR_UP,
};

export class ConveyorPlacement extends Placement {
  constructor(properties, level) {
    super(properties, level);
    this.direction = properties.direction;
  }

  autoMovesBodyOnCollide() {
    return this.direction;
  }

  changesHeroSkinOnCollide() {
    return BODY_SKINS.CONVEYOR;
  }
  renderComponent() {
    return <Sprite frameCoord={directionFramMap[this.direction]} />;
  }
}

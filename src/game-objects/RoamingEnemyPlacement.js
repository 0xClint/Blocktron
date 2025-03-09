import Body from "@/components/object-graphics/Body";
import { GroundEnemyPlacement } from "./GroundEnemyPlacement";
import { TILES } from "@/helpers/tiles";
import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from "@/helpers/consts";
import { Collision } from "@/classes/Collision";

export class RoamingEnemyPlacement extends GroundEnemyPlacement {
  constructor(properties, level) {
    super(properties, level);

    //Enemy Speed Control
    this.tickBetweenMovesInterval = 48;
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.turnsAroundAtWater = true;
    this.interactsWithGround = true;
  }

  onPostMove() {
    //Don't make move if on autoMove
    const collision = new Collision(this, this.level);
    if (collision.withPlacementMovesBody()) {
      return;
    }

    const directions = [
      DIRECTION_UP,
      DIRECTION_DOWN,
      DIRECTION_LEFT,
      DIRECTION_RIGHT,
    ];

    this.movingPixelDirection =
      directions[Math.floor(Math.random() * directions.length)];
  }
  renderComponent() {
    return <Body frameCoord={TILES.ENEMY_ROAMING} yTranslate={-1} />;
  }
}

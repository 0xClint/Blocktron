import Body from "@/components/object-graphics/Body";
import { GroundEnemyPlacement } from "./GroundEnemyPlacement";
import { DIRECTION_LEFT } from "@/helpers/consts";
import { TILES } from "@/helpers/tiles";

export class FlyingEnemyPlacement extends GroundEnemyPlacement {
  constructor(properties, level) {
    super(properties, level);

    //Enemy Speed Control
    this.tickBetweenMovesInterval = 16;
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.turnsAroundAtWater = false;
    this.interactsWithGround = false;
  }

  renderComponent() {
    const frameCoord =
      this.spritFacingDirection === DIRECTION_LEFT
        ? TILES.ENEMY_FLYING_LEFT
        : TILES.ENEMY_FLYING_RIGHT;

    return <Body frameCoord={frameCoord} yTranslate={-3} showShadow={true} />;
  }
}

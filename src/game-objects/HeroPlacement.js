import {
  BODY_SKINS,
  DIRECTION_LEFT,
  HERO_RUN_1,
  HERO_RUN_2,
  Z_INDEX_LAYER_SIZE,
} from "@/helpers/consts";
import { TILES } from "@/helpers/tiles";
import { BodyPlacement } from "./BodyPlacement";
import Body from "@/components/object-graphics/Body";

const heroSkinMap = {
  [BODY_SKINS.NORMAL]: [TILES.HERO_LEFT, TILES.HERO_RIGHT],
  [BODY_SKINS.WATER]: [TILES.HERO_WATER_LEFT, TILES.HERO_WATER_RIGHT],
  [BODY_SKINS.FIRE]: [TILES.HERO_FIRE_LEFT, TILES.HERO_FIRE_RIGHT],
  [BODY_SKINS.DEATH]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  [BODY_SKINS.SCARED]: [TILES.HERO_DEATH_LEFT, TILES.HERO_DEATH_RIGHT],
  [BODY_SKINS.ICE]: [TILES.HERO_ICE_LEFT, TILES.HERO_ICE_RIGHT],
  [BODY_SKINS.CONVEYOR]: [TILES.HERO_CONVEYOR_LEFT, TILES.HERO_CONVEYOR_RIGHT],
  [BODY_SKINS.TELEPORT]: [TILES.HERO_TELEPORT_LEFT, TILES.HERO_TELEPORT_RIGHT],
  [HERO_RUN_1]: [TILES.HERO_RUN_1_LEFT, TILES.HERO_RUN_1_RIGHT],
  [HERO_RUN_2]: [TILES.HERO_RUN_2_LEFT, TILES.HERO_RUN_2_RIGHT],
};

export class HeroPlacement extends BodyPlacement {
  constructor(properties, level) {
    super(properties, level);
    this.canCollectItems = true;
    this.canCompleteLevel = true;
    this.interactsWithGround = true;
  }
  controllerMoveRequested(direction) {
    //Attempt to start moving
    if (this.movingPixelsRemaining > 0) {
      return;
    }

    //Check for a Lock at next Position
    const possibleLock = this.getLockAtNextPosition(direction);
    if (possibleLock) {
      possibleLock.unlock();
      return;
    }

    //Make sure the next space is available
    if (this.isSolidAtNextPosition(direction)) {
      return;
    }

    // Hop out when skin changes

    if (this.skin === BODY_SKINS.WATER) {
      const collision = this.getCollisionAtNextPosition(direction);
      if (!collision.wtihChangesHeroSkin()) {
        this.skin = BODY_SKINS.NORMAL;
      }
    }

    //Start the move
    this.movingPixelsRemaining = 16;
    this.movingPixelDirection = direction;
    this.updateFacingDirection();
    this.updateWalkFrame();
  }

  getFrame() {
    //left/right frame to show
    const index = this.spritFacingDirection === DIRECTION_LEFT ? 0 : 1;

    //If dead show dead skin
    if (this.level.deathOutcome) {
      return heroSkinMap[BODY_SKINS.DEATH][index];
    }

    //Correct walking frame per direction
    if (this.movingPixelsRemaining > 0 && this.skin === BODY_SKINS.NORMAL) {
      const walkKey = this.spriteWalkFrame === 0 ? HERO_RUN_1 : HERO_RUN_2;
      return heroSkinMap[walkKey][index];
    }
    return heroSkinMap[this.skin][index];
  }

  onAutoMovement(direction) {
    this.controllerMoveRequested(direction);
  }

  takesDamage(deathType) {
    this.level.setDeathOutcome(deathType);
  }

  zIndex() {
    return this.y * Z_INDEX_LAYER_SIZE + 1;
  }

  canBeDeleted() {
    return false;
  }
  
  renderComponent() {
    const shouldShowShadow = this.skin != BODY_SKINS.WATER;
    return (
      <Body
        frameCoord={this.getFrame()}
        yTranslate={this.getYTranslate()}
        showShadow={shouldShowShadow}
      />
    );
  }
}

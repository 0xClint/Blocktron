import { Placement } from "./Placement";
import { Collision } from "@/classes/Collision";
import {
  BODY_SKINS,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  directionUpdateMap,
  HERO_RUN_1,
  HERO_RUN_2,
  PLACEMENT_TYPE_CELEBRATION,
  Z_INDEX_LAYER_SIZE,
} from "@/helpers/consts";
import Body from "@/components/object-graphics/Body";
import soundsManager, { SFX } from "@/classes/Sounds";

export class BodyPlacement extends Placement {
  getCollisionAtNextPosition(direction) {
    const { x, y } = directionUpdateMap[direction];
    const nextX = this.x + x;
    const nextY = this.y + y;
    return new Collision(this, this.level, { x: nextX, y: nextY });
  }

  getLockAtNextPosition(direction) {
    const collision = this.getCollisionAtNextPosition(direction);

    return collision.withLock();
  }

  isSolidAtNextPosition(direction) {
    //check for ice corner
    const onIceCorner = new Collision(this, this.level).withIceCorner();
    if (onIceCorner?.blocksMovementDirection(direction)) {
      return true;
    }

    const collision = this.getCollisionAtNextPosition(direction);
    const isOutOfBounds = this.level.isPositionOutOfBounds(
      collision.x,
      collision.y
    );
    if (isOutOfBounds) return true;
    return Boolean(collision.withSolidPlacement());
  }

  updateFacingDirection() {
    if (
      this.movingPixelDirection === DIRECTION_LEFT ||
      this.movingPixelDirection === DIRECTION_RIGHT
    ) {
      this.spritFacingDirection = this.movingPixelDirection;
    }
  }

  updateWalkFrame() {
    this.spriteWalkFrame = this.spriteWalkFrame === 1 ? 0 : 1;
  }

  tick() {
    this.tickMovingPixelProgress();
    this.tickAttemptAiMove();
  }

  tickMovingPixelProgress() {
    if (this.movingPixelsRemaining === 0) return;

    // console.log(this.movingPixelsRemaining);

    this.movingPixelsRemaining -= this.travelPixelsPerFrame;
    if (this.movingPixelsRemaining <= 0) {
      this.movingPixelsRemaining = 0;
      this.onDoneMoving();
    }
  }

  onDoneMoving() {
    //Update x,y
    const { x, y } = directionUpdateMap[this.movingPixelDirection];
    this.x += x;
    this.y += y;
    this.handleCollision();
    this.onPostMove();
  }

  onPostMove() {
    return null;
  }

  onAutoMovement(_direction) {
    return null;
  }

  handleCollision() {
    const collision = new Collision(this, this.level);

    this.skin = BODY_SKINS.NORMAL;
    const changesHeroSkin = collision.wtihChangesHeroSkin();
    if (changesHeroSkin) {
      this.skin = changesHeroSkin.changesHeroSkinOnCollide();
    }

    const collideThatAddsToInventory = collision.withPlacementAddsToInventory();
    if (collideThatAddsToInventory) {
      collideThatAddsToInventory.collect();
      this.level.addPlacement({
        type: PLACEMENT_TYPE_CELEBRATION,
        x: this.x,
        y: this.y,
      });
      soundsManager.playSfx(SFX.COLLECT);
    }

    const autoMovePlacement = collision.withPlacementMovesBody();
    if (autoMovePlacement) {
      this.onAutoMovement(autoMovePlacement.autoMovesBodyOnCollide(this));
    }

    if (collision.withDoorSwitch()) {
      this.level.switchAllDoors();
    }

    //Resets   Inventory
    if (collision.withStealsInventory()) {
      this.level.stealInventory();
    }

    const teleport = collision.withTeleport();
    if (teleport) {
      const pos = teleport.teleportsToPositionOnCollide(this);
      this.x = pos.x;
      this.y = pos.y;
      soundsManager.playSfx(SFX.TELEPORT);
    }

    const takesDamages = collision.withSelfGetsDamaged();
    if (takesDamages) {
      this.takesDamage(takesDamages.type);
    }

    const completesLevel = collision.withCompletesLevel();
    if (completesLevel) {
      this.level.completeLevel();
      soundsManager.playSfx(SFX.WIN);
    }

    const enterLevel = collision.withEntersLevel();
    if (enterLevel) {
      this.level.enterLevel();
    }
  }

  takesDamage() {
    return null;
  }

  getYTranslate() {
    //Stand on ground
    if (this.movingPixelsRemaining === 0 || this.skin != BODY_SKINS.NORMAL) {
      return 0;
    }

    //Hoping while run code
    //Elevate ramp up or down at beginning/end of movement
    const PIXELS_FROM_END = 2;
    if (
      this.movingPixelsRemaining < PIXELS_FROM_END ||
      this.movingPixelsRemaining > 16 - PIXELS_FROM_END
    ) {
      return -1;
    }
    return -2;
  }

  zIndex() {
    return this.y * Z_INDEX_LAYER_SIZE;
  }
}

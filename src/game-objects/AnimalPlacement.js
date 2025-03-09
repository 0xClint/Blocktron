import {
  DIRECTION_DOWN,
  DIRECTION_LEFT,
  DIRECTION_RIGHT,
  DIRECTION_UP,
} from "@/helpers/consts";
import { BodyPlacement } from "./BodyPlacement";
import Animal from "@/components/object-graphics/Animal";
import { TILES } from "@/helpers/tiles";

export class AnimalPlacement extends BodyPlacement {
  constructor(properties, level) {
    super(properties, level);

    //Enemy Speed Control
    this.trait = properties.trait ?? 1;
    this.jump = properties.jump ?? false;
    this.tickBetweenMovesInterval = 28;
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.turnsAroundAtWater = true;
    this.interactsWithGround = true;
    this.movingPixelDirection = properties.initialDirection ?? DIRECTION_RIGHT;
  }

  tickAttemptAiMove() {

    if (this.ticksUntilNextMove > 0) {
      this.ticksUntilNextMove -= 1;
      return;
    }

    this.internalMoveRequested(this.movingPixelDirection);
  }


  internalMoveRequested(direction) {
    //Attempt to start moving
    if (this.movingPixelsRemaining > 0) {
      return;
    }

    if (this.isSolidAtNextPosition(direction)) {
      this.switchDirection();
      return;
    }

    //Start the move
    this.ticksUntilNextMove = this.tickBetweenMovesInterval;
    this.movingPixelsRemaining = 16;
    this.movingPixelDirection = direction;
    this.updateFacingDirection();
    this.updateWalkFrame();
  }

  onAutoMovement(direction) {
    this.internalMoveRequested(direction);
  }

  switchDirection() {
    const currentDir = this.movingPixelDirection;

    //Horizontal change
    if (currentDir === DIRECTION_LEFT || currentDir === DIRECTION_RIGHT) {
      this.movingPixelDirection =
        currentDir === DIRECTION_LEFT ? DIRECTION_RIGHT : DIRECTION_LEFT;
      return;
    }

    //Vertical Changes
    this.movingPixelDirection =
      currentDir === DIRECTION_UP ? DIRECTION_DOWN : DIRECTION_UP;
  }

  getFrame() {
    const leftKey = `ANIMAL${this.trait}_LEFT`;
    const rightKey = `ANIMAL${this.trait}_RIGHT`;

    if (this.spritFacingDirection === DIRECTION_LEFT) {
      return TILES[leftKey][this.level.animalAnimatedFrames.animalLeftFrame];
    }
    return TILES[rightKey][this.level.animalAnimatedFrames.animalLeftFrame];
  }

  renderComponent() {
    return (
      <Animal
        frameCoord={this.getFrame()}
        yTranslate={this.jump && this.getYTranslate()}
        showShadow={true}
      />
    );
  }
}

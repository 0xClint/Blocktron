import { TILES } from "@/helpers/tiles";
import { PlacementTypeAnimationFrames } from "./PlacementTypeAnimationFrames";
import { AnimalAnimtaionFrames } from "./AnimalAnimtaionFrames";

const ANIMAL1_LEFT_SEQUENCE = [
  TILES.ANIMAL_LEFT1,
  TILES.ANIMAL_LEFT2,
  TILES.ANIMAL_LEFT3,
  TILES.ANIMAL_LEFT4,
];
const ANIMAL_RIGHT_SEQUENCE = [
  TILES.ANIMAL_RIGHT1,
  TILES.ANIMAL_RIGHT2,
  TILES.ANIMAL_RIGHT3,
  TILES.ANIMAL_RIGHT4,
];
const ANIMAL_ANIMATION_SPEED = 20;

const ANIMATION_SPEED = 4;
export class AnimalAnimatedFrames {
  constructor() {
    this.animalLeftFrames = new AnimalAnimtaionFrames(
      ANIMATION_SPEED,
      ANIMAL_ANIMATION_SPEED
    );
    this.animalRightFrames = new AnimalAnimtaionFrames(
      ANIMATION_SPEED,
      ANIMAL_ANIMATION_SPEED
    );
  }

  // Public method for progressing in animation
  tick() {
    this.animalLeftFrames.tick();
    this.animalRightFrames.tick();
  }

  get animalLeftFrame() {
    return this.animalLeftFrames.activeFrame;
  }
  get animalRightFrame() {
    return this.animalRightFrames.activeFrame;
  }
}

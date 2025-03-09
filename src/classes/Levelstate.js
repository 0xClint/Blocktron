import { PLACEMENT_TYPE_HERO, PLACEMENT_TYPE_WALL } from "@/helpers/consts";
import { placementFactory } from "./PlacementFactory";
import { GameLoop } from "./GameLoop";
import { DirectionControls } from "./DirectionControls";
import { Inventory } from "./Inventory";
import { LevelAnimatedFrames } from "./LevelAnimatedFrames";
import { Camera } from "./Camera";
import { Clock } from "./Clock";
import { AnimalAnimatedFrames } from "./AnimalAnimatedFrames";
import {
  NFT_ATTRIBUTES,
  NFT_DESCRIPTION,
  NFT_LAND_IMAGE,
} from "@/helpers/NFTMetadata";

export class LevelState {
  constructor(levelId, levelData, onEmit) {
    this.id = levelId;
    this.onEmit = onEmit;
    this.directionControls = new DirectionControls();
    this.editModePlacementType = { type: PLACEMENT_TYPE_WALL, trait: null };
    this.levelData = levelData;
    this.isEditorMode = true;
    //Start the level
    this.start();

    //NFT MetaData
    this.name = levelId;
    this.attributes = NFT_ATTRIBUTES;
    this.description = NFT_DESCRIPTION;
    this.image = NFT_LAND_IMAGE;
  }

  start() {
    this.isCompleted = false;
    this.deathOutcome = null;
    this.showLevelList = false;

    const levelData = this.levelData;
    // console.log(levelData);
    this.theme = levelData.theme;
    this.tilesWidth = levelData.tilesWidth;
    this.tilesHeight = levelData.tilesHeight;
    this.placements = levelData.placements.map((config) => {
      return placementFactory.createPlacement(config, this);
    });

    //Fresh Inventory
    this.inventory = new Inventory();

    //Create fram animation manager
    this.animatedFrames = new LevelAnimatedFrames();

    //Create fram animation manager
    this.animalAnimatedFrames = new AnimalAnimatedFrames();

    //Cache a reference to the Hero
    this.heroRef = this.placements.find((p) => p.type == PLACEMENT_TYPE_HERO);

    //Create a Camera
    this.camera = new Camera(this);

    //Create a Clock

    this.clock = new Clock(60, this);

    this.startGameLoop();
  }

  startGameLoop() {
    this.gameLoop?.stop();
    this.gameLoop = new GameLoop(() => {
      this.tick();
    });
  }

  addPlacement(config) {
    this.placements.push(placementFactory.createPlacement(config, this));
  }

  deletePlacement(placementToRemove) {
    this.placements = this.placements.filter((p) => {
      return p.id !== placementToRemove.id;
    });
  }

  copyPlacementsToClipboard() {
    // Convert the Placements to type,x,y JSON
    const placementsData = this.placements.map((p) => {
      return {
        type: p.type,
        x: p.x,
        y: p.y,
      };
    });

    // Copy the data to the clipboard for moving into map files after editing
    navigator.clipboard.writeText(JSON.stringify(placementsData)).then(
      () => {
        console.log("Content copied to clipboard");

        // Also console log the output
        console.log(placementsData);
      },
      () => {
        console.error("Failed to copy");
      }
    );
  }

  editTileHeight() {
    this.tilesHeight = this.tilesHeight + 4;
  }

  editTileWidth() {
    this.tilesWidth = this.tilesWidth + 4;
  }

  getPlacementsData() {
    // Convert the Placements to type,x,y JSON
    this.gameLoop.stop();
    return {
      //NFT Data
      name: this.name,
      description: this.description,
      image: this.image,
      attributes: this.attributes,

      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements.map(({ type, x, y }) => ({ type, x, y })),
    };
  }

  setEditModePlacementType(type, trait = null) {
    this.editModePlacementType = { type, trait };
  }

  tick() {
    //Check for movement here
    if (this.directionControls.direction) {
      this.heroRef.controllerMoveRequested(this.directionControls.direction);
    }

    //Call tick on any placement that wants to update
    this.placements.forEach((placement) => {
      placement.tick();
    });

    //Work on animation frames
    this.animatedFrames.tick();

    //Work on animation frames
    this.animalAnimatedFrames.tick();

    //Update the camera
    this.camera.tick();

    //Update the clock
    this.clock.tick();

    // Emit any changes in React
    this.onEmit(this.getState());
  }

  isPositionOutOfBounds(x, y) {
    return x == 0 || y == 0 || x > this.tilesWidth || y > this.tilesHeight;
  }

  switchAllDoors() {
    this.placements.forEach((placement) => {
      if (placement.toggleIsRaised) {
        placement.toggleIsRaised();
      }
    });
  }

  stealInventory() {
    this.placements.forEach((p) => {
      p.resetHasBeenCollected();
    });
    this.inventory.clear();
  }

  setDeathOutcome(causeOfDeath) {
    this.deathOutcome = causeOfDeath;
    this.gameLoop.stop();
  }

  completeLevel() {
    this.isCompleted = true;
    this.gameLoop.stop();
  }

  enterLevel() {
    this.showLevelList = true;
    this.gameLoop.stop();
  }

  toggleEditorMode(arg) {
    this.isEditorMode = arg;
  }

  turnOffClock() {
    this.clock.stop();
  }

  getState() {
    return {
      theme: this.theme,
      tilesWidth: this.tilesWidth,
      tilesHeight: this.tilesHeight,
      placements: this.placements,
      deathOutcome: this.deathOutcome,
      isCompleted: this.isCompleted,
      cameraTransformX: this.camera.transformX,
      cameraTransformY: this.camera.transformY,
      secondsRemaining: this.clock.secondsRemaining,
      inventory: this.inventory,

      showLevelList: this.showLevelList,
      restart: () => {
        this.start();
      },

      //Edit mode API
      editorMode: this.isEditorMode,
      setEditorMode: this.toggleEditorMode.bind(this),
      editModePlacementType: this.editModePlacementType,
      addPlacement: this.addPlacement.bind(this),
      deletePlacement: this.deletePlacement.bind(this),
      setEditModePlacementType: this.setEditModePlacementType.bind(this),
      copyPlacementsToClipboard: this.copyPlacementsToClipboard.bind(this),
      getPlacementsData: this.getPlacementsData.bind(this),
      editTileHeight: this.editTileHeight.bind(this),
      editTileWidth: this.editTileWidth.bind(this),
      turnOffClock: this.turnOffClock.bind(this),
      getTileWidth: this.tilesWidth,
      getTileHeight: this.tilesHeight,
    };
  }

  destroy() {
    //Tear down the level
    this.gameLoop.stop();
    this.directionControls.unbind();
  }
}

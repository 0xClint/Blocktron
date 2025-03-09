import {
    LEVEL_THEMES,
    PLACEMENT_TYPE_ANIMAL,
    PLACEMENT_TYPE_CIABATTA,
    PLACEMENT_TYPE_CONVEYOR,
    PLACEMENT_TYPE_FIRE,
    PLACEMENT_TYPE_FIRE_PICKUP,
    PLACEMENT_TYPE_FLOUR,
    PLACEMENT_TYPE_FLYING_ENEMY,
    PLACEMENT_TYPE_GOAL,
    PLACEMENT_TYPE_GROUND_ENEMY,
    PLACEMENT_TYPE_HERO,
    PLACEMENT_TYPE_HOUSE,
    PLACEMENT_TYPE_ICE,
    PLACEMENT_TYPE_ICE_PICKUP,
    PLACEMENT_TYPE_KEY,
    PLACEMENT_TYPE_LOCK,
    PLACEMENT_TYPE_PLANT,
    PLACEMENT_TYPE_PLATE,
    PLACEMENT_TYPE_ROAMING_ENEMY,
    PLACEMENT_TYPE_SWITCH,
    PLACEMENT_TYPE_SWITCH_DOOR,
    PLACEMENT_TYPE_TELEPORT,
    PLACEMENT_TYPE_THIEF,
    PLACEMENT_TYPE_WALL,
    PLACEMENT_TYPE_WATER,
    PLACEMENT_TYPE_WATER_PICKUP,
  } from "@/helpers/consts";
  
  const level = {
    theme: LEVEL_THEMES.YELLOW,
    tilesWidth: 8,
    tilesHeight: 8,
    placements: [
      {
        x: 2,
        y: 2,
        type: PLACEMENT_TYPE_HERO,
      },
      {
        x: 8,
        y: 8,
        type: PLACEMENT_TYPE_GOAL,
      },
  
      {
        x: 3,
        y: 7,
        type: PLACEMENT_TYPE_WALL,
      },
      {
        x: 4,
        y: 7,
        type: PLACEMENT_TYPE_WALL,
      },
      {
        x: 4,
        y: 5,
        type: PLACEMENT_TYPE_WALL,
      },
      {
        x: 5,
        y: 5,
        type: PLACEMENT_TYPE_WALL,
      },
      {
        x: 6,
        y: 5,
        type: PLACEMENT_TYPE_WALL,
      },
      {
        x: 8,
        y: 5,
        type: PLACEMENT_TYPE_WALL,
      },
      {
        x: 7,
        y: 5,
        type: PLACEMENT_TYPE_WALL,
      },
  
      {
        x: 4,
        y: 4,
        type: PLACEMENT_TYPE_FLOUR,
      },
      {
        x: 7,
        y: 2,
        type: PLACEMENT_TYPE_FLOUR,
      },
      {
        x: 3,
        y: 6,
        type: PLACEMENT_TYPE_FLOUR,
      },
      {
        x: 1,
        y: 8,
        type: PLACEMENT_TYPE_FLOUR,
      },
      {
        x: 2,
        y: 5,
        type: PLACEMENT_TYPE_GROUND_ENEMY,
      },
    ],
  };
  
  export default level;
  
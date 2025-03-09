import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FIRE,
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_FLYING_ENEMY,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_GROUND_ENEMY,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_TELEPORT,
  PLACEMENT_TYPE_WALL,
} from "@/helpers/consts";

const level = {
  theme: LEVEL_THEMES.GRAY,
  tilesWidth: 9,
  tilesHeight: 8,
  placements: [
    {
      x: 1,
      y: 1,
      type: PLACEMENT_TYPE_HERO,
    },
    {
      x: 9,
      y: 8,
      type: PLACEMENT_TYPE_GOAL,
    },

    {
      x: 1,
      y: 5,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 2,
      y: 1,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 2,
      y: 2,
      type: PLACEMENT_TYPE_WALL,
    },

    {
      x: 2,
      y: 4,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 2,
      y: 5,
      type: PLACEMENT_TYPE_WALL,
    },

    {
      x: 2,
      y: 7,
      type: PLACEMENT_TYPE_WALL,
    },

    {
      x: 4,
      y: 1,
      type: PLACEMENT_TYPE_WALL,
    },

    {
      x: 4,
      y: 3,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 4,
      y: 4,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 4,
      y: 5,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 4,
      y: 6,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 4,
      y: 7,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 4,
      y: 8,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 6,
      y: 1,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 6,
      y: 2,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 6,
      y: 3,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 6,
      y: 4,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 6,
      y: 5,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 6,
      y: 6,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 6,
      y: 7,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 6,
      y: 8,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 1,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 2,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 3,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 4,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 5,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 6,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 7,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 8,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 8,
      y: 7,
      type: PLACEMENT_TYPE_FIRE,
    },
    {
      x: 2,
      y: 8,
      type: PLACEMENT_TYPE_FIRE_PICKUP,
    },

    {
      x: 3,
      y: 4,
      type: PLACEMENT_TYPE_FLOUR,
    },
    {
      x: 1,
      y: 4,
      type: PLACEMENT_TYPE_TELEPORT,
    },
    {
      x: 8,
      y: 1,
      type: PLACEMENT_TYPE_TELEPORT,
    },
    {
      x: 1,
      y: 6,
      type: PLACEMENT_TYPE_TELEPORT,
    },
    {
      x: 5,
      y: 1,
      type: PLACEMENT_TYPE_FLOUR,
    },
    {
      x: 7,
      y: 6,
      type: PLACEMENT_TYPE_FLOUR,
    },
    {
      x: 1,
      y: 8,
      type: PLACEMENT_TYPE_FLOUR,
    },
    {
      x: 1,
      y: 8,
      type: PLACEMENT_TYPE_FLYING_ENEMY,
      initialDirection: "UP",
    },
    {
      x: 2,
      y: 3,
      type: PLACEMENT_TYPE_GROUND_ENEMY,
    },
  ],
};

export default level;

import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
  PLACEMENT_TYPE_WATER,
  PLACEMENT_TYPE_WATER_PICKUP,
} from "@/helpers/consts";

const level = {
  theme: LEVEL_THEMES.GREEN,
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
      x: 6,
      y: 6,
      type: PLACEMENT_TYPE_WATER,
    },
    {
      x: 6,
      y: 7,
      type: PLACEMENT_TYPE_WATER,
    },
    {
      x: 6,
      y: 8,
      type: PLACEMENT_TYPE_WATER,
    },
    {
      x: 7,
      y: 6,
      type: PLACEMENT_TYPE_WATER,
    },
    {
      x: 8,
      y: 6,
      type: PLACEMENT_TYPE_WATER,
    },
    {
      x: 4,
      y: 6,
      type: PLACEMENT_TYPE_WATER_PICKUP,
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
      x: 5,
      y: 7,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      x: 5,
      y: 6,
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
      x: 4,
      y: 2,
      type: PLACEMENT_TYPE_FLOUR,
    },
    {
      x: 5,
      y: 4,
      type: PLACEMENT_TYPE_FLOUR,
    },
  ],
};

export default level;

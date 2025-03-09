import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_WALL,
} from "@/helpers/consts";

const level = {
  theme: LEVEL_THEMES.GREEN,
  tilesWidth: 40,
  tilesHeight: 20,
  placements: [
    {
      id: 0,
      x: 2,
      y: 2,
      type: PLACEMENT_TYPE_HERO,
    },
    {
      id: 1,
      x: 6,
      y: 4,
      type: PLACEMENT_TYPE_GOAL,
    },
    {
      id: 2,
      x: 4,
      y: 4,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      id: 3,
      x: 5,
      y: 2,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      id: 4,
      x: 6,
      y: 6,
      type: PLACEMENT_TYPE_WALL,
    },
    {
      id: 5,
      x: 4,
      y: 3,
      type: PLACEMENT_TYPE_FLOUR,
    },
    {
      id: 6,
      x: 5,
      y: 3,
      type: PLACEMENT_TYPE_FLOUR,
    },
    {
      id: 7,
      x: 4,
      y: 6,
      type: PLACEMENT_TYPE_FLOUR,
    },
    {
      id: 7,
      x: 4,
      y: 6,
      type: PLACEMENT_TYPE_FLOUR,
    },
  ],
};

export default level;

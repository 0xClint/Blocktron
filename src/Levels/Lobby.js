import {
  LEVEL_THEMES,
  PLACEMENT_TYPE_FIRE_PICKUP,
  PLACEMENT_TYPE_FLOUR,
  PLACEMENT_TYPE_GOAL,
  PLACEMENT_TYPE_HERO,
  PLACEMENT_TYPE_LEVEL_ENTRY,
  PLACEMENT_TYPE_TELEPORT,
  PLACEMENT_TYPE_WALL,
} from "@/helpers/consts";
import {
  NFT_ATTRIBUTES,
  NFT_DESCRIPTION,
  NFT_LAND_IMAGE,
} from "@/helpers/NFTMetadata";

const level = {
  description: NFT_DESCRIPTION,
  attributes: NFT_ATTRIBUTES,
  image: NFT_LAND_IMAGE,

  theme: LEVEL_THEMES.GREEN,
  tilesWidth: 9,
  tilesHeight: 8,
  placements: [
    {
      id: 0,
      x: 2,
      y: 2,
      type: PLACEMENT_TYPE_HERO,
    },

    {
      id: 0,
      x: 9,
      y: 8,
      type: PLACEMENT_TYPE_LEVEL_ENTRY,
    },
  ],
};

export default level;

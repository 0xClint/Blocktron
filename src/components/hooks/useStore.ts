import { nanoid } from "nanoid";
import create from "zustand";

import { imgData } from "../images/Items";

const getlocalStorage = (key) => JSON.parse(window.localStorage.getItem(key));
const setLocalStorage = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  blockTexture: "grass",
  setBlockTexture: (blockTexture) => {
    set(() => ({ blockTexture }));
  },
  cubes: [],
  setData: (data) => {
    if (data) {
      set(() => ({
        cubes: [...data.cubes],
        items: [...data.items],
      }));
    }
  },
}));

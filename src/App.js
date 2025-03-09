import { useEffect } from "react";
import { SPRITE_SHEET_SRC } from "./helpers/consts";
import { useRecoilState } from "recoil";
import { spriteSheetImageAtom } from "./atoms/spriteSheetImageAtom";
import RenderGame from "./components/level-layout/RenderGame";
import level from "./Levels/Level1";


export default function App({ gameData }) {
  const [spriteSheetImage, setSpriteSheetImage] =
    useRecoilState(spriteSheetImageAtom);

  useEffect(() => {
    const image = new Image();
    image.src = SPRITE_SHEET_SRC;
    image.onload = () => {
      setSpriteSheetImage(image);
    };
  }, [setSpriteSheetImage]);

  if (!spriteSheetImage) return null;
  // return <RenderGame gameData={level} />;
  return <RenderGame gameData={gameData} />;
}

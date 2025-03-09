import { spriteSheetImageAtom } from "@/atoms/spriteSheetImageAtom";
import { CELL_SIZE } from "@/helpers/consts";
import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

function Sprite({ frameCoord, size = 16 }) {
  const spriteSheetImage = useRecoilValue(spriteSheetImageAtom);

  const canvasRef = useRef();

  useEffect(() => {
    /** @type {HTMLCanvasElement}*/
    const canvasEl = canvasRef.current;
    const ctx = canvasEl.getContext("2d");

    //Clear out anyting in the canvas tag
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);

    //Draw a graphic to the canvas tag
    //frameCoord : 0x2
    const tileSheetX = Number(frameCoord.split("x")[0]);
    const tileSheetY = Number(frameCoord.split("x")[1]);

    ctx.drawImage(
      spriteSheetImage, //Image to pull from
      tileSheetX * CELL_SIZE, // Left X corner of frame
      tileSheetY * CELL_SIZE, // Top Y corner of frame
      size, //Crop from sprite sheet(x)
      size, //Crop from sprite sheet(y)
      0, //Where to place(x)
      0, //Where to place (y)
      size, //Scale(x)
      size //Scale(y)
    );
  }, [frameCoord, size, spriteSheetImage]);
  return <canvas width={size} height={size} ref={canvasRef} />;
}

const MemoizedSprite = React.memo(Sprite);

export default MemoizedSprite;

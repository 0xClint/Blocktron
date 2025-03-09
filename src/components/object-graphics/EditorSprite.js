import { spriteSheetImageAtom } from "@/atoms/spriteSheetImageAtom";
import { CELL_SIZE } from "@/helpers/consts";
import React, { useEffect, useRef } from "react";
import { useRecoilValue } from "recoil";

function EditorSprite({ frameCoord, size = 16, multipler = 1.5 }) {
  const spriteSheetImage = useRecoilValue(spriteSheetImageAtom);
  const sizeT = size * multipler;

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
      sizeT, //Scale(x)
      sizeT //Scale(y)
    );
  }, [frameCoord, size, spriteSheetImage]);
  return <canvas width={sizeT} height={sizeT} ref={canvasRef} />;
}

const MemoizedEditorSprite = React.memo(EditorSprite);

export default MemoizedEditorSprite;

import React, { useEffect, useState } from "react";
import EditorSprite from "@/components/object-graphics/EditorSprite";
import { editorData } from "@/helpers/editorData";
import { useGame } from "@/contexts/GameProvider";
import { LockIcon } from "@/assets/Icons";

const EditorDropdown = ({ level }) => {
  const [activeSprite, setActiveSprite] = useState(null);
  const [activeTrait, setActiveTrait] = useState(null);
  const { userLevels } = useGame();

  const handleOnSelect = (value, trait) => {
    setActiveSprite(value);
    setActiveTrait(trait);
    level.setEditModePlacementType(value, trait);
  };

  if (!level.editorMode) {
    return null;
  }

  return (
    <div className="absolute card-container right-2 flex flex-col gap-1">
      <span className="scale-[0.5] text-[#694933] w-10">Editor</span>
      <div className=" flex justify-center w-[80px]  max-h-[400px] flex-wrap gap-1.5">
        {editorData.map(({ id, trait, frameCoord, levelCap, value }) => {
          const isOpen = levelCap <= userLevels;
          if (levelCap <= userLevels + 3)
            return (
              <div
                key={id}
                onClick={() => {
                  if (isOpen) handleOnSelect(value, trait);
                }}
                className={`p-[4px] border border-black rounded-sm  ${
                  !isOpen && "opacity-30"
                }  ${
                  activeSprite == value &&
                  (trait == null ? true : trait == activeTrait)
                    ? " border-red-950 border-2"
                    : "border-black"
                }`}
              >
                {!isOpen && (
                  <span className="absolute h-3 w-3 text-black">
                    <LockIcon />
                  </span>
                )}
                <EditorSprite frameCoord={frameCoord} className="" />
              </div>
            );
        })}
        {/* <button
          onClick={() => {
            level.copyPlacementsToClipboard();
          }}
        >
          Copy
        </button> */}
      </div>
    </div>
  );
};

export default EditorDropdown;

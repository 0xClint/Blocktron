// import { useEffect } from "react";

// export function useKeyPress(key, callback) {
//   useEffect(() => {
//     const handler = (e) => {
//       if (e.key === key) {
//         callback();
//       }
//     };

//     //Add to document
//     document.addEventListener("keydown", handler);

//     //Remove from document on unmount
//     return () => {
//       document.removeEventListener("keydown", handler);
//     };
//   }, [key, callback]);
// }

import { useEffect, useState } from "react";

export function useKeyPress(keys = [], callback) {
  const [pressedKeys, setPressedKeys] = useState(new Set());

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (keys.includes(e.key)) {
        setPressedKeys(
          (prevPressedKeys) => new Set(prevPressedKeys.add(e.key))
        );
      }
    };

    const handleKeyUp = (e) => {

      if (keys.includes(e.key)) {
        setPressedKeys((prevPressedKeys) => {
          const updatedKeys = new Set(prevPressedKeys);
          updatedKeys.delete(e.key);
          return updatedKeys;
        });
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [keys]);

  useEffect(() => {
    // Trigger the callback only if all specified keys are pressed
    if (keys.every((key) => pressedKeys.has(key))) {
      callback();
    }
  }, [pressedKeys, keys, callback]);
}

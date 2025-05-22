import { useMemo } from "react";

import type { Coords, Shape } from "@/Types";

type Args = {
  currentStack: Coords[];
  savedStack?: Shape[];
  precision?: number;
};

export const useClipPathStyle = ({
  currentStack,
  savedStack = [],
  precision = 2,
}: Args): string => {
  const clipPathStyle = useMemo(() => {
    if (savedStack.length === 0 && currentStack.length === 0) {
      return "";
    }
    let clipPathString = "shape(";
    savedStack.forEach((stack, savedStackIndex) => {
      if (stack.shape === "circle") {
        // Circle so need the first and the last points.
        if (stack.coords.length > 0) {
          stack.coords.forEach((stackItem, stackIndex, stackArray) => {
            const percentX = stackItem.percentX.toFixed(precision);
            const percentY = stackItem.percentY.toFixed(precision);
            const firstPositionX = stackArray[0].percentX.toFixed(precision);
            const firstPositionY = stackArray[0].percentY.toFixed(precision);

            if (savedStackIndex === 0 && stackIndex === 0) {
              clipPathString += `from ${percentX}% ${percentY}%, `;
            } else if (stackIndex === 0) {
              clipPathString += `move to ${percentX}% ${percentY}%, `;
            } else {
              clipPathString += `arc to ${percentX}% ${percentY}% of 1% cw, `;

              clipPathString += `arc to ${firstPositionX}% ${firstPositionY}% of 1% cw, `;
            }
          });
        }
      } else {
        if (stack.coords.length > 0) {
          stack.coords.forEach((stackItem, stackIndex) => {
            const percentX = stackItem.percentX.toFixed(precision);
            const percentY = stackItem.percentY.toFixed(precision);

            if (savedStackIndex === 0 && stackIndex === 0) {
              clipPathString += `from ${percentX}% ${percentY}%, `;
            } else if (stackIndex === 0) {
              clipPathString += `move to ${percentX}% ${percentY}%, `;
            } else {
              clipPathString += `line to ${percentX}% ${percentY}%, `;
            }
          });
        }
      }
    });

    // This is the current in progress cutout area.
    currentStack.forEach((item, index) => {
      const percentX = item.percentX.toFixed(precision);
      const percentY = item.percentY.toFixed(precision);
      if (index === 0) {
        clipPathString += `${
          savedStack.length === 0 ? "from" : "move to"
        } ${percentX}% ${percentY}%, `;
      } else {
        clipPathString += `line to ${percentX}% ${percentY}%, `;
      }
    });

    clipPathString += " close)";

    return clipPathString;
  }, [savedStack, currentStack, precision]);

  return clipPathStyle;
};

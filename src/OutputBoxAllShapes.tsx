import { useMemo } from "react";
import type { Shape, Coords } from "./Types";

type Props = {
  savedStack: Shape[];
  currentStack: Coords[];
  selectedImage?: string;
};

export const OutputBoxAllShapes = ({
  savedStack,
  currentStack,
  selectedImage,
}: Props) => {
  const clipPathStyle = useMemo(() => {
    if (savedStack.length === 0 && currentStack.length === 0) {
      return "";
    }
    let clipPathString = "shape(";
    savedStack.forEach((stack, savedStackIndex) => {
      if (stack.length > 0) {
        stack.forEach((stackItem, stackIndex) => {
          if (savedStackIndex === 0 && stackIndex === 0) {
            clipPathString += `from ${stackItem.percentX}% ${stackItem.percentY}%, `;
          } else if (stackIndex === 0) {
            clipPathString += `move to ${stackItem.percentX}% ${stackItem.percentY}%, `;
          } else {
            clipPathString += `line to ${stackItem.percentX}% ${stackItem.percentY}%, `;
          }
        });
        // clipPathString += " close, ";
      }
    });

    // This is the current in progress cutout area.
    currentStack.forEach((item, index) => {
      if (index === 0) {
        clipPathString += `${savedStack.length === 0 ? "from" : "move to"} ${
          item.percentX
        }% ${item.percentY}%, `;
      } else {
        clipPathString += `line to ${item.percentX}% ${item.percentY}%, `;
      }
    });

    clipPathString += " close)";

    return clipPathString;
  }, [savedStack, currentStack]);

  return (
    <div
      className="output"
      style={{
        backgroundColor: "green",
        backgroundImage: selectedImage !== "" ? `url(${selectedImage})` : "",
        clipPath: clipPathStyle,
      }}
    ></div>
  );
};

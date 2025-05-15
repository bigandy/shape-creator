import { useMemo } from "react";
import type { Coords } from "./Types";

type Props = {
  stack: Coords[];
};

export const OutputBox = ({ stack }: Props) => {
  const clipPathStyle = useMemo(() => {
    if (stack.length === 0) {
      return "";
    } else {
      let clipPathString = "";
      stack.forEach((item, index) => {
        if (index === 0) {
          clipPathString = `shape(from ${item.percentX}% ${item.percentY}%, `;
        } else {
          clipPathString += `line to ${item.percentX}% ${item.percentY}%, `;
        }
      });

      return clipPathString + " close)";
    }
  }, [stack]);

  return (
    <div
      className="output"
      style={{
        background: "red",
        clipPath: clipPathStyle,
      }}
    ></div>
  );
};

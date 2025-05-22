import { useMemo } from "react";
import type { Coords } from "@/Types";

type Props = {
  stack: Coords[];
  backgroundImage?: string;
};

export const OutputBox = ({ stack, backgroundImage }: Props) => {
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
        backgroundColor: "red",
        backgroundImage:
          backgroundImage !== "" ? `url(${backgroundImage})` : "",
        clipPath: stack.length >= 3 ? clipPathStyle : "",
      }}
    ></div>
  );
};

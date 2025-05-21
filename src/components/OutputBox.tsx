import { useMemo } from "react";
import type { Coords } from "@/Types";

type Props = {
  stack: Coords[];
  selectedImage?: string;
};

export const OutputBox = ({ stack, selectedImage }: Props) => {
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
        backgroundImage: selectedImage !== "" ? `url(${selectedImage})` : "",
        clipPath: stack.length >= 3 ? clipPathStyle : "",
      }}
    ></div>
  );
};

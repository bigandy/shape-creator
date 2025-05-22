import type { Shape, Coords } from "@/Types";
import { useClipPathStyle } from "@hooks/useClipPathStyle";

type Props = {
  savedStack: Shape[];
  currentStack: Coords[];
  backgroundImage?: string;
  precision: number;
};

export const OutputBoxAllShapes = ({
  savedStack,
  currentStack,
  backgroundImage,
  precision,
}: Props) => {
  const clipPath = useClipPathStyle({
    currentStack,
    savedStack,
    precision,
  });

  return (
    <div
      className="output"
      style={{
        // backgroundColor: "green",
        backgroundImage:
          backgroundImage !== "" ? `url(${backgroundImage})` : "",
        clipPath,
      }}
    ></div>
  );
};

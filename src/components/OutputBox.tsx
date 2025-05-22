import type { Shape, Coords } from "@/Types";
import { useClipPathStyle } from "@hooks/useClipPathStyle";

type Props = {
  savedStack: Shape[];
  currentStack: Coords[];
  backgroundImage?: string;
  precision: number;
};

export const OutputBox = ({
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
        backgroundImage:
          backgroundImage !== "" ? `url(${backgroundImage})` : "",
        clipPath,
      }}
    ></div>
  );
};

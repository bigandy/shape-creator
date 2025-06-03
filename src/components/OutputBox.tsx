import type { Shape, Coords } from "@/Types";
import { useClipPathStyle } from "@hooks/useClipPathStyle";
import { Fragment } from "react/jsx-runtime";

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
    <Fragment>
      <div
        className="output"
        style={{
          backgroundImage:
            backgroundImage !== "" ? `url(${backgroundImage})` : "",
          clipPath,
        }}
      ></div>

      <div
        className="output-hover"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            backgroundImage !== "" ? `url(${backgroundImage})` : "",
        }}
      ></div>
    </Fragment>
  );
};

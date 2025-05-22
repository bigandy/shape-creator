import { useClipPathStyle } from "@/hooks/useClipPathStyle";
import type { Coords } from "@/Types";

type Props = {
  stack: Coords[];
  backgroundImage?: string;
};

export const OutputBox = ({ stack, backgroundImage }: Props) => {
  const clipPathStyle = useClipPathStyle({ currentStack: stack });

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

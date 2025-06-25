import { type MouseEvent } from "react";
import { GridLines } from "../GridLines";
import { useStackContext } from "@hooks/useStackContext";

interface Props extends React.PropsWithChildren {
  handleClick?: (event: MouseEvent<HTMLDivElement>) => void;
  handleMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
  handleMouseMove?: (event: MouseEvent<HTMLDivElement>) => void;
  handleMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
  handleMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
}

export const ClickAreaWrapper = ({
  handleClick = undefined,
  handleMouseDown = undefined,
  handleMouseMove = undefined,
  handleMouseUp = undefined,
  handleMouseLeave = undefined,
  clickAreaRef,
  children,
}: Props) => {
  const { snapTo } = useStackContext();

  return (
    <div
      className="click-area"
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={clickAreaRef}
    >
      {children}
      {snapTo && <GridLines />}
    </div>
  );
};

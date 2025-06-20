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
  handleClick,
  handleMouseDown,
  handleMouseMove,
  handleMouseUp,
  handleMouseLeave,
  clickAreaRef,
  children,
}: Props) => {
  const { snapTo } = useStackContext();
  return (
    <div
      className="click-area"
      onClick={handleClick ? handleClick : undefined}
      onMouseDown={handleMouseDown ? handleMouseDown : undefined}
      onMouseUp={handleMouseUp ? handleMouseUp : undefined}
      onMouseMove={handleMouseMove ? handleMouseMove : undefined}
      onMouseLeave={handleMouseLeave ? handleMouseLeave : undefined}
      ref={clickAreaRef}
    >
      {children}
      {snapTo && <GridLines />}
    </div>
  );
};

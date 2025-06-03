import {
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
  type MouseEvent,
} from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints";

import type { Coords } from "@/Types";
import { getCoordsAsPercentages } from "@utils/coordinates";

type Props = {
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
};

export const ClickAreaLine = ({ setStack, stack }: Props) => {
  const clickAreaRef = useRef<HTMLInputElement>(null);

  const [mousePosition, setMousePosition] = useState<Coords | null>(null);

  /**
   * Handles clicks on the Click area. Used for recording new points
   * and is used for the clip-path: shape() generation
   */
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const coords = getCoordsAsPercentages(event, clickAreaRef)!;

    setStack([...stack, coords]);
  };

  /**
   * This handles when the mouse cursor moves inside the click-area. It shows the position of the mouse with a div in the same style as the points on the DragAndDropPoints dots.
   */
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const coords = getCoordsAsPercentages(event, clickAreaRef)!;

    setMousePosition(coords);
  };

  // AHTODO: handle case when moving the mouse and dragging a point at the same time. At the moment handleMouseLeave kicks in and the point does not go out of the box.
  const handleMouseLeave = () => setMousePosition(null);

  return (
    <div
      className="click-area"
      onClick={handleClick}
      ref={clickAreaRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <DragAndDropPoints
        stack={stack}
        setStack={setStack}
        clickAreaRef={clickAreaRef}
      />

      {mousePosition && (
        <div
          className="mouse-position"
          style={{
            left: mousePosition?.percentX + "%",
            top: mousePosition?.percentY + "%",
          }}
        >
          {stack.length + 1}
        </div>
      )}
    </div>
  );
};

import { useRef, useState, type MouseEvent } from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints/index";

import type { Coords } from "@/Types";
import { getCoords } from "@utils/coordinates";
import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";

export const ClickAreaLine = () => {
  const { stackLength } = useStackContext();
  const dispatch = useStackDispatch();

  const clickAreaRef = useRef<HTMLInputElement>(null);

  const [mousePosition, setMousePosition] = useState<Coords | null>(null);

  /**
   * Handles clicks on the Click area. Used for recording new points
   * and is used for the clip-path: shape() generation
   */
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    const coords = getCoords(event, clickAreaRef)!;

    dispatch({
      type: "add-point",
      payload: { coords },
    });
  };

  /**
   * This handles when the mouse cursor moves inside the click-area. It shows the position of the mouse with a div in the same style as the points on the DragAndDropPoints dots.
   */
  const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
    const coords = getCoords(event, clickAreaRef)!;

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
      <DragAndDropPoints clickAreaRef={clickAreaRef} drawingMode="line" />

      {mousePosition && (
        <div
          className="mouse-position"
          style={{
            left: mousePosition?.percentX + "%",
            top: mousePosition?.percentY + "%",
          }}
        >
          {stackLength + 1}
        </div>
      )}
    </div>
  );
};

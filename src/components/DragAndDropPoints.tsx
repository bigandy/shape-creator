import { DndContext, type DragMoveEvent } from "@dnd-kit/core";

import { Draggable } from "@components/Draggable";

import { getDragDropCoords } from "@utils/coordinates";
import { useStackContext } from "@/hooks/useStackContext";
import { useStackDispatch } from "@/hooks/useStackDispatch";
import type { DrawingMode, Coords } from "@/Types";

type Props = {
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
  drawingMode: DrawingMode;
};

const getUpdateRectangleCoords = (
  updatedPositionCoord: Coords,
  previousCoords: Coords[],
  indexToUpdate: number
) => {
  const newCoords = [...previousCoords];
  newCoords[indexToUpdate] = updatedPositionCoord;

  // AHTODO: refactor this!
  if (indexToUpdate === 0) {
    // y of next point
    newCoords[1].percentX = updatedPositionCoord.percentX;
    // x of final point
    newCoords[3].percentY = updatedPositionCoord.percentY;
  } else if (indexToUpdate === 1) {
    // x of prev point
    newCoords[0].percentX = updatedPositionCoord.percentX;
    // y of next point
    newCoords[2].percentY = updatedPositionCoord.percentY;
  } else if (indexToUpdate === 2) {
    // y of prev point
    newCoords[1].percentY = updatedPositionCoord.percentY;
    // x of next point
    newCoords[3].percentX = updatedPositionCoord.percentX;
  } else if (indexToUpdate === 3) {
    // x of prev point
    newCoords[0].percentY = updatedPositionCoord.percentY;
    // y of next point
    newCoords[2].percentX = updatedPositionCoord.percentX;
  }

  return newCoords;
};

export const DragAndDropPoints = ({ clickAreaRef, drawingMode }: Props) => {
  const { activeStack } = useStackContext();

  const dispatch = useStackDispatch();

  const handleDragMove = (event: DragMoveEvent) => {
    const coords = getDragDropCoords(event, clickAreaRef)!;

    //@ts-expect-error AHTODO: Fix this
    const indexToUpdate = event.activatorEvent.target.textContent - 1;

    if (["line", "circle"].includes(drawingMode)) {
      const updatedCoords = activeStack.coords.map((c, i) => {
        if (i === indexToUpdate) {
          return coords;
        } else {
          return c;
        }
      });

      dispatch({
        type: "update-current-shape",
        payload: { coords: updatedCoords },
      });
    } else if (drawingMode === "rectangle") {
      const updatedCoords = getUpdateRectangleCoords(
        coords,
        activeStack.coords,
        indexToUpdate
      );

      dispatch({
        type: "update-current-shape",
        payload: { coords: updatedCoords },
      });
    } else {
      console.error("unknown shape", drawingMode);
    }
  };

  return (
    <DndContext onDragMove={handleDragMove}>
      {activeStack.coords && activeStack.coords.length > 0
        ? activeStack.coords.map((item, index) => {
            return (
              <Draggable
                index={index}
                key={`item-${index}`}
                top={item.percentY}
                left={item.percentX}
                data-plot-number={index + 1}
              >
                <div>{index + 1}</div>
              </Draggable>
            );
          })
        : null}
    </DndContext>
  );
};

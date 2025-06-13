import { DndContext, type DragMoveEvent } from "@dnd-kit/core";

import { Draggable } from "@components/Draggable";

import { getDragDropCoords } from "@utils/coordinates";
import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";
import type { DrawingMode, Coords } from "@/Types";
import { clamp } from "@utils/clamp";

const getUpdateRectangleCoords = (
  updatedPositionCoord: Coords,
  previousCoords: Coords[],
  indexToUpdate: number,
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

const getCenterPoint = (coords: Coords[], drawingMode: DrawingMode) => {
  if (drawingMode === "rectangle") {
    return {
      percentX: (coords[0].percentX + coords[2].percentX) / 2,
      percentY: (coords[0].percentY + coords[2].percentY) / 2,
    };
  } else if (drawingMode === "circle") {
    return {
      percentX: (coords[0].percentX + coords[1].percentX) / 2,
      percentY: (coords[0].percentY + coords[1].percentY) / 2,
    };
  } else {
    const coordsX = coords.map((coord) => coord.percentX);
    const coordsY = coords.map((coord) => coord.percentY);

    const minX = Math.min(...coordsX);
    const minY = Math.min(...coordsY);
    const maxX = Math.max(...coordsX);
    const maxY = Math.max(...coordsY);

    return {
      percentX: (minX + maxX) / 2,
      percentY: (minY + maxY) / 2,
    };
  }
};

const CenterPoint = ({
  coords,
  drawingMode,
}: {
  coords: Coords[];
  drawingMode: DrawingMode;
}) => {
  const middlePoint = getCenterPoint(coords, drawingMode);

  return (
    <Draggable
      index={1}
      top={clamp(middlePoint.percentY, 0, 100)}
      left={clamp(middlePoint.percentX, 0, 100)}
    >
      <div className="cursor-move">C</div>
    </Draggable>
  );
};

type Props = {
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
  drawingMode: DrawingMode;
};

export const DragAndDropPointsSingleShape = ({
  clickAreaRef,
  drawingMode,
}: Props) => {
  const { activeStack, isActiveStackBeingMoved } = useStackContext();

  const dispatch = useStackDispatch();

  const handleAllMove = (event: DragMoveEvent) => {
    const oldCoords = getCenterPoint(activeStack.coords, drawingMode);
    const newCoords = getDragDropCoords(event, clickAreaRef)!;

    const updatedCoords = activeStack.coords.map((coord) => {
      return {
        percentX: coord.percentX + newCoords.percentX - oldCoords.percentX,
        percentY: coord.percentY + newCoords.percentY - oldCoords.percentY,
      };
    });

    dispatch({
      type: "update-current-shape",
      payload: { coords: updatedCoords },
    });
  };
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
        indexToUpdate,
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
    <DndContext
      onDragMove={isActiveStackBeingMoved ? handleAllMove : handleDragMove}
    >
      {!isActiveStackBeingMoved &&
      activeStack.coords &&
      activeStack.coords.length > 0
        ? activeStack.coords.map((item, index) => {
            return (
              <Draggable
                index={index}
                key={`item-${index}`}
                top={item.percentY}
                left={item.percentX}
              >
                <div>{index + 1}</div>
              </Draggable>
            );
          })
        : null}

      {isActiveStackBeingMoved && (
        <CenterPoint coords={activeStack.coords} drawingMode={drawingMode} />
      )}
    </DndContext>
  );
};

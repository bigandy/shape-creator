import { type RefObject } from "react";

import { type DragMoveEvent } from "@dnd-kit/core";

import { Draggable } from "@components/Draggable";

import { CustomDnDWrapper } from "./CustomDnDWrapper";

import type { Coords, DrawingMode } from "@/Types";
import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";
import { clamp } from "@utils/clamp";
import {
  getDragDropCoords,
  getDragDropCoordsWithSnapping,
} from "@utils/coordinates";

const calculateNextValue = (
  direction: "up" | "down",
  indexToUpdate: number,
) => {
  let num = indexToUpdate;
  if (direction === "down") {
    num--;
  } else if (direction === "up") {
    num++;
  }

  // There are 4 sides so a max of 3 with index 0
  if (num > 3) {
    return 0;
  } else if (num < 0) {
    return 3;
  }
  return num;
};

const getUpdateRectangleCoords = (
  updatedPositionCoord: Coords,
  previousCoords: Coords[],
  indexToUpdate: number,
) => {
  const newCoords = [...previousCoords];
  newCoords[indexToUpdate] = updatedPositionCoord;

  const isEven = indexToUpdate % 2 === 0;

  const xIndex = calculateNextValue(isEven ? "up" : "down", indexToUpdate);
  const yIndex = calculateNextValue(isEven ? "down" : "up", indexToUpdate);

  newCoords[xIndex].percentX = updatedPositionCoord.percentX;
  newCoords[yIndex].percentY = updatedPositionCoord.percentY;

  return newCoords;
};

const getCenterPointCoords = (coords: Coords[], drawingMode: DrawingMode) => {
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
  const middlePoint = getCenterPointCoords(coords, drawingMode);

  return (
    <Draggable
      index={100}
      top={clamp(middlePoint.percentY, 0, 100)}
      left={clamp(middlePoint.percentX, 0, 100)}
      isCenter
    >
      <div className="cursor-move">C</div>
    </Draggable>
  );
};

type Props = {
  clickAreaRef: RefObject<HTMLDivElement | null>;
  drawingMode: DrawingMode;
};

export const DragAndDropPointsSingleShape = ({
  clickAreaRef,
  drawingMode,
}: Props) => {
  const { activeStack, isActiveStackBeingEdited, snapTo, xPoints, yPoints } =
    useStackContext();

  const dispatch = useStackDispatch();

  const handleMove = (event: DragMoveEvent) => {
    const eventText =
      (event.activatorEvent.target as HTMLElement)?.textContent ?? "";

    // The center point text is a "C"
    if (eventText === "C") {
      const oldCoords = getCenterPointCoords(activeStack.coords, drawingMode);
      const newCoords = getDragDropCoords(event, clickAreaRef)!;

      const updatedCoords = activeStack.coords.map((coord) => {
        return {
          percentX: coord.percentX + newCoords.percentX - oldCoords.percentX,
          percentY: coord.percentY + newCoords.percentY - oldCoords.percentY,
        };
      });

      // AHTODO: handle snapTo
      // AHTODO: Bug: maintain the aspect-ratio. But how??
      // if (snapTo) {
      //   const coords = updatedCoords.map((coord) => {
      //     const { percentX, percentY } = updateCoordsToSnap({
      //       percentX: coord.percentX,
      //       percentY: coord.percentY,
      //       xPoints,
      //       yPoints,
      //     });

      //     return {
      //       percentX,
      //       percentY,
      //     };
      //   });

      //   dispatch({
      //     type: "update-current-shape",
      //     payload: { coords: coords },
      //   });
      // } else {
      dispatch({
        type: "update-current-shape",
        payload: { coords: updatedCoords },
      });
      // }
    } else {
      const indexToUpdate = Number(eventText) - 1;

      // Otherwise points are all numbers
      const coords =
        snapTo && drawingMode !== "line"
          ? getDragDropCoordsWithSnapping(
              event,
              clickAreaRef,
              drawingMode,
              xPoints,
              yPoints,
            )!
          : getDragDropCoords(event, clickAreaRef)!;

      if (drawingMode === "line") {
        // update point being moved
        dispatch({
          type: "update-current-point",
          payload: {
            index: indexToUpdate,
            pointCoord: coords!,
          },
        });
      } else if (drawingMode === "circle") {
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
    }
  };

  return (
    <CustomDnDWrapper onDragMove={handleMove}>
      {activeStack.coords && activeStack.coords.length > 0
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

      {drawingMode !== "line" &&
        isActiveStackBeingEdited &&
        activeStack.coords.length > 1 && (
          <CenterPoint coords={activeStack.coords} drawingMode={drawingMode} />
        )}
    </CustomDnDWrapper>
  );
};

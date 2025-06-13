import { DndContext, type DragMoveEvent } from "@dnd-kit/core";

import { Draggable } from "@components/Draggable";

import { getDragDropCoords } from "@utils/coordinates";
import { useStackContext } from "@/hooks/useStackContext";
import { useStackDispatch } from "@/hooks/useStackDispatch";
import type { Shape } from "@/Types";

type Props = {
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
};

const getCenterPointAllShapes = (savedStack: Shape[]) => {
  // 1. get all coords
  const coords = [
    savedStack
      .filter((stack) => stack.coords.length)
      .map((stack) => stack.coords)
      .flat(),
  ];

  const coordsX = coords[0].map((coord) => coord.percentX);
  const coordsY = coords[0].map((coord) => coord.percentY);

  const minX = Math.min(...coordsX);
  const minY = Math.min(...coordsY);
  const maxX = Math.max(...coordsX);
  const maxY = Math.max(...coordsY);

  return {
    percentX: (minX + maxX) / 2,
    percentY: (minY + maxY) / 2,
  };
};

export const DragAndDropPointsAllShapes = ({ clickAreaRef }: Props) => {
  const { savedStack } = useStackContext();

  console.log({ savedStack });

  const dispatch = useStackDispatch();

  const middlePoint = getCenterPointAllShapes(savedStack);

  const handleAllMove = (event: DragMoveEvent) => {
    const oldCoords = getCenterPointAllShapes(savedStack);
    const newCoords = getDragDropCoords(event, clickAreaRef)!;

    const updatedShapes = savedStack.map((stack) => {
      const updatedCoords = stack.coords.map((coord) => {
        return {
          percentX: coord.percentX + newCoords.percentX - oldCoords.percentX,
          percentY: coord.percentY + newCoords.percentY - oldCoords.percentY,
        };
      });

      return {
        ...stack,
        coords: updatedCoords,
      };
    });

    dispatch({
      type: "update-all-shapes",
      payload: { savedStack: updatedShapes },
    });
  };

  if (savedStack.length === 0) {
    return null;
  }

  return (
    <DndContext onDragMove={handleAllMove}>
      <Draggable
        index={1}
        top={middlePoint.percentY}
        left={middlePoint.percentX}
      >
        <div className="cursor-move">C</div>
      </Draggable>
    </DndContext>
  );
};

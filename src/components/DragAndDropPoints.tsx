import { DndContext, type DragMoveEvent } from "@dnd-kit/core";

import { Draggable } from "@components/Draggable";

import { getDragDropCoords } from "@utils/coordinates";
import { useStackContext } from "@/hooks/useStackContext";
import { useStackDispatch } from "@/hooks/useStackDispatch";
import type { DrawingMode } from "@/Types";

type Props = {
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
  drawingMode: DrawingMode;
};

export const DragAndDropPoints = ({ clickAreaRef, drawingMode }: Props) => {
  const { savedStack, editingNumber } = useStackContext();

  const activeStack = savedStack[editingNumber];

  const dispatch = useStackDispatch();

  const handleDragMove = (event: DragMoveEvent) => {
    const coords = getDragDropCoords(event, clickAreaRef)!;

    if (!activeStack?.coords.length) {
      return;
    }

    //@ts-expect-error AHTODO: Fix this
    const indexToUpdate = event.activatorEvent.target.textContent - 1;

    if (drawingMode === "line") {
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
    } else {
      console.log("handle Editing in Rectangle and Circle");
    }
  };

  return (
    <DndContext onDragMove={handleDragMove}>
      {activeStack?.coords.length > 0
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

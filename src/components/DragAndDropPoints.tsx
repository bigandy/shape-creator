import { type Dispatch, type SetStateAction } from "react";
import { DndContext, type DragMoveEvent } from "@dnd-kit/core";

import type { Coords } from "@/Types";

import { Draggable } from "@components/Draggable";

import { getDragDropCoords } from "@utils/coordinates";

type Props = {
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
};

export const DragAndDropPoints = ({ stack, setStack, clickAreaRef }: Props) => {
  const handleDragMove = (event: DragMoveEvent) => {
    const coords = getDragDropCoords(event, clickAreaRef)!;

    //@ts-expect-error AHTODO: Fix this
    const indexToUpdate = event.activatorEvent.target.textContent - 1;

    const nextStack = stack.map((c, i) => {
      if (i === indexToUpdate) {
        return coords;
      } else {
        return c;
      }
    });

    setStack(nextStack);
  };

  return (
    <DndContext onDragMove={handleDragMove}>
      {stack.length > 0
        ? stack.map((item, index) => {
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

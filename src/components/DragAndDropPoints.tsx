import { type Dispatch, type SetStateAction } from "react";
import { DndContext, type DragMoveEvent } from "@dnd-kit/core";

import type { Coords } from "@/Types";

import { Draggable } from "@components/Draggable";

type Props = {
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
};

export const DragAndDropPoints = ({ stack, setStack, clickAreaRef }: Props) => {
  const handleDragMove = (event: DragMoveEvent) => {
    if (!clickAreaRef.current) {
      return;
    }

    const indexToUpdate = event.activatorEvent.target.textContent - 1;

    const initialX = event.activatorEvent.clientX;
    const initialY = event.activatorEvent.clientY;

    const newX = initialX + event.delta.x;
    const newY = initialY + event.delta.y;

    const { width, height } = clickAreaRef.current.getBoundingClientRect();

    const percentX = (newX / width) * 100;
    const percentY = (newY / height) * 100;

    const updatedStackValue = {
      percentX,
      percentY,
    };

    const nextStack = stack.map((c, i) => {
      if (i === indexToUpdate) {
        return updatedStackValue;
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

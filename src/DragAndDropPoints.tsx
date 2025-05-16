import { useRef, type SetStateAction, type Dispatch, useState } from "react";

import type { Coords } from "./Types";

import { Draggable } from "./Draggable";
import { DndContext } from "@dnd-kit/core";

type Props = {
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
};

export const DragAndDropPoints = ({ stack, setStack, clickAreaRef }: Props) => {
  const handleDragMove = (event) => {
    if (!clickAreaRef.current) {
      return;
    }

    const indexToUpdate = event.activatorEvent.target.dataset.plotNumber - 1;

    const initialX = event.activatorEvent.clientX;
    const initialY = event.activatorEvent.clientY;
    // console.log("onDragMove", event.delta.x, event.delta.y);

    const newX = initialX + event.delta.x;
    const newY = initialY + event.delta.y;

    const { width, height } = clickAreaRef.current.getBoundingClientRect();
    // console.log({ width, height, clientX, clientY });

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
              >
                <div className="plot-point" data-plot-number={index + 1} />
              </Draggable>
            );
          })
        : null}
    </DndContext>
  );
};

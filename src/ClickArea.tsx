import { useState, useRef, type SetStateAction, type Dispatch } from "react";
import { Draggable } from "./Draggable";
import { DndContext } from "@dnd-kit/core";

import type { Coords } from "./Types";

type Props = {
  isEditing: boolean;
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
};

export const ClickArea = ({ isEditing, setStack, stack }: Props) => {
  const clickAreaRef = useRef(null);

  /**
   * Handles clicks on the Click area. Used for recording new points
   * and is used for the clip-path: shape() generation
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const { width, height } = clickAreaRef?.current?.getBoundingClientRect();
    // console.log({ width, height, clientX, clientY });

    const percentX = (clientX / width) * 100;
    const percentY = (clientY / height) * 100;
    const coords = { percentX, percentY };

    setStack((stack) => {
      const newStack = [...stack];
      newStack.push(coords);
      return newStack;
    });
  };

  // AHTODO
  //   const handleDragMove = (e) => {
  //     if (!clickAreaRef.current) {
  //       return;
  //     }

  //     console.log({ e });
  //     const { width, height } = clickAreaRef.current.getBoundingClientRect();
  //     // console.log({ width, height });
  //   };

  const handleUpdatePoint = (index, defs) => {
    console.log(index, defs);
  };

  const handleDragMove = (event) => {
    const indexToUpdate = event.activatorEvent.target.dataset.plotNumber - 1;

    const initialX = event.activatorEvent.clientX;
    const initialY = event.activatorEvent.clientY;
    // console.log("onDragMove", event.delta.x, event.delta.y);

    const newX = initialX + event.delta.x;
    const newY = initialY + event.delta.y;

    const { width, height } = clickAreaRef?.current?.getBoundingClientRect();
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
    <div
      className="click-area"
      onClick={!isEditing ? handleClick : undefined}
      ref={clickAreaRef}
    >
      <DndContext onDragMove={handleDragMove}>
        {stack.length > 0
          ? stack.map((item, index) => {
              return (
                <Draggable
                  index={index}
                  //   handleDragMove={handleDragMove}
                  //   updatePoint={(defs, index) => handleUpdatePoint(defs, index)}
                  //   topPercent={item.percentX}
                  //   leftPercent={item.percentY}
                  key={`item-${index}`}
                  top={item.percentY + "%"}
                  left={item.percentX + "%"}
                  //   parentHeight={
                  //     clickAreaRef.current.getBoundingClientRect().height
                  //   }
                  //   parentWidth={
                  //     clickAreaRef.current.getBoundingClientRect().width
                  //   }
                >
                  <div
                    className="plot-point"
                    data-plot-number={index + 1}
                    // style={{
                    //   top: item.percentY + "%",
                    //   left: item.percentX + "%",
                    // }}
                  />
                </Draggable>
              );
            })
          : null}
      </DndContext>
    </div>
  );
};

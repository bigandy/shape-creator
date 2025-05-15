import { useState, useRef, type SetStateAction, type Dispatch } from "react";
// import { Draggable } from "./Draggable";
// import { DndContext } from "@dnd-kit/core";

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
    const { currentTarget, clientX, clientY } = event;
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
  // const handleDragMove = (e) => {
  //   console.log({ e });
  //   const { width, height } = clickAreaRef?.current?.getBoundingClientRect();
  //   // console.log({ width, height });
  // };

  return (
    <div
      className="click-area"
      onClick={!isEditing ? handleClick : undefined}
      ref={clickAreaRef}
    >
      {/* <DndContext onDragMove={handleDragMove}> */}
      {stack.length > 0
        ? stack.map((item, index) => {
            return (
              // <Draggable
              //   index={index}
              //   // top={item.percentX}
              //   // left={item.percentY}
              // >
              <div
                className="plot-point"
                key={`item-${index}`}
                data-plot-number={index + 1}
                style={{
                  top: item.percentY + "%",
                  left: item.percentX + "%",
                }}
              />
              // </Draggable>
            );
          })
        : null}
      {/* </DndContext> */}
    </div>
  );
};

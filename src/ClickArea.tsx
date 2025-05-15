import { useRef, type SetStateAction, type Dispatch } from "react";
import { Draggable } from "./Draggable";
import { DndContext } from "@dnd-kit/core";

import type { Coords, DrawingMode } from "./Types";

type Props = {
  drawingMode: DrawingMode;
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
};

export const ClickArea = ({ setStack, stack }: Props) => {
  const clickAreaRef = useRef(null);

  /**
   * Handles clicks on the Click area. Used for recording new points
   * and is used for the clip-path: shape() generation
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { clientX, clientY } = event;
    const { width, height } = clickAreaRef?.current?.getBoundingClientRect();

    const percentX = (clientX / width) * 100;
    const percentY = (clientY / height) * 100;
    const coords = { percentX, percentY };

    setStack([...stack, coords]);
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

  // const handleMouseDown = (e) => {
  //   console.log("DOWN", e.screenX, e.screenY);
  // };

  // const handleMouseUp = (e) => {
  //   console.log("UP", e.screenX, e.screenY);
  // };

  return (
    <div
      className="click-area"
      onClick={handleClick}
      // onMouseDown={handleMouseDown}
      // onMouseUp={handleMouseUp}
      ref={clickAreaRef}
    >
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
    </div>
  );
};

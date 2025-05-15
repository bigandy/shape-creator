import React, { useId } from "react";
import { useDraggable, useDndMonitor } from "@dnd-kit/core";

import { CSS } from "@dnd-kit/utilities";

export function Draggable({
  index,
  handleDragMove,
  children,
  updatePoint,
  top,
  left,
}) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${index}`,
  });

  // useDndMonitor({
  //   onDragStart(event) {},
  //   onDragMove(event) {
  //     const initialX = event.activatorEvent.clientX;
  //     const initialY = event.activatorEvent.clientY;
  //     console.log("onDragMove", event.delta.x, event.delta.y);

  //     const newX = initialX + event.delta.x;
  //     const newY = initialY + event.delta.y;

  //     console.log({ newX, newY });

  //     updatePoint(index, { newX, newY });
  //   },
  //   onDragOver(event) {},
  //   onDragEnd(event) {},
  //   onDragCancel(event) {},
  // });

  // console.log({ transform });

  //   console.log({ props, index: props.index });
  // const style = transform
  //   ? {
  //       marginTop: `${transform.y}px`,
  //       marginLeft: `${transform.x}px`,
  //     }
  //   : undefined;

  const style = {
    // transform: CSS.Translate.toString(transform),
  };

  // const style = undefined;
  return (
    <button
      ref={setNodeRef}
      style={{ ...style, top, left, position: "absolute" }}
      {...listeners}
      {...attributes}
      className="draggable-button"
    >
      {children}
    </button>
  );
}

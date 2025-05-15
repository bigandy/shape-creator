import React, { useId } from "react";
import { useDraggable } from "@dnd-kit/core";

export function Draggable(props) {
  const id = useId();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: `draggable-${id}`,
  });

  console.log({ top: props.top });

  //   console.log({ props, index: props.index });
  //   const style = transform
  //     ? {
  //         transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
  //       }
  //     : undefined;

  const style = undefined;
  return (
    <button ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {props.children}
    </button>
  );
}

import { type MouseEvent, type RefObject } from "react";

import { type DragMoveEvent } from "@dnd-kit/core";

import type { Coords } from "@/Types";

export const getCoords = (
  event: MouseEvent<HTMLElement>,
  ref: RefObject<HTMLElement | null>
): Coords | undefined => {
  if (!ref.current) {
    return;
  }

  const { clientX, clientY } = event;
  const { width, height, left, top } = ref.current.getBoundingClientRect();
  const deltaX = clientX - left;
  const deltaY = clientY - top;

  const percentX = (deltaX / width) * 100;
  const percentY = (deltaY / height) * 100;
  const coords = { percentX, percentY };

  return coords;
};

export const getDragDropCoords = (
  event: DragMoveEvent,
  ref: RefObject<HTMLElement | null>
) => {
  if (!ref.current) {
    return;
  }

  let initialX = 0;
  let initialY = 0;

  if (event.activatorEvent.type === "mousedown") {
    //@ts-expect-error AHTODO: Fix this
    initialX = event.activatorEvent.clientX;
    //@ts-expect-error AHTODO: Fix this
    initialY = event.activatorEvent.clientY;
  } else {
    // not mouse

    //@ts-expect-error AHTODO: Fix this
    initialX = event.active.rect.current.initial.left;
    //@ts-expect-error AHTODO: Fix this
    initialY = event.active.rect.current.initial.top;
  }

  const { width, height, left, top } = ref.current.getBoundingClientRect();

  const newX = initialX + event.delta.x - left;
  const newY = initialY + event.delta.y - top;

  const percentX = (newX / width) * 100;
  const percentY = (newY / height) * 100;

  return {
    percentX,
    percentY,
  };
};

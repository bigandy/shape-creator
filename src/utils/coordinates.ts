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
  { activatorEvent, delta, active }: DragMoveEvent,
  ref: RefObject<HTMLElement | null>
) => {
  if (!ref.current) {
    return;
  }

  let initialX = 0;
  let initialY = 0;

  if (activatorEvent.type === "mousedown") {
    initialX = (activatorEvent as unknown as MouseEvent).clientX;
    initialY = (activatorEvent as unknown as MouseEvent).clientY;
  } else {
    // not mouse
    initialX = active.rect.current.initial?.left ?? 0;
    initialY = active.rect.current.initial?.top ?? 0;
  }

  const { width, height, left, top } = ref.current.getBoundingClientRect();

  const newX = initialX + delta.x - left;
  const newY = initialY + delta.y - top;

  const percentX = (newX / width) * 100;
  const percentY = (newY / height) * 100;

  return {
    percentX,
    percentY,
  };
};

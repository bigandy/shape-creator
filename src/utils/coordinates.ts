import { type MouseEvent, type RefObject } from "react";

export const getCoords = (
  event: MouseEvent<HTMLElement>,
  ref: RefObject<HTMLElement | null>
) => {
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

export const getCoordsAsNumber = (
  event: MouseEvent<HTMLElement>,
  ref: RefObject<HTMLElement | null>
) => {
  if (!ref.current) {
    return;
  }

  const { clientX, clientY } = event;
  const { left, top } = ref.current.getBoundingClientRect();

  const deltaX = clientX - left;
  const deltaY = clientY - top;

  const coords = { x: deltaX, y: deltaY };

  return coords;
};

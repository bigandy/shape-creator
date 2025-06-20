import { type KeyboardCoordinateGetter } from "@dnd-kit/core";

export const customCoordinatesGetter: KeyboardCoordinateGetter = (
  event,
  args
) => {
  const { currentCoordinates } = args;
  // AHTODO: Is it possible to know if e.g. ctrl is pressed so can change this value?
  const delta = 25;

  switch (event.code) {
    case "ArrowRight":
      return {
        ...currentCoordinates,
        x: currentCoordinates.x + delta,
      };
    case "ArrowLeft":
      return {
        ...currentCoordinates,
        x: currentCoordinates.x - delta,
      };
    case "ArrowDown":
      return {
        ...currentCoordinates,
        y: currentCoordinates.y + delta,
      };
    case "ArrowUp":
      return {
        ...currentCoordinates,
        y: currentCoordinates.y - delta,
      };
  }

  return undefined;
};

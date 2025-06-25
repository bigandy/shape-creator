import { type MouseEvent, type RefObject } from "react";

import { type DragMoveEvent } from "@dnd-kit/core";

import type { Coords, DrawingMode } from "@/Types";

import { allowableDistance, allowableDistanceLine } from "@utils/consts";

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

export const getCoordsWithSnapping = (
  event: MouseEvent<HTMLElement>,
  ref: RefObject<HTMLElement | null>,
  xPoints: number[],
  yPoints: number[]
): Coords | undefined => {
  if (!ref.current || (xPoints.length === 0 && yPoints.length === 0)) {
    return;
  }

  const { clientX, clientY } = event;
  const { width, height, left, top } = ref.current.getBoundingClientRect();
  const deltaX = clientX - left;
  const deltaY = clientY - top;

  let percentX = (deltaX / width) * 100;
  let percentY = (deltaY / height) * 100;

  const filteredX = xPoints.filter((xPoint) => {
    return Math.abs(percentX - xPoint) <= allowableDistance;
  });

  const filteredY = yPoints.filter((yPoint) => {
    return Math.abs(percentY - yPoint) <= allowableDistance;
  });

  if (filteredX.length > 0) {
    percentX = filteredX[0];
  }
  if (filteredY.length > 0) {
    percentY = filteredY[0];
  }

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

/**
 * Almost the same as getDragDropCoords but with snapping.
 */
export const getDragDropCoordsWithSnapping = (
  { activatorEvent, delta, active }: DragMoveEvent,
  ref: RefObject<HTMLElement | null>,
  drawingMode: DrawingMode,
  xPoints?: number[],
  yPoints?: number[]
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

  const percentXUnsnapped = (newX / width) * 100;
  const percentYUnsnapped = (newY / height) * 100;

  if (xPoints && yPoints) {
    const { percentX, percentY } = updateCoordsToSnap({
      percentX: percentXUnsnapped,
      percentY: percentYUnsnapped,
      xPoints,
      yPoints,
      allowableDistance:
        drawingMode === "line" ? allowableDistanceLine : allowableDistance,
    });

    return {
      percentX,
      percentY,
    };
  } else {
    return {
      percentX: percentXUnsnapped,
      percentY: percentYUnsnapped,
    };
  }
};

export const updateCoordsToSnap = ({
  percentX,
  percentY,
  xPoints,
  yPoints,
  allowableDistance,
}: {
  percentX: number;
  percentY: number;
  xPoints: number[];
  yPoints: number[];
  allowableDistance: number;
}) => {
  const filteredX = xPoints.filter((xPoint) => {
    return Math.abs(percentX - xPoint) <= allowableDistance;
  });

  const filteredY = yPoints.filter((yPoint) => {
    return Math.abs(percentY - yPoint) <= allowableDistance;
  });

  if (filteredX.length > 0) {
    percentX = filteredX[0];
  }
  if (filteredY.length > 0) {
    percentY = filteredY[0];
  }

  return {
    percentX,
    percentY,
  };
};

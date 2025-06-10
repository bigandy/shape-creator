import React, { useRef, useState, type MouseEvent } from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints";

import type { Coords } from "@/Types";

import { useStackContext } from "@hooks/useStackContext";

import { getCoords } from "@utils/coordinates";

export const ClickAreaCircle = () => {
  const { setStack, stack, handleSaveShapeToStack } = useStackContext();

  const [recording, setRecording] = useState(false);
  const clickAreaRef = useRef<HTMLInputElement>(null);
  const [initialPoint, setInitialPoint] = useState<Coords | null>(null);
  const [finalPoint, setFinalPoint] = useState<Coords | null>(null);

  const drawCircle = () => {
    if (initialPoint === null || finalPoint === null) {
      return;
    }

    const points = [
      { percentX: initialPoint.percentX, percentY: initialPoint.percentY },

      { percentX: finalPoint.percentX, percentY: finalPoint.percentY },
    ];
    const updatedState = [...stack, ...points];

    setInitialPoint(null);
    setFinalPoint(null);

    // AHTODO: THis currently only works exactly correctly when the background is a square i.e. height === width. Need to investigate why!
    // Possibly a difference between pixel value at recording time and percent in this function??

    handleSaveShapeToStack(updatedState, "circle");
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setFinalPoint(null);
    const coords = getCoords(e, clickAreaRef)!;

    setInitialPoint(coords);
    setRecording(true);
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    // AHTODO: How to handle mouseup or out of bounds movement of the mouse?

    const upCoords = getCoords(e, clickAreaRef)!;

    setFinalPoint(upCoords);

    setRecording(false);
    drawCircle();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (initialPoint === null || recording === false) {
      return;
    }
    const coords = getCoords(e, clickAreaRef)!;

    setFinalPoint(coords);
  };

  return (
    <div
      className="click-area"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      ref={clickAreaRef}
    >
      {finalPoint !== null && initialPoint !== null && (
        <CircleMiddlePoint
          initialPoint={initialPoint}
          finalPoint={finalPoint}
        />
      )}

      <DragAndDropPoints
        stack={stack}
        setStack={setStack}
        clickAreaRef={clickAreaRef}
      />
    </div>
  );
};

const CircleMiddlePoint = React.memo(
  ({
    initialPoint,
    finalPoint,
  }: {
    initialPoint: Coords;
    finalPoint: Coords;
  }) => {
    const midPoint = {
      percentX: (initialPoint.percentX + finalPoint.percentX) / 2,
      percentY: (initialPoint.percentY + finalPoint.percentY) / 2,
    };

    const diameter =
      Math.pow(midPoint.percentX - initialPoint.percentX, 2) +
      Math.pow(midPoint.percentY - initialPoint.percentY, 2);

    return (
      <div
        className="dot-bg circle-circle"
        style={{
          top: midPoint.percentY + "%",
          left: midPoint.percentX + "%",
          height: Math.sqrt(diameter) * 2 + "%",
        }}
      />
    );
  }
);

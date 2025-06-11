import React, { useRef, useState, type MouseEvent } from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints";

import type { Coords } from "@/Types";

import { useStackContext } from "@/hooks/useStackContext";

import { getCoords } from "@utils/coordinates";
import { useStackDispatch } from "@hooks/useStackDispatch";

export const ClickAreaCircle = () => {
  const dispatch = useStackDispatch();

  const { activeStack } = useStackContext();

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
    const updatedState = [...points];

    setInitialPoint(null);
    setFinalPoint(null);

    // AHTODO: THis currently only works exactly correctly when the background is a square i.e. height === width. Need to investigate why!
    // Possibly a difference between pixel value at recording time and percent in this function??

    dispatch({
      type: "save-shape",
      payload: {
        coords: updatedState,
        shape: "circle",
      },
    });
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

  // const isEditing = savedStack[editingNumber]?.coords.length > 0;
  // const isEditing = false;

  if (activeStack) {
    return (
      <div
        className="click-area"
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseMove={handleMouseMove}
        ref={clickAreaRef}
      >
        {/* {finalPoint !== null && initialPoint !== null && (
          <CircleMiddlePoint
            initialPoint={initialPoint}
            finalPoint={finalPoint}
          />
        )} */}

        {/* AHTODO: show the DragAndDropPoints when in Edit mode. */}
        <DragAndDropPoints clickAreaRef={clickAreaRef} drawingMode="circle" />
      </div>
    );
  }

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

import React, { useRef, useState, type MouseEvent } from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints";

import { useStackDispatch } from "@hooks/useStackDispatch";

import type { Coords } from "@/Types";

import { getCoords } from "@utils/coordinates";
import { useStackContext } from "@/hooks/useStackContext";

export const ClickAreaRectangle = () => {
  const dispatch = useStackDispatch();
  const [recording, setRecording] = useState(false);
  const clickAreaRef = useRef<HTMLInputElement>(null);
  const [initialPoint, setInitialPoint] = useState<Coords | null>(null);
  const [finalPoint, setFinalPoint] = useState<Coords | null>(null);

  const { editingNumber, savedStack } = useStackContext();

  const drawRectangle = () => {
    if (initialPoint === null || finalPoint === null) {
      return;
    }
    const points = [
      {
        percentX: initialPoint.percentX,
        percentY: initialPoint.percentY,
      },
      {
        percentX: initialPoint.percentX,
        percentY: finalPoint.percentY,
      },

      // Third Point
      {
        percentX: finalPoint.percentX,
        percentY: finalPoint.percentY,
      },
      {
        percentX: finalPoint.percentX,
        percentY: initialPoint.percentY,
      },
    ];
    const updatedState = [...points];

    setInitialPoint(null);
    setFinalPoint(null);

    dispatch({
      type: "save-shape",
      payload: {
        coords: updatedState,
        shape: "rectangle",
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
    drawRectangle();
  };

  const handleMouseOver = (e: MouseEvent<HTMLDivElement>) => {
    if (initialPoint === null || recording === false) {
      return;
    }
    const coords = getCoords(e, clickAreaRef)!;

    setFinalPoint(coords);
  };

  const isEditing = savedStack[editingNumber]?.coords.length > 0;

  if (isEditing) {
    return (
      <div
        className="click-area"
        // onMouseDown={handleMouseDown}
        // onMouseUp={handleMouseUp}
        // onMouseMove={handleMouseOver}
        ref={clickAreaRef}
      >
        {/* {finalPoint !== null && initialPoint !== null && (
        <MiddlePoint initialPoint={initialPoint} finalPoint={finalPoint} />
      )} */}

        {/* AHTODO: show the DragAndDropPoints when in Edit mode. */}
        <DragAndDropPoints
          clickAreaRef={clickAreaRef}
          drawingMode="rectangle"
        />
      </div>
    );
  } else {
    return (
      <div
        className="click-area"
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseOver}
        ref={clickAreaRef}
      >
        {finalPoint !== null && initialPoint !== null && (
          <MiddlePoint initialPoint={initialPoint} finalPoint={finalPoint} />
        )}
      </div>
    );
  }
};

const MiddlePoint = React.memo(
  ({
    initialPoint,
    finalPoint,
  }: {
    initialPoint: Coords;
    finalPoint: Coords;
  }) => {
    return (
      <div
        className="dot-bg rectangle-middle-point"
        style={{
          top: Math.min(initialPoint.percentY, finalPoint.percentY) + "%",
          left: Math.min(initialPoint.percentX, finalPoint.percentX) + "%",
          height: Math.abs(initialPoint.percentY - finalPoint.percentY) + "%",
          width: Math.abs(initialPoint.percentX - finalPoint.percentX) + "%",
        }}
      />
    );
  }
);

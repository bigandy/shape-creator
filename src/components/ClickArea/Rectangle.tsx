import React, { useRef, useState, type MouseEvent } from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints/index";

import { useStackDispatch } from "@hooks/useStackDispatch";

import type { Coords } from "@/Types";

import { useStackContext } from "@hooks/useStackContext";
import { getCoords } from "@utils/coordinates";

import { ClickAreaWrapper } from "@components/ClickArea/index";

export const ClickAreaRectangle = () => {
  const dispatch = useStackDispatch();
  const [recording, setRecording] = useState(false);
  const clickAreaRef = useRef<HTMLInputElement>(null);
  const [initialPoint, setInitialPoint] = useState<Coords | null>(null);
  const [finalPoint, setFinalPoint] = useState<Coords | null>(null);

  const { activeStack, moveAllShapes } = useStackContext();

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

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setFinalPoint(null);
    const coords = getCoords(event, clickAreaRef)!;

    setInitialPoint(coords);
    setRecording(true);
  };

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    // AHTODO: How to handle mouseup or out of bounds movement of the mouse?

    const upCoords = getCoords(event, clickAreaRef)!;

    setFinalPoint(upCoords);

    setRecording(false);
    drawRectangle();
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (initialPoint === null || recording === false) {
      return;
    }
    const coords = getCoords(event, clickAreaRef)!;

    setFinalPoint(coords);
  };

  if (activeStack.coords || moveAllShapes) {
    return (
      <ClickAreaWrapper clickAreaRef={clickAreaRef}>
        <DragAndDropPoints
          clickAreaRef={clickAreaRef}
          drawingMode="rectangle"
        />
      </ClickAreaWrapper>
    );
  } else {
    return (
      <ClickAreaWrapper
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseMove={handleMouseMove}
        clickAreaRef={clickAreaRef}
      >
        {finalPoint !== null && initialPoint !== null && (
          <MiddlePoint initialPoint={initialPoint} finalPoint={finalPoint} />
        )}
      </ClickAreaWrapper>
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

import React, { useRef, useState, type MouseEvent } from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints/index";
import { ClickAreaWrapper } from "@components/ClickArea/index";
import { MousePosition } from "@components/ClickArea/MousePosition";
import { Point } from "@components/ClickArea/Point";

import type { Coords } from "@/Types";

import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";

import { getCoords, getCoordsWithSnapping } from "@utils/coordinates";

export const ClickAreaCircle = () => {
  const dispatch = useStackDispatch();

  const { activeStack, moveAllShapes, snapTo, xPoints, yPoints } =
    useStackContext();

  const [recording, setRecording] = useState(false);
  const clickAreaRef = useRef<HTMLInputElement>(null);

  const [mousePosition, setMousePosition] = useState<Coords | null>(null);
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
    drawCircle();
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const coords =
      snapTo && xPoints.length > 0 && yPoints.length > 0
        ? getCoordsWithSnapping(event, clickAreaRef, xPoints, yPoints)!
        : getCoords(event, clickAreaRef)!;

    setMousePosition(coords);

    if (initialPoint === null || recording === false) {
      return;
    }
    setFinalPoint(coords);
  };

  if (activeStack.coords || moveAllShapes) {
    return (
      <ClickAreaWrapper clickAreaRef={clickAreaRef}>
        <DragAndDropPoints clickAreaRef={clickAreaRef} drawingMode="circle" />
      </ClickAreaWrapper>
    );
  }

  return (
    <ClickAreaWrapper
      handleMouseDown={handleMouseDown}
      handleMouseUp={handleMouseUp}
      handleMouseMove={handleMouseMove}
      clickAreaRef={clickAreaRef}
    >
      {initialPoint !== null && <Point coords={initialPoint} type="initial" />}
      {finalPoint !== null && initialPoint !== null && (
        <CircleMiddlePoint
          initialPoint={initialPoint}
          finalPoint={finalPoint}
        />
      )}

      {finalPoint !== null && <Point coords={finalPoint} type="final" />}

      {mousePosition !== null && (
        <MousePosition coords={mousePosition}>P</MousePosition>
      )}
    </ClickAreaWrapper>
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
          translate: `calc(${midPoint.percentX}cqw - 50%) calc(${midPoint.percentY}cqh - 50%)`,
          height: Math.sqrt(diameter) * 2 + "%",
        }}
      />
    );
  }
);

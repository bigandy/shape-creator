import { useRef, useState, type MouseEvent } from "react";

import { ClickAreaWrapper } from "@components/ClickArea/index";
import { MousePosition } from "@components/ClickArea/MousePosition";
import { Point } from "@components/ClickArea/Point";
import { DragAndDropPoints } from "@components/DragAndDropPoints/index";

import type { Coords } from "@/Types";

import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";

import { getCoords, getCoordsWithSnapping } from "@utils/coordinates";

export const ClickAreaOctagon = () => {
  const dispatch = useStackDispatch();

  const { activeStack, moveAllShapes, snapTo, xPoints, yPoints } =
    useStackContext();

  const clickAreaRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState<Coords | null>(null);
  const [initialPoint, setInitialPoint] = useState<Coords | null>(null);
  const [finalPoint, setFinalPoint] = useState<Coords | null>(null);

  // AHTODO: This needs to be updated to draw an octagon.
  const drawOctagon = () => {
    if (initialPoint === null || finalPoint === null) {
      return;
    }

    const xLength = Math.abs(initialPoint.percentX - finalPoint.percentX) / 2;
    const cornerSide = Math.sqrt(2) * (xLength / 2);

    console.log({ xLength, cornerSide });

    const points = [
      // 1 - First mouse point
      { percentX: initialPoint.percentX, percentY: initialPoint.percentY },
      // 2 - Along the top to the right
      {
        percentX: initialPoint.percentX + xLength,
        percentY: initialPoint.percentY,
      },
      // 3 - Top of right down side
      {
        percentX: initialPoint.percentX + xLength + cornerSide,
        percentY: initialPoint.percentY + cornerSide,
      },
      // 4 - bottom of right down side
      {
        percentX: initialPoint.percentX + xLength + cornerSide,
        percentY: initialPoint.percentY + cornerSide + xLength,
      },
      // 5 - Second Mouse Point ??

      {
        percentX: initialPoint.percentX + xLength,
        percentY: initialPoint.percentY + cornerSide + xLength + cornerSide,
      },
      // { percentX: finalPoint.percentX, percentY: finalPoint.percentY },
      // 6 - right of bottom side
      {
        percentX: initialPoint.percentX,
        percentY: initialPoint.percentY + cornerSide + xLength + cornerSide,
      },
      // 7 - bottom of left side
      {
        percentX: initialPoint.percentX - cornerSide,
        percentY: initialPoint.percentY + xLength + cornerSide,
      },
      // 8 - top of left side
      {
        percentX: initialPoint.percentX - cornerSide,
        percentY: initialPoint.percentY + cornerSide,
      },
    ];

    const updatedState = [...points];

    setInitialPoint(null);
    setFinalPoint(null);

    dispatch({
      type: "save-shape",
      payload: {
        coords: updatedState,
        shape: "octagon",
      },
    });
  };

  const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
    setFinalPoint(null);
    const coords = getCoords(event, clickAreaRef)!;

    setInitialPoint(coords);
  };

  const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
    // AHTODO: How to handle mouseup or out of bounds movement of the mouse?

    const upCoords = getCoords(event, clickAreaRef)!;

    setFinalPoint(upCoords);

    drawOctagon();
  };

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const coords =
      snapTo && xPoints.length > 0 && yPoints.length > 0
        ? getCoordsWithSnapping(event, clickAreaRef, xPoints, yPoints)!
        : getCoords(event, clickAreaRef)!;

    setMousePosition(coords);

    if (initialPoint === null) {
      return;
    }
    setFinalPoint(coords);
  };

  if (activeStack.coords || moveAllShapes) {
    return (
      <ClickAreaWrapper clickAreaRef={clickAreaRef}>
        <DragAndDropPoints clickAreaRef={clickAreaRef} drawingMode="octagon" />
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
      {finalPoint !== null && initialPoint !== null && (
        <Background initialPoint={initialPoint} finalPoint={finalPoint} />
      )}

      {initialPoint !== null && <Point coords={initialPoint} type="initial" />}

      {finalPoint !== null && <Point coords={finalPoint} type="final" />}

      {/* {snapTo && (
        <Fragment>
          {initialPoint !== null && (
            <Point coords={initialPoint} type="initial" />
          )}

          {finalPoint !== null && <Point coords={finalPoint} type="final" />}
        </Fragment>
      )} */}

      {mousePosition !== null && (
        <MousePosition coords={mousePosition}>P</MousePosition>
      )}
    </ClickAreaWrapper>
  );
};
// Copied from Rectangle.
const Background = ({
  initialPoint,
  finalPoint,
}: {
  initialPoint: Coords;
  finalPoint: Coords;
}) => {
  const xLength = Math.abs(initialPoint.percentX - finalPoint.percentX) / 2;
  // HOW TO CALCULATE THIS?
  const yLength = Math.abs(initialPoint.percentY - finalPoint.percentY) / 2;
  const cornerSideX = Math.sqrt(2) * (xLength / 2);
  const cornerSideY = Math.sqrt(2) * (yLength / 2);

  const translateX =
    Math.min(initialPoint.percentX, finalPoint.percentX) - cornerSideX;
  const translateY = Math.min(initialPoint.percentY, finalPoint.percentY);

  const width =
    Math.abs(initialPoint.percentX - finalPoint.percentX) +
    cornerSideX +
    cornerSideX;

  const height =
    Math.abs(initialPoint.percentX - finalPoint.percentX) + cornerSideY;

  return (
    <div
      className="dot-bg octagon-middle-point"
      style={{
        translate: `${translateX + "cqb"} ${translateY + "cqi"}`,
        width: width + "%",
        height: height + "%",
      }}
    />
  );
};

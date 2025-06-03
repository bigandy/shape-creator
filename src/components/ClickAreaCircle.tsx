import React, {
  useRef,
  type SetStateAction,
  type Dispatch,
  useState,
  type MouseEvent,
} from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints";

import type { Coords, DrawingMode, NumCoords } from "@/Types";

import { getCoordsAsNumber } from "@utils/coordinates";

type Props = {
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
  handleSaveShapeToStack: (stack: Coords[], type: DrawingMode) => void;
};

export const ClickAreaCircle = ({
  setStack,
  stack,
  handleSaveShapeToStack,
}: Props) => {
  const [recording, setRecording] = useState(false);
  const clickAreaRef = useRef<HTMLInputElement>(null);
  const [initialPoint, setInitialPoint] = useState<NumCoords | null>(null);
  const [finalPoint, setFinalPoint] = useState<NumCoords | null>(null);

  const drawCircle = () => {
    if (initialPoint === null || finalPoint === null) {
      return;
    }

    if (!clickAreaRef.current) {
      return;
    }

    const { x: initialX, y: initialY } = initialPoint;
    const { x: finalX, y: finalY } = finalPoint;
    const { width, height } = clickAreaRef.current.getBoundingClientRect();

    const initialPercentX = (initialX / width) * 100;
    const initialPercentY = (initialY / height) * 100;

    const finalPercentX = (finalX / width) * 100;
    const finalPercentY = (finalY / height) * 100;

    const points = [
      { percentX: initialPercentX, percentY: initialPercentY },

      { percentX: finalPercentX, percentY: finalPercentY },
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
    const coords = getCoordsAsNumber(e, clickAreaRef)!;

    setInitialPoint(coords);
    setRecording(true);
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    // AHTODO: How to handle mouseup or out of bounds movement of the mouse?

    const upCoords = getCoordsAsNumber(e, clickAreaRef)!;

    setFinalPoint(upCoords);

    setRecording(false);
    drawCircle();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (initialPoint === null || recording === false) {
      return;
    }
    const coords = getCoordsAsNumber(e, clickAreaRef)!;

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
    initialPoint: NumCoords;
    finalPoint: NumCoords;
  }) => {
    const midPoint = {
      x: (initialPoint.x + finalPoint.x) / 2,
      y: (initialPoint.y + finalPoint.y) / 2,
    };

    const diameter =
      Math.pow(midPoint.x - initialPoint.x, 2) +
      Math.pow(midPoint.y - initialPoint.y, 2);

    return (
      <div
        className="dot-bg circle-circle"
        style={{
          top: midPoint.y + "px",
          left: midPoint.x + "px",
          height: Math.sqrt(diameter) * 2 + "px",
        }}
      />
    );
  }
);

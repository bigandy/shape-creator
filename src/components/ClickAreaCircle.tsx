import React, {
  Fragment,
  useRef,
  type SetStateAction,
  type Dispatch,
  useState,
  type MouseEvent,
  type CSSProperties,
} from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints";

import type { Coords, DrawingMode } from "@/Types";
type NumCoords = { x: number; y: number };

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

  const getCoords = (event: MouseEvent<HTMLDivElement>) => {
    if (!clickAreaRef.current) {
      return;
    }

    const { clientX, clientY } = event;

    const coords = { x: clientX, y: clientY };

    return coords;
  };

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
    // setStack(updatedState);

    setInitialPoint(null);
    setFinalPoint(null);

    // AHTODO: THis currently only works exactly correctly when the background is a square i.e. height === width. Need to investigate why!
    // Possibly a difference between pixel value at recording time and percent in this function??

    handleSaveShapeToStack(updatedState, "circle");
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setFinalPoint(null);
    const coords = getCoords(e)!;

    setInitialPoint(coords);
    setRecording(true);
  };

  const handleMouseUp = (e: MouseEvent<HTMLDivElement>) => {
    // AHTODO: How to handle mouseup or out of bounds movement of the mouse?

    const upCoords = getCoords(e)!;

    setFinalPoint(upCoords);

    setRecording(false);
    drawCircle();
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (initialPoint === null || recording === false) {
      return;
    }
    const coords = getCoords(e)!;

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
      {initialPoint !== null && (
        <div
          className="start-point"
          style={{
            top: initialPoint.y,
            left: initialPoint.x,
            background: "green",
          }}
        ></div>
      )}

      {finalPoint !== null && initialPoint !== null && (
        <Fragment>
          <CircleMiddlePoint
            initialPoint={initialPoint}
            finalPoint={finalPoint}
          />
          <div
            className="end-point"
            style={{
              top: finalPoint.y,
              left: finalPoint.x,
              background: "red",
              position: "absolute",
              aspectRatio: 1,
              height: 10,
              zIndex: 1,
              borderRadius: "50%",
            }}
          ></div>
        </Fragment>
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
    const top = Math.min(initialPoint.y, finalPoint.y);
    const left = Math.min(initialPoint.x, finalPoint.x);
    const height =
      Math.max(initialPoint.y, finalPoint.y) -
      Math.min(initialPoint.y, finalPoint.y);
    const width =
      Math.max(initialPoint.x, finalPoint.x) -
      Math.min(initialPoint.x, finalPoint.x);

    const midPoint = {
      x: (initialPoint.x + finalPoint.x) / 2,
      y: (initialPoint.y + finalPoint.y) / 2,
    };

    const diameter =
      Math.pow(midPoint.x - initialPoint.x, 2) +
      Math.pow(midPoint.y - initialPoint.y, 2);

    return (
      <Fragment>
        {/* The rectangle that goes from the points */}
        <div
          className="circle-middle-point"
          style={
            {
              top: top + "px",
              left: left + "px",
              height: height + "px",
              width: width + "px",
            } as CSSProperties
          }
        ></div>
        {/* The circle that goes between the two points and over the two points */}
        <div
          className="circle-circle"
          style={{
            top: midPoint.y + "px",
            left: midPoint.x + "px",
            height: Math.sqrt(diameter) * 2 + "px",
          }}
        ></div>
      </Fragment>
    );
  }
);

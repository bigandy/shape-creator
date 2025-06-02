import {
  Fragment,
  useRef,
  useState,
  type SetStateAction,
  type Dispatch,
  type MouseEvent,
} from "react";

import { DragAndDropPoints } from "@components/DragAndDropPoints";

import type { Coords, DrawingMode } from "@/Types";

import { getCoords } from "@/utils/coordinates";

type Props = {
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
  handleSaveShapeToStack: (stack: Coords[], type: DrawingMode) => void;
};

export const ClickAreaRectangle = ({
  setStack,
  stack,
  handleSaveShapeToStack,
}: Props) => {
  const [recording, setRecording] = useState(false);
  const clickAreaRef = useRef<HTMLInputElement>(null);
  const [initialPoint, setInitialPoint] = useState<Coords | null>({
    percentX: 0,
    percentY: 0,
  });
  const [finalPoint, setFinalPoint] = useState<Coords | null>({
    percentX: 0,
    percentY: 0,
  });

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
    const updatedState = [...stack, ...points];
    // setStack(updatedState);

    setInitialPoint(null);
    setFinalPoint(null);

    handleSaveShapeToStack(updatedState, "rectangle");
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

  return (
    <div
      className="click-area"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseOver}
      ref={clickAreaRef}
    >
      {initialPoint !== null && (
        <div
          className="start-point"
          style={{
            top: initialPoint.percentY + "%",
            left: initialPoint.percentX + "%",
            background: "green",
          }}
        ></div>
      )}

      {finalPoint !== null && (
        <Fragment>
          <div
            className="end-point"
            style={{
              top: finalPoint.percentY + "%",
              left: finalPoint.percentX + "%",
              background: "red",
              position: "absolute",
              aspectRatio: 1,
              height: 10,
              zIndex: 1,
              borderRadius: "50%",
            }}
          ></div>
          <div className="rectangle-middle-point dot-bg"></div>
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

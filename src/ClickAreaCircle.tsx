import {
  Fragment,
  useRef,
  type SetStateAction,
  type Dispatch,
  useState,
  type CSSProperties,
} from "react";

import { DragAndDropPoints } from "./DragAndDropPoints";

import type { Coords } from "./Types";

type Props = {
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
  handleSaveShapeToStack: (stack: Coords[]) => void;
};

export const ClickAreaCircle = ({
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

  //   const [mousePointer, setMousePointer] = useState<Coords | null>({
  //     percentX: 10,
  //     percentY: 50,
  //   });

  const getCoords = (event) => {
    if (!clickAreaRef.current) {
      return;
    }

    const { clientX, clientY } = event;
    const { width, height } = clickAreaRef.current.getBoundingClientRect();

    const percentX = (clientX / width) * 100;
    const percentY = (clientY / height) * 100;
    const coords = { percentX, percentY };

    return coords;
  };

  const drawCircle = () => {
    if (initialPoint === null || finalPoint === null) {
      return;
    }

    // TODO: How to draw a circle in shape() ?
    const points = undefined;
    // setStack(updatedState);

    setInitialPoint(null);
    setFinalPoint(null);

    // handleSaveShapeToStack(updatedState);
  };

  const handleMouseDown = (e) => {
    console.log("DOWN", e.screenX, e.screenY);
    setFinalPoint(null);
    const coords = getCoords(e)!;

    setInitialPoint(coords);
    setRecording(true);
  };

  const handleMouseUp = (e) => {
    // AHTODO: How to handle mouseup or out of bounds movement of the mouse?

    console.log("UP", e.screenX, e.screenY);

    const upCoords = getCoords(e)!;

    setFinalPoint(upCoords);

    setRecording(false);
    // drawCircle();
  };

  const handleMouseOver = (e) => {
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
      onMouseMove={handleMouseOver}
      ref={clickAreaRef}
      //   style={
      //     {
      //       "--mouse-left": mousePointer?.percentX,
      //       "--mouse-right": mousePointer?.percentY,
      //     } as React.CSSProperties
      //   }
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
            className="middle-point"
            style={
              {
                anchorName: "--middle-point",
                top:
                  Math.min(initialPoint.percentY, finalPoint.percentY) +
                  Math.abs(initialPoint.percentY - finalPoint.percentY) / 2 +
                  "%",
                left:
                  Math.min(initialPoint.percentX, finalPoint.percentX) +
                  Math.abs(initialPoint.percentX - finalPoint.percentX) / 2 +
                  "%",
                background: "blue",
                position: "absolute",
                aspectRatio: 1,
                height: 1,
                zIndex: 1,
                borderRadius: "50%",
              } as CSSProperties
            }
          ></div>
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
          <div className="circle-first-middle-point"></div>
          <div className="circle-second-middle-point"></div>
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

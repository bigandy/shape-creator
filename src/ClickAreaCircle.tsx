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
    percentX: 20,
    percentY: 20,
  });
  const [finalPoint, setFinalPoint] = useState<Coords | null>({
    percentX: 50,
    percentY: 50,
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

      {finalPoint !== null && initialPoint !== null && (
        <Fragment>
          <CircleMiddlePoint
            initialPoint={initialPoint}
            finalPoint={finalPoint}
          />
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

const CircleMiddlePoint = ({
  initialPoint,
  finalPoint,
}: {
  initialPoint: Coords;
  finalPoint: Coords;
}) => {
  const top = Math.min(initialPoint.percentY, finalPoint.percentY);
  const left = Math.min(initialPoint.percentX, finalPoint.percentX);
  const height =
    Math.max(initialPoint.percentY, finalPoint.percentY) -
    Math.min(initialPoint.percentY, finalPoint.percentY);
  const width =
    Math.max(initialPoint.percentX, finalPoint.percentX) -
    Math.min(initialPoint.percentX, finalPoint.percentX);

  const midPoint = {
    x: (initialPoint.percentX + finalPoint.percentX) / 2,
    y: (initialPoint.percentY + finalPoint.percentY) / 2,
  };

  const d =
    Math.pow(midPoint.x - initialPoint.percentX, 2) +
    Math.pow(midPoint.y - initialPoint.percentY, 2);

  //   const d2 =
  //     Math.pow(midPoint.x - finalPoint.percentX, 2) +
  //     Math.pow(midPoint.y - finalPoint.percentY, 2);

  console.log({ d });

  //   const dy = height;
  //   const dx = width;
  //   const angle = Math.atan2(dy, dx);
  //   const degrees = (angle * 180) / Math.PI;

  return (
    <Fragment>
      <div
        className="circle-middle-point"
        style={
          {
            top: top + "%",
            left: left + "%",
            height: height + "%",
            width: width + "%",
            transformOrigin: "0 0",
            //   transform: `rotate(${degrees}deg) translateY(-100%) translateX(-100%)`,
            //   transformOrigin: "100% 0",
          } as CSSProperties
        }
      >
        {/* <div>Degrees: {degrees}</div> */}

        {/* <div>
          start point: {initialPoint.percentX},{initialPoint.percentY}
        </div>
        <div>
          end point: {finalPoint.percentX},{finalPoint.percentY}
        </div>

        <div>
          Mid-point: {midPoint.x}, {midPoint.y}
        </div>

        <div>d: {d}</div> */}
        {/* <div>d2: {d2}</div> */}
      </div>
      <div
        className="mid-point"
        style={{
          top: midPoint.y + "%",
          left: midPoint.x + "%",
          height: Math.sqrt(d) * 2 + "%",
          borderRadius: "10%",
          aspectRatio: 1,
          background: "orange",
          opacity: 0.5,
          position: "absolute",
          translate: "-50% -50%",
        }}
      ></div>
    </Fragment>
  );
};

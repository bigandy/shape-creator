import { Fragment } from "react";

import { useStackContext } from "@hooks/useStackContext";

export const GridLines = () => {
  const { savedStack, editingNumber } = useStackContext();

  // Get All Points vertical and horizontal
  const allCoords = savedStack
    .filter((_, stackIndex) => stackIndex !== editingNumber)
    .map((stack) => {
      return stack.coords;
    })
    .flat();
  const horizontalPoints = allCoords.map(({ percentY }) => percentY);
  const verticalPoints = allCoords.map(({ percentX }) => percentX);

  return (
    <Fragment>
      {verticalPoints.map((y, index) => {
        return (
          <div
            key={`line-${index}`}
            className="line line-vertical"
            style={{ left: y + "%" }}
          ></div>
        );
      })}

      {horizontalPoints.map((x, index) => {
        return (
          <div
            key={`line-${index}`}
            className="line line-horizontal"
            style={{ top: x + "%" }}
          ></div>
        );
      })}
    </Fragment>
  );
};

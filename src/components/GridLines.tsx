import { Fragment } from "react";

import { useStackContext } from "@hooks/useStackContext";

export const GridLines = () => {
  const { xPoints, yPoints } = useStackContext();

  console.log({ xPoints, yPoints });

  return (
    <Fragment>
      {xPoints.map((x, index) => {
        return (
          <div
            key={`line-${index}`}
            className="line line-vertical"
            style={{ left: x + "%" }}
          ></div>
        );
      })}

      {yPoints.map((y, index) => {
        return (
          <div
            key={`line-${index}`}
            className="line line-horizontal"
            style={{ top: y + "%" }}
          ></div>
        );
      })}
    </Fragment>
  );
};

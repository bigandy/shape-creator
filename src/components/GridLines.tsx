import { Fragment } from "react";

import { useStackContext } from "@hooks/useStackContext";

export const GridLines = () => {
  const { xPoints, yPoints } = useStackContext();

  return (
    <Fragment>
      {xPoints.map((x, index) => {
        return (
          <div
            key={`line-${index}`}
            className="line line-vertical"
            style={{
              translate: `calc(${x}cqi - 50%) calc(${0}cqb)`,
            }}
          ></div>
        );
      })}

      {yPoints.map((y, index) => {
        return (
          <div
            key={`line-${index}`}
            className="line line-horizontal"
            style={{
              translate: `calc(${0}cqi) calc(${y}cqb - 0%)`,
            }}
          ></div>
        );
      })}
    </Fragment>
  );
};

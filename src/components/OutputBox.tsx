import { useContext } from "react";

import { StackContext } from "@context/StackContext";

import { Fragment } from "react/jsx-runtime";

type Props = {
  backgroundImage?: string;
  // precision: number;
};

export const OutputBox = ({
  backgroundImage,
}: // precision,
Props) => {
  const { setStack, stack, clipPath } = useContext(StackContext);

  return (
    <Fragment>
      <div
        className="output"
        style={{
          backgroundImage:
            backgroundImage !== "" ? `url(${backgroundImage})` : "",
          clipPath,
        }}
      ></div>

      <div
        className="output-hover"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            backgroundImage !== "" ? `url(${backgroundImage})` : "",
        }}
      ></div>
    </Fragment>
  );
};

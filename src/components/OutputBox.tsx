import { useStackContext } from "@hooks/useStackContext";

import { Fragment } from "react/jsx-runtime";

type Props = {
  backgroundImage?: string;
};

export const OutputBox = ({ backgroundImage }: Props) => {
  const { clipPath } = useStackContext();

  return (
    <Fragment>
      <div
        className="output"
        style={{
          backgroundImage:
            backgroundImage !== "" ? `url(${backgroundImage})` : "",
          clipPath: clipPath,
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

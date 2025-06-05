import { type ChangeEventHandler } from "react";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";

import { CodepenCreatorButton } from "@components/CodepenCreatorButton";

import type { Shape, Coords } from "@/Types";
import { useClipPathStyle } from "@hooks/useClipPathStyle";

type Props = {
  savedStack: Shape[];
  currentStack: Coords[];
  open: boolean;
  handleClose: () => void;
  precision: number;
  handleSetPrecision: ChangeEventHandler<HTMLInputElement>;
};

export const CodeViewer = ({
  savedStack,
  currentStack,
  open,
  handleClose,
  precision,
  handleSetPrecision,
}: Props) => {
  const [_, copy] = useCopyToClipboard(); // eslint-disable-line  @typescript-eslint/no-unused-vars

  const clipPathStyle = useClipPathStyle({
    currentStack,
    savedStack,
    precision,
  });

  const buttonsDisabled = clipPathStyle === "";

  const handleCopyText = () => {
    copy("clip-path:" + clipPathStyle + ";")
      .then(() => {
        console.log("Copied!", { clipPathStyle });
        toast.success("Copied Successfully");
      })
      .catch((error) => {
        console.error("Failed to copy!", error);

        toast.error("Failed to copy!", error);
      });
  };

  return (
    <div className={`code-viewer ${open ? "code-viewer--open" : ""}`}>
      <div className="inner">
        <label>
          Precision
          <input
            type="number"
            value={precision}
            onChange={handleSetPrecision}
            min="0"
            max="21"
          />
        </label>

        {clipPathStyle || "there is no code"}

        <button disabled={buttonsDisabled} onClick={handleCopyText}>
          Copy Text
        </button>

        <CodepenCreatorButton
          clipPathStyle={clipPathStyle}
          disabled={buttonsDisabled}
        />

        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

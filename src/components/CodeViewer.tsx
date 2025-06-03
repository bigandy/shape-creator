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
};

export const CodeViewer = ({
  savedStack,
  currentStack,
  open,
  handleClose,
  precision,
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
        // AHTODO: Show a toast or some other visual que that this has been done.
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
        {clipPathStyle || "there is no code"}

        <button onClick={handleClose} className="close-button">
          Close
        </button>

        <button disabled={buttonsDisabled} onClick={handleCopyText}>
          Copy Text
        </button>

        <CodepenCreatorButton
          clipPathStyle={clipPathStyle}
          disabled={buttonsDisabled}
        />
      </div>
    </div>
  );
};

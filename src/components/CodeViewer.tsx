import { useCopyToClipboard } from "usehooks-ts";

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

  const handleCopyText = () => {
    copy("clip-path:" + clipPathStyle + ";")
      .then(() => {
        // AHTODO: Show a toast or some other visual que that this has been done.
        console.log("Copied!", { clipPathStyle });
      })
      .catch((error) => {
        console.error("Failed to copy!", error);

        // AHTODO: show an error toast.
      });
  };

  return (
    <div className={`code-viewer ${open ? "code-viewer--open" : ""}`}>
      <div className="inner">
        {clipPathStyle || "there is no code"}

        <button onClick={handleClose} className="close-button">
          Close
        </button>

        <button disabled={clipPathStyle === ""} onClick={handleCopyText}>
          Copy Text
        </button>
      </div>
    </div>
  );
};

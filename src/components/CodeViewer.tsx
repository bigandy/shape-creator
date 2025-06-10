import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";

import { CodepenCreatorButton } from "@components/CodepenCreatorButton";

import { useStackContext } from "@hooks/useStackContext";

type Props = {
  open: boolean;
  handleClose: () => void;
};

export const CodeViewer = ({ open, handleClose }: Props) => {
  const [_, copy] = useCopyToClipboard(); // eslint-disable-line  @typescript-eslint/no-unused-vars

  // AHTODO: Handle Precision again.
  // const [precision, setPrecision] = useState(2);
  // const handleSetPrecision = (e: ChangeEvent<HTMLInputElement>) => {
  //   setPrecision(Number(e.target.value));
  // };
  const { clipPath } = useStackContext();

  const buttonsDisabled = clipPath === "";

  const handleCopyText = () => {
    copy("clip-path:" + clipPath + ";")
      .then(() => {
        console.log("Copied!", { clipPath });
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
        {/* <label>
          Precision
          <input
            type="number"
            value={precision}
            onChange={handleSetPrecision}
            min="0"
            max="21"
          />
        </label> */}

        {clipPath || "there is no code"}

        <button disabled={buttonsDisabled} onClick={handleCopyText}>
          Copy Text
        </button>

        <CodepenCreatorButton
          clipPathStyle={clipPath}
          disabled={buttonsDisabled}
        />

        <button onClick={handleClose} className="close-button">
          Close
        </button>
      </div>
    </div>
  );
};

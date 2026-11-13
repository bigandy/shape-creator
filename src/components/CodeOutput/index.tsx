import { CodepenCreatorButton } from "@components/CodepenCreatorButton";
import { useStackContext } from "@hooks/useStackContext";
import toast from "react-hot-toast";
import { useCopyToClipboard } from "usehooks-ts";

import './styles.css';

type Props = {
	open: boolean;
	handleClose: () => void;
	handleToggle: () => void;
};

export const CodeOutput = ({ open, handleToggle, handleClose }: Props) => {
	const [_, copy] = useCopyToClipboard(); // eslint-disable-line  @typescript-eslint/no-unused-vars

	// AHTODO: Handle Precision again.
	// const [precision, setPrecision] = useState(2);
	// const handleSetPrecision = (e: ChangeEvent<HTMLInputElement>) => {
	//   setPrecision(Number(e.target.value));
	// };
	const { clipPath } = useStackContext();

	console.log({ clipPath })

	const buttonsDisabled = clipPath === "";

	const handleCopyText = () => {
		copy(`clip-path: ${clipPath};`)
			.then(() => {
				toast.success("Copied Successfully");
			})
			.catch((error) => {
				console.error("Failed to copy!", error);

				toast.error("Failed to copy!", error);
			});
	};

	return (
		<div className="code-output-wrapper">
			<button className="toggle-code-button" onClick={handleToggle}>
				{open ? "Hide" : "Show"} Code
			</button>
			<div className={`code-output horiz-bar ${open ? "horiz-bar--open" : ""}`}>
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
					<div className="the-code-wrapper">
						<div className="the-code">
							{clipPath === '' ? "there is no code" : `${clipPath};`}
						</div>
					</div>

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
		</div>
	);
};

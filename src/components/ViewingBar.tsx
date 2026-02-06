import { useStackContext } from "@hooks/useStackContext";
import type { CSSProperties, PropsWithChildren } from "react";
import { useState } from "react";

type ViewingBarProps = {
	open: boolean;
	handleClose: () => void;
	backgroundImage: string;
};

export const ViewingBar = ({
	open,
	handleClose,
	backgroundImage,
}: ViewingBarProps) => {
	const [items, setItems] = useState(14);
	const handleMore = () => {
		setItems((n) => n + 1);
	};

	const handleLess = () => {
		setItems((n) => n - 1);
	};

	return (
		<div className={`viewing-bar ${open ? "viewing-bar--open" : ""}`}>
			<div className="inner">
				<button onClick={handleClose} className="close-button">
					Close
				</button>
				<div className="box-wrapper">
					<ViewingBarBox type="clip-path" backgroundImage={backgroundImage} />
					<ViewingBarBox
						type="border-shape"
						backgroundImage={backgroundImage}
					/>
					<ViewingBarBox
						type="offset-path"
						backgroundImage={backgroundImage}
						headerAfter={
							<>
								<button onClick={handleMore}>&#8593;</button>
								<p>{items}</p>
								<button onClick={handleLess} disabled={items === 1}>
									&#8595;
								</button>
							</>
						}
					>
						<Boxes key={items} items={items} />
					</ViewingBarBox>
				</div>
			</div>
		</div>
	);
};

const Boxes = ({ items }: { items: number }) => {
	if (items === 0) {
		return null;
	}
	return (
		<>
			{Array.from(Array(items).keys()).map((i) => {
				return <div className="item" key={`item-${i}`}></div>;
			})}
		</>
	);
};

interface ViewingBarBoxProps extends PropsWithChildren {
	type: "clip-path" | "offset-path" | "border-shape";
	headerAfter?: React.ReactNode;
	backgroundImage?: string;
}

const ViewingBarBox = ({
	backgroundImage,
	type,
	headerAfter,
	children,
}: ViewingBarBoxProps) => {
	const { clipPath } = useStackContext();

	const boxStyle = {
		"--clip-path": clipPath,
		backgroundImage: `url(${backgroundImage})`,
		backgroundSize: "cover",
	} as CSSProperties;

	return (
		<div className="viewing-bar-box">
			<header>
				<h2>{type}</h2>
				{clipPath !== "" && headerAfter}
			</header>
			<div className="box-outer">
				<div className={`box box--${type}`} style={boxStyle}>
					{clipPath !== "" && children}
				</div>
			</div>
		</div>
	);
};

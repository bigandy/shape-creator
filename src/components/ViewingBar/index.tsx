import { useState } from "react";

import { ViewingBarBox } from './ViewingBarBox';

type ViewingBarProps = {
	open: boolean;
	handleClose: () => void;
	handleToggle: () => void;
	backgroundImage: string;
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

export const ViewingBar = ({
	open,
	handleClose,
	handleToggle,
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
		<div className="viewing-bar-wrapper">
			<button className="toggle-viewing-bar" onClick={handleToggle}>
				{open ? "Hide" : "Show"} Viewing Bar
			</button>
			<div className={`viewing-bar horiz-bar ${open ? "horiz-bar--open" : ""}`}>
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
		</div>
	);
};

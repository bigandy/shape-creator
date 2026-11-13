import { ShapeList } from "@components/ShapeList";
import { useState } from "react";

import "./styles.css";

export const Sidebar = () => {
	const [open, setOpen] = useState(true);

	const handleClose = () => setOpen(false);

	const handleToggle = () => setOpen((o) => !o);

	return (
		<div className="sidebar-wrapper">
			<button className="toggle-sidebar-button" onClick={handleToggle}>
				{open ? "Hide" : "Show"} Sidebar
			</button>
			<div className={`sidebar ${open ? "sidebar--open" : ""}`}>
				<div className="sidebar-inner">
					<button onClick={handleClose} className="close-button">
						Close
					</button>

					<ShapeList />
				</div>
			</div>
		</div>
	);
};

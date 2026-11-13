import { ShapeList } from "@components/ShapeList";

import './styles.css';

type SidebarProps = {
	open: boolean;
	handleClose: () => void;
	handleToggle: () => void;
};

export const Sidebar = ({ open, handleClose, handleToggle }: SidebarProps) => {
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

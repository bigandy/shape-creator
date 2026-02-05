import { ShapeList } from "@components/ShapeList";

type SidebarProps = {
	open: boolean;
	handleClose: () => void;
};

export const Sidebar = ({ open, handleClose }: SidebarProps) => {
	return (
		<div className={`sidebar ${open ? "sidebar--open" : ""}`}>
			<div className="sidebar-inner">
				<button onClick={handleClose} className="close-button">
					Close
				</button>

				<ShapeList />
			</div>
		</div>
	);
};

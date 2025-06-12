import { useState } from "react";

import { SortableShapeList } from "@components/SortableShapeList";
import { ShapeList } from "@components/ShapeList";

type SidebarProps = {
  open: boolean;
  handleClose: () => void;
};

export const Sidebar = ({ open, handleClose }: SidebarProps) => {
  const [dragDropShapeList, setDragDropShapeList] = useState(false);

  const handleToggleReorderList = () => setDragDropShapeList((d) => !d);

  return (
    <div className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar-inner">
        <button onClick={handleClose} className="close-button">
          Close
        </button>

        <button onClick={handleToggleReorderList}>Toggle Re-order List</button>

        {dragDropShapeList ? <SortableShapeList /> : <ShapeList />}
      </div>
    </div>
  );
};

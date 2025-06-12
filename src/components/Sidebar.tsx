import { useState } from "react";

import { SortableShapeList } from "@components/SortableShapeList";
import { ShapeList } from "@components/ShapeList";

import { useStackContext } from "@hooks/useStackContext";

type SidebarProps = {
  open: boolean;
  handleClose: () => void;
};

export const Sidebar = ({ open, handleClose }: SidebarProps) => {
  const { savedStackLength } = useStackContext();
  const [dragDropShapeList, setDragDropShapeList] = useState(false);

  const handleToggleReorderList = () => setDragDropShapeList((d) => !d);

  return (
    <div className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar-inner">
        <button onClick={handleClose} className="close-button">
          Close
        </button>

        {savedStackLength > 1 && (
          <button onClick={handleToggleReorderList}>
            {!dragDropShapeList ? "Re-order" : "Save Order"} List
          </button>
        )}

        {dragDropShapeList ? <SortableShapeList /> : <ShapeList />}
      </div>
    </div>
  );
};

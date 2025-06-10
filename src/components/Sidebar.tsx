import { type Dispatch, Fragment, type SetStateAction } from "react";

import type { DrawingMode } from "@/Types";

import { SidebarItem } from "@components/SidebarItem";

import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@/hooks/useStackDispatch";

type SidebarProps = {
  open: boolean;
  drawingMode: DrawingMode;
  editingNumber: number | undefined;
  setEditingNumber: Dispatch<SetStateAction<number | undefined>>;
  handleClose: () => void;
};

export const Sidebar = ({
  open,
  handleClose,
  drawingMode,
  editingNumber,
  setEditingNumber,
}: SidebarProps) => {
  const { stack, savedStack, setSavedStack } = useStackContext();
  const dispatch = useStackDispatch();

  const handleDeleteShape = (indexToDelete: number) => {
    setSavedStack((stack) =>
      stack.filter((_, index) => index !== indexToDelete)
    );
  };

  const onEditShape = (index: number) => {
    if (editingNumber === index) {
      setEditingNumber(undefined);
      dispatch({ type: "clear-stack" });
    } else {
      dispatch({
        type: "update",
        payload: { coords: savedStack[index].coords },
      });
      setEditingNumber(index);
    }
  };

  const onDeleteShape = (index: number) => {
    handleDeleteShape(index);
  };

  return (
    <div className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar-inner">
        <button onClick={handleClose} className="close-button">
          Close
        </button>
        {savedStack.length > 0 ? (
          <ol>
            {/* <li>Have Stack</li> */}
            {savedStack.map((stack, stackIndex) => {
              const canEdit = editingNumber === stackIndex;
              return (
                <li
                  className={
                    canEdit ? `sidebar-shape editable-shape` : "sidebar-shape"
                  }
                >
                  <p>
                    {stack.shape}{" "}
                    {/* <button onClick={() => onEditShape(stackIndex)}>
                      Edit Shape?
                    </button> */}
                    <button onClick={() => onDeleteShape(stackIndex)}>
                      Delete Shape?
                    </button>
                  </p>
                  {stack.shape === "line" ? (
                    <ol>
                      {stack.coords.map(({ percentX, percentY }, index) => {
                        return (
                          <SidebarItem
                            key={`item-${index}`}
                            x={percentX}
                            y={percentY}
                            currentIndex={index}
                            editable={false}
                          />
                        );
                      })}
                    </ol>
                  ) : (
                    <p>{stack.shape}</p>
                  )}
                </li>
              );
            })}
          </ol>
        ) : (
          <p>No Shapes Added, Save One?</p>
        )}
        {drawingMode === "line" && stack.length > 0 ? (
          <Fragment>
            <p>Current Shape</p>
            <ol>
              {stack.map(({ percentX, percentY }, index) => {
                return (
                  <SidebarItem
                    key={`item-${index}`}
                    x={percentX}
                    y={percentY}
                    currentIndex={index}
                  />
                );
              })}
            </ol>
          </Fragment>
        ) : (
          <p>No points set. Add one?</p>
        )}
      </div>
    </div>
  );
};

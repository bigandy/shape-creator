import { type SetStateAction, type Dispatch, Fragment, useState } from "react";

import type { Coords, DrawingMode, Shape } from "@/Types";

import { SidebarItem } from "@components/SidebarItem";

type SidebarProps = {
  open: boolean;
  stack: Coords[];
  savedStack: Shape[];
  drawingMode: DrawingMode;
  editingNumber: number | undefined;
  setStack: Dispatch<SetStateAction<Coords[]>>;
  setEditingNumber: Dispatch<SetStateAction<number | undefined>>;
  handleClose: () => void;
  handleDeleteShape: (index: number) => void;
};

export const Sidebar = ({
  open,
  handleClose,
  savedStack,
  handleDeleteShape,
  drawingMode,
  stack,
  setStack,
  editingNumber,
  setEditingNumber,
}: SidebarProps) => {
  // Insert a new point in between existing points. Put the new point half-way between the two existing points.

  const onEditShape = (index: number) => {
    if (editingNumber === index) {
      setEditingNumber(undefined);
      setStack([]);
    } else {
      setStack(savedStack[index].coords);
      setEditingNumber(index);
    }
  };

  const onDeleteShape = (index: number) => {
    handleDeleteShape(index);
  };

  const handleDeletePoint = (indexToDelete: number) =>
    setStack(stack.filter((_, index) => index !== indexToDelete));

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
                            stack={stack.coords}
                            setStack={setStack}
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
                    stack={stack}
                    setStack={setStack}
                    currentIndex={index}
                    handleDeletePoint={handleDeletePoint}
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

import { type SetStateAction, type Dispatch, Fragment } from "react";

import type { Coords, DrawingMode, Shape } from "@/Types";

import { SidebarItem } from "@components/SidebarItem";

type SidebarProps = {
  open: boolean;
  stack: Coords[];
  savedStack: Shape[];
  drawingMode: DrawingMode;
  setStack: Dispatch<SetStateAction<Coords[]>>;
  handleClose: () => void;
};

export const Sidebar = ({
  open,
  handleClose,
  savedStack,
  drawingMode,
  stack,
  setStack,
}: SidebarProps) => {
  // Insert a new point in between existing points. Put the new point half-way between the two existing points.

  return (
    <div className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar-inner">
        <button onClick={handleClose} className="close-button">
          Close
        </button>
        {savedStack.length > 0 ? (
          <ol>
            {/* <li>Have Stack</li> */}
            {savedStack.map((stack) => {
              return (
                <li>
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

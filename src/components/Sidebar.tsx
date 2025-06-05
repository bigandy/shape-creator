import { type SetStateAction, type Dispatch } from "react";

import type { Coords, Shape } from "@/Types";

// import { SidebarItem } from "@components/SidebarItem";

type SidebarProps = {
  open: boolean;
  stack: Coords[];
  savedStack: Shape[];
  setStack: Dispatch<SetStateAction<Coords[]>>;
  handleClose: () => void;
};

export const Sidebar = ({
  open,
  handleClose,
}: // setStack,
// stack,
// savedStack,
SidebarProps) => {
  // Insert a new point in between existing points. Put the new point half-way between the two existing points.

  return (
    <div className={`sidebar ${open ? "sidebar--open" : ""}`}>
      {/* <button onClick={handleClose} className="close-button">
        Close
      </button> */}
      {/* {savedStack.length > 0 ? (
        <ol>
          {savedStack.map((stack) => {
            return (
              <li>
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
                        editable={false}
                      />
                    );
                  })}
                </ol>
              </li>
            );
          })}
        </ol>
      ) : (
        "No Shapes Added, Save One?"
      )}
      {stack.length > 0 ? (
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
      ) : (
        "No points set. Add one?"
      )} */}
    </div>
  );
};

import { type SetStateAction, type Dispatch } from "react";

import type { Coords } from "./Types";

import { SidebarItem } from "./SidebarItem";

type SidebarProps = {
  open: boolean;
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
};

export const Sidebar = ({
  open,
  handleClose,
  setStack,
  stack,
}: SidebarProps) => {
  // Insert a new point in between existing points. Put the new point half-way between the two existing points.

  // AHTODO: it in CSS instead
  // This way could animate it in, etc.
  if (!open) {
    return null;
  }

  return (
    <div className="sidebar">
      <button onClick={handleClose}>Close</button>
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
      )}
    </div>
  );
};

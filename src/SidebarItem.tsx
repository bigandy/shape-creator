import { type SetStateAction, type Dispatch } from "react";

import type { Coords } from "./Types";

type Props = {
  x: number;
  y: number;
  stack: Coords[];
  setStack: Dispatch<SetStateAction<Coords[]>>;
  currentIndex: number;
  editable?: boolean;
};

export const SidebarItem = ({
  x,
  y,
  stack,
  setStack,
  currentIndex,
  editable = true,
}: Props) => {
  const handleDeletePoint = () => {
    setStack(stack.filter((_, index) => index !== currentIndex));
  };

  const handleInsertPoint = () => {
    const { percentX: prevX, percentY: prevY } = stack[currentIndex];
    const { percentX: nextX, percentY: nextY } =
      stack[currentIndex + 1] ?? stack[0];

    const percentX = Math.abs(prevY - nextY) / 2 + Math.min(prevY, nextY);
    const percentY = Math.abs(prevX - nextX) / 2 + Math.min(prevX, nextX);

    const newStackPoint = { percentX, percentY };

    const nextStack = [
      ...stack.slice(0, currentIndex + 1),
      newStackPoint,
      ...stack.slice(currentIndex + 1),
    ];
    setStack(nextStack);
  };

  return (
    <li>
      y: {x} <br />
      x: {y} <br />
      {editable && (
        <>
          <button onClick={handleDeletePoint}>Delete Point</button>
          {/* <button onClick={() => handleEditCurrentPoint(index)}>
                  Edit Point
                </button> */}
          <br />
          <button onClick={handleInsertPoint}>Insert Point after</button>
        </>
      )}
    </li>
  );
};

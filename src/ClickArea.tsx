import { useRef, type SetStateAction, type Dispatch } from "react";

import { DragAndDropPoints } from "./DragAndDropPoints";

import type { Coords } from "./Types";

type Props = {
  setStack: Dispatch<SetStateAction<Coords[]>>;
  stack: Coords[];
};

export const ClickArea = ({ setStack, stack }: Props) => {
  const clickAreaRef = useRef<HTMLInputElement>(null);

  /**
   * Handles clicks on the Click area. Used for recording new points
   * and is used for the clip-path: shape() generation
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    if (!clickAreaRef.current) {
      return;
    }
    const { clientX, clientY } = event;
    const { width, height } = clickAreaRef.current.getBoundingClientRect();

    const percentX = (clientX / width) * 100;
    const percentY = (clientY / height) * 100;
    const coords = { percentX, percentY };

    setStack([...stack, coords]);
  };

  return (
    <div className="click-area" onClick={handleClick} ref={clickAreaRef}>
      <DragAndDropPoints
        stack={stack}
        setStack={setStack}
        clickAreaRef={clickAreaRef}
      />
    </div>
  );
};

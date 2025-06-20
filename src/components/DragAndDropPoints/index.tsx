import { useStackContext } from "@hooks/useStackContext";
import type { DrawingMode } from "@/Types";

import { DragAndDropPointsAllShapes } from "@components/DragAndDropPoints/AllShapes";
import { DragAndDropPointsSingleShape } from "@components/DragAndDropPoints/SingleShape";

type Props = {
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
  drawingMode: DrawingMode;
};

export const DragAndDropPoints = ({ clickAreaRef, drawingMode }: Props) => {
  const { moveAllShapes } = useStackContext();

  if (moveAllShapes) {
    return <DragAndDropPointsAllShapes clickAreaRef={clickAreaRef} />;
  } else {
    return (
      <DragAndDropPointsSingleShape
        clickAreaRef={clickAreaRef}
        drawingMode={drawingMode}
      />
    );
  }
};

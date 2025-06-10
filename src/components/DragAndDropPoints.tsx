import { DndContext, type DragMoveEvent } from "@dnd-kit/core";

import { Draggable } from "@components/Draggable";

import { getDragDropCoords } from "@utils/coordinates";
import { useStackContext } from "@/hooks/useStackContext";
import { useStackDispatch } from "@/hooks/useStackDispatch";

type Props = {
  clickAreaRef: React.RefObject<HTMLInputElement | null>;
};

export const DragAndDropPoints = ({ clickAreaRef }: Props) => {
  const { stack } = useStackContext();

  const dispatch = useStackDispatch();

  const handleDragMove = (event: DragMoveEvent) => {
    const coords = getDragDropCoords(event, clickAreaRef)!;

    //@ts-expect-error AHTODO: Fix this
    const indexToUpdate = event.activatorEvent.target.textContent - 1;

    const updatedCoords = stack.map((c, i) => {
      if (i === indexToUpdate) {
        return coords;
      } else {
        return c;
      }
    });

    dispatch({
      type: "update-current-shape",
      payload: { coords: updatedCoords },
    });
  };

  return (
    <DndContext onDragMove={handleDragMove}>
      {stack.length > 0
        ? stack.map((item, index) => {
            return (
              <Draggable
                index={index}
                key={`item-${index}`}
                top={item.percentY}
                left={item.percentX}
                data-plot-number={index + 1}
              >
                <div>{index + 1}</div>
              </Draggable>
            );
          })
        : null}
    </DndContext>
  );
};

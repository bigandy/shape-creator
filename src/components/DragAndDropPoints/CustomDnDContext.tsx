import {
  DndContext,
  type DragMoveEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

const customCoordinatesGetter = (event, args) => {
  const { currentCoordinates } = args;
  // AHTODO: Is it possible to know if e.g. ctrl is pressed so can change this value?
  const delta = 25;

  switch (event.code) {
    case "ArrowRight":
      return {
        ...currentCoordinates,
        x: currentCoordinates.x + delta,
      };
    case "ArrowLeft":
      return {
        ...currentCoordinates,
        x: currentCoordinates.x - delta,
      };
    case "ArrowDown":
      return {
        ...currentCoordinates,
        y: currentCoordinates.y + delta,
      };
    case "ArrowUp":
      return {
        ...currentCoordinates,
        y: currentCoordinates.y - delta,
      };
  }

  return undefined;
};

interface Props extends React.PropsWithChildren {
  onDragMove: (event: DragMoveEvent) => void;
}

export const CustomDnDContext = ({ onDragMove, children }: Props) => {
  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor, {
    coordinateGetter: customCoordinatesGetter,
  });

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

  return (
    <DndContext onDragMove={onDragMove} sensors={sensors}>
      {children}
    </DndContext>
  );
};

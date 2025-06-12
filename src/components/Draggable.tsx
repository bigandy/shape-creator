import { useDraggable } from "@dnd-kit/core";

interface Props extends React.PropsWithChildren {
  index: number;
  top: number;
  left: number;
}

export function Draggable({ index, top, left, children }: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${index}`,
  });

  return (
    <button
      ref={setNodeRef}
      style={{
        top: top + "%",
        left: left + "%",
      }}
      {...listeners}
      {...attributes}
      className="draggable-button"
    >
      {children}
    </button>
  );
}

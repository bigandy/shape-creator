import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props extends React.PropsWithChildren {
  id: string;
}

export function SortableListItem({ id, children }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: "1px solid",
    marginBottom: "1rem",
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div>{children}</div>
    </div>
  );
}

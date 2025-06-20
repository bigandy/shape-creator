import { useStackContext } from "@/hooks/useStackContext";
import { useDraggable } from "@dnd-kit/core";

interface Props extends React.PropsWithChildren {
  index: number;
  top: number;
  left: number;
  isCenter?: boolean;
}

export function Draggable({
  index,
  top,
  left,
  isCenter = false,
  children,
}: Props) {
  const { attributes, listeners, setNodeRef } = useDraggable({
    id: `draggable-${index}`,
  });
  let overlapTop = false;
  let overlapLeft = false;

  if (!isCenter) {
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const { xPoints, yPoints } = useStackContext();

    // AHTODO - Doing this in every Draggable seems to be bad. Move into somewhere else to share these values?
    if (yPoints.map((p) => Math.floor(p)).includes(Math.floor(top))) {
      // console.log("top overlap");

      overlapTop = true;
    }

    if (xPoints.map((p) => Math.floor(p)).includes(Math.floor(left))) {
      // console.log("left overlap");
      overlapLeft = true;
    }
  }

  return (
    <button
      ref={setNodeRef}
      style={{
        top: top + "%",
        left: left + "%",
        backgroundColor: !isCenter
          ? overlapLeft
            ? "red"
            : overlapTop
            ? "orange"
            : "white"
          : undefined,
      }}
      {...listeners}
      {...attributes}
      className="draggable-button"
    >
      {children}
    </button>
  );
}

import { useStackContext } from "@/hooks/useStackContext";
import { allowableDistance } from "@/utils/consts";
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
  let nearBoth = false;

  const { snapTo } = useStackContext();

  if (!isCenter && snapTo) {
    /* eslint-disable-next-line react-hooks/rules-of-hooks */
    const { xPoints, yPoints } = useStackContext();

    const nearY =
      yPoints.filter((yPoint) => {
        return Math.abs(top - yPoint) <= allowableDistance;
      }).length > 0;

    const nearX =
      xPoints.filter((xPoint) => {
        return Math.abs(left - xPoint) <= allowableDistance;
      }).length > 0;
    // AHTODO - Doing this in every Draggable seems to be bad. Move into somewhere else to share these values?

    if (nearY) {
      // "top overlap"
      overlapTop = true;
    }

    if (nearX) {
      // "left overlap"
      overlapLeft = true;
    }

    nearBoth = nearX && nearY;
  }

  const getBgColor = () => {
    if (isCenter) {
      return undefined;
    }
    if (nearBoth) {
      return "linear-gradient(to right, red 50%, green 50% 0)";
    } else if (overlapLeft) {
      const direction = index < 2 ? "right" : "left";
      return `linear-gradient(to ${direction}, red 50%, transparent 50% 0)`;
    } else if (overlapTop) {
      const direction = [0, 3].includes(index) ? "top" : "bottom";
      return `linear-gradient(to ${direction}, transparent 50%, red 50% 0)`;
    }
  };
  return (
    <button
      ref={setNodeRef}
      style={{
        translate: `calc(${left}cqi - 50%) calc(${top}cqb - 50%)`,
        background: getBgColor(),
      }}
      {...listeners}
      {...attributes}
      className="draggable-button"
    >
      {children}
    </button>
  );
}

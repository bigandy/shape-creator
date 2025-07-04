import { Fragment, useState } from "react";

import { useStackContext } from "@hooks/useStackContext";
import { Dialog } from "@components/Dialog";
import { useStackDispatch } from "@hooks/useStackDispatch";

type Props = {
  x: number;
  y: number;
  currentIndex: number;
  editable?: boolean;
};

export const SidebarItem = ({ x, y, currentIndex, editable = true }: Props) => {
  const { activeStack } = useStackContext();
  const dispatch = useStackDispatch();

  const [dialogOpen, setDialogOpen] = useState(false);
  const deletePoint = () => {
    // setDialogOpen(true);
    // AHTODO: the dialog!
    confirmDeletion();
  };

  const handleDeletePoint = () =>
    dispatch({ type: "delete-index", payload: { index: currentIndex } });

  const handleInsertPoint = () => {
    // Insert a new point in between existing points. Put the new point half-way between the two existing points.
    const { percentX: prevX, percentY: prevY } =
      activeStack.coords[currentIndex];
    const { percentX: nextX, percentY: nextY } =
      activeStack.coords[currentIndex + 1] ?? activeStack.coords[0];

    const percentY = Math.abs(prevY - nextY) / 2 + Math.min(prevY, nextY);
    const percentX = Math.abs(prevX - nextX) / 2 + Math.min(prevX, nextX);

    const newStackPoint = { percentX, percentY };

    const nextStack = [
      ...activeStack.coords.slice(0, currentIndex + 1),
      newStackPoint,
      ...activeStack.coords.slice(currentIndex + 1),
    ];
    dispatch({
      type: "update-current-shape",
      payload: {
        coords: nextStack,
      },
    });
  };

  const confirmDeletion = () => {
    handleDeletePoint();
  };

  const handleDialogClose = () => setDialogOpen(false);

  return (
    <li>
      y: {x.toFixed(2)}% <br />
      x: {y.toFixed(2)}% <br />
      {editable && (
        <Fragment>
          <button onClick={deletePoint}>Delete Point</button>
          {/* <button onClick={() => handleEditCurrentPoint(index)}>
                  Edit Point
                </button> */}
          <br />
          <button onClick={handleInsertPoint}>Insert Point after</button>
        </Fragment>
      )}
      <Dialog
        open={dialogOpen}
        positiveCallback={confirmDeletion}
        negativeCallback={handleDialogClose}
      />
    </li>
  );
};

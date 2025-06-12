import { Fragment } from "react";

import { SidebarItem } from "@components/SidebarItem";

import { useStackDispatch } from "@/hooks/useStackDispatch";
import { useStackContext } from "@hooks/useStackContext";

import { type Shape } from "@/Types";

export const ShapeListItem = ({
  stackIndex,
  stack,
  preventEditMode,
}: {
  stackIndex: number;
  stack: Shape;
  preventEditMode?: boolean;
}) => {
  const { editingNumber, movingNumber } = useStackContext();

  const dispatch = useStackDispatch();

  const onEditShape = () => {
    dispatch({ type: "update-edit-index", payload: { index: stackIndex } });
  };

  const onDeleteShape = () => {
    dispatch({
      type: "delete-shape",
      payload: {
        index: stackIndex,
      },
    });
  };

  const onMoveShape = () => {
    dispatch({ type: "update-move-index", payload: { index: stackIndex } });
  };

  const canEdit = !preventEditMode && editingNumber === stackIndex;
  const canMove = !preventEditMode && movingNumber === stackIndex;

  return (
    <li
      className={`sidebar-shape ${canEdit ? ` editable-shape ` : ""} ${
        canMove ? ` movable-shape ` : ""
      }`}
      key={`savedStackItem-${stackIndex}`}
    >
      {stack.shape}
      <br />
      {!preventEditMode && (
        <Fragment>
          <button onClick={onEditShape}>
            {!canEdit ? "Edit" : "Unedit"} Shape?
          </button>
          <br />
          <button onClick={onDeleteShape}>Delete Shape?</button>
          <button onClick={onMoveShape}>
            {!canMove ? "Move" : "UnMove"} Shape?
          </button>
        </Fragment>
      )}

      {stack.shape === "line" ? (
        <ol>
          {stack.coords.map(({ percentX, percentY }, index) => {
            return (
              <SidebarItem
                key={`item-${index}`}
                x={percentX}
                y={percentY}
                currentIndex={index}
                editable={canEdit}
              />
            );
          })}
        </ol>
      ) : (
        <Fragment>
          {canEdit && <pre>{JSON.stringify(stack.coords, null, 2)}</pre>}
        </Fragment>
      )}
    </li>
  );
};

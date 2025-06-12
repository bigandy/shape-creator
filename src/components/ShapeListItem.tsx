import { Fragment } from "react";

import { SidebarItem } from "@components/SidebarItem";

import { useStackDispatch } from "@/hooks/useStackDispatch";
import { useStackContext } from "@hooks/useStackContext";

import { type Shape } from "@/Types";

export const ShapeListItem = ({
  stackIndex,
  stack,
  noEditMode,
}: {
  stackIndex: number;
  stack: Shape;
  noEditMode?: boolean;
}) => {
  const { editingNumber } = useStackContext();

  const dispatch = useStackDispatch();

  const handleDeleteShape = (indexToDelete: number) => {
    dispatch({
      type: "delete-shape",
      payload: {
        index: indexToDelete,
      },
    });
  };

  const onEditShape = () => {
    dispatch({ type: "update-edit-index", payload: { index: stackIndex } });
  };

  const onDeleteShape = () => {
    handleDeleteShape(stackIndex);
  };

  const canEdit = !noEditMode && editingNumber === stackIndex;

  return (
    <li
      className={canEdit ? `sidebar-shape editable-shape` : "sidebar-shape"}
      key={`savedStackItem-${stackIndex}`}
    >
      {stack.shape}
      <br />
      {!noEditMode && (
        <Fragment>
          <button onClick={onEditShape}>
            {!canEdit ? "Edit" : "Unedit"} Shape?
          </button>
          <br />
          <button onClick={onDeleteShape}>Delete Shape?</button>
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
          <p>{stack.shape}</p>
          {canEdit && <pre>{JSON.stringify(stack.coords, null, 2)}</pre>}
        </Fragment>
      )}
    </li>
  );
};

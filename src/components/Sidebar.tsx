import { SidebarItem } from "@components/SidebarItem";

import { useStackDispatch } from "@/hooks/useStackDispatch";
import { useStackContext } from "@hooks/useStackContext";

type SidebarProps = {
  open: boolean;
  handleClose: () => void;
};

export const Sidebar = ({ open, handleClose }: SidebarProps) => {
  const { savedStack, editingNumber } = useStackContext();
  const dispatch = useStackDispatch();

  const handleDeleteShape = (indexToDelete: number) => {
    dispatch({
      type: "delete-shape",
      payload: {
        index: indexToDelete,
      },
    });
  };

  const onEditShape = (index: number) => {
    if (editingNumber === index) {
      dispatch({ type: "update-edit-index", payload: { index } });
    } else {
      dispatch({
        type: "update-edit-index",
        payload: { index },
      });
    }
  };

  const onDeleteShape = (index: number) => {
    handleDeleteShape(index);
  };

  return (
    <div className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar-inner">
        <button onClick={handleClose} className="close-button">
          Close
        </button>

        {savedStack.length > 0 ? (
          <ol>
            {/* <li>Have Stack</li> */}
            {savedStack.map((stack, stackIndex) => {
              const canEdit = editingNumber === stackIndex;
              return (
                <li
                  className={
                    canEdit ? `sidebar-shape editable-shape` : "sidebar-shape"
                  }
                  key={`savedStackItem-${stackIndex}`}
                >
                  <p>
                    {stack.shape}{" "}
                    <button onClick={() => onEditShape(stackIndex)}>
                      Edit Shape?
                    </button>
                    <button onClick={() => onDeleteShape(stackIndex)}>
                      Delete Shape?
                    </button>
                  </p>
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
                    <p>{stack.shape}</p>
                  )}
                </li>
              );
            })}
          </ol>
        ) : (
          <p>No Shapes Added, Save One?</p>
        )}
        {/* {drawingMode === "line" && stack.length > 0 ? (
          <Fragment>
            <p>Current Shape</p>
            <ol>
              {stack.map(({ percentX, percentY }, index) => {
                return (
                  <SidebarItem
                    key={`item-${index}`}
                    x={percentX}
                    y={percentY}
                    currentIndex={index}
                  />
                );
              })}
            </ol>
          </Fragment>
        ) : (
          <p>No points set. Add one?</p>
        )} */}
      </div>
    </div>
  );
};

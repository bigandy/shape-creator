import type { DrawingMode } from "@/Types";
import { backgroundImages } from "@utils/sharedImages";
import { Fragment, type ChangeEvent } from "react";

import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";

type ShapeOption = { label: string; id: DrawingMode };

const shapeOptions: Array<ShapeOption> = [
  {
    label: "Line",
    id: "line",
  },
  {
    label: "Rectangle",
    id: "rectangle",
  },
  {
    label: "Circle",
    id: "circle",
  },
  {
    label: "Octagon",
    id: "octagon",
  },
];

type Props = {
  open: boolean;
  selectedImage?: string;
  handleEditToggle: () => void;
  handleImageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const Toolbar = ({ open, selectedImage, handleImageChange }: Props) => {
  const dispatch = useStackDispatch();
  const { drawingMode, savedStackLength, moveAllShapes, snapTo } =
    useStackContext();

  const handleChangeDrawingMode = (drawingMode: DrawingMode) => {
    dispatch({
      type: "change-shape",
      payload: {
        shape: drawingMode,
      },
    });
  };

  const handleDeleteLastShape = () => {
    dispatch({
      type: "delete-last-shape",
    });
  };

  const handleDeleteLastPoint = () => {
    dispatch({ type: "delete-final-point" });
  };

  const handleResetCurrentStack = () => {
    dispatch({ type: "clear-current-shape" });
  };

  const handleDeleteAllShapes = () => {
    dispatch({ type: "delete-all-shapes" });
  };

  const handleMoveAllShapes = () => {
    dispatch({ type: "move-all-shapes" });
  };

  const handleToggleSnapTo = () => {
    dispatch({ type: "toggle-snap-to" });
  };

  const handleSaveShape = () => {
    dispatch({
      type: "save-shape",
      payload: {
        shape: "line",
        coords: [],
      },
    });
  };

  return (
    <div className={`toolbar ${open ? "toolbar--open" : ""}`}>
      <div className="inner">
        {/* <div>
          <button onClick={handleCloseToolbar} className="close-button">
            Close
          </button>
        </div> */}

        <div className="buttons">
          {shapeOptions.map((option) => {
            return (
              <label key={option.id}>
                {option.label}
                <input
                  type="radio"
                  name="mode"
                  value={option.id}
                  checked={drawingMode === option.id}
                  onChange={() => handleChangeDrawingMode(option.id)}
                />
              </label>
            );
          })}

          <label>
            Select a background Image:{" "}
            <select onChange={handleImageChange} value={selectedImage}>
              <option value="">-- No Image --</option>
              {backgroundImages.map((image, index) => {
                return (
                  <option value={image.url} key={`image-${index}`}>
                    {image.title}
                  </option>
                );
              })}
            </select>
          </label>
        </div>

        <div className="buttons">
          <button
            onClick={handleDeleteLastShape}
            disabled={savedStackLength === 0}
          >
            Delete Last Shape
          </button>

          {drawingMode === "line" && (
            <Fragment>
              <button
                onClick={handleDeleteLastPoint}
                disabled={savedStackLength === 0}
              >
                Delete Last Point
              </button>
              <button
                onClick={handleResetCurrentStack}
                disabled={savedStackLength === 0}
              >
                Reset Current Shape
              </button>
              <button onClick={handleSaveShape}>Save Shape</button>
            </Fragment>
          )}

          <button
            onClick={handleDeleteAllShapes}
            // disabled={savedStackLength === 0}
          >
            Delete All Shapes
          </button>

          <button onClick={handleToggleSnapTo} disabled={moveAllShapes}>
            {snapTo ? "Disable" : "Enable"} Snap-To
          </button>

          {savedStackLength > 0 && (
            <button onClick={handleMoveAllShapes}>
              {!moveAllShapes ? "Move All" : "Stop Moving All"} Shapes?
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

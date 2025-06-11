import { backgroundImages } from "@/sharedImages";
import type { DrawingMode } from "@/Types";
import { Fragment, type ChangeEvent } from "react";

import { useStackDispatch } from "@/hooks/useStackDispatch";
import { useStackContext } from "@hooks/useStackContext";

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
];

type Props = {
  open: boolean;
  selectedImage?: string;
  handleEditToggle: () => void;
  handleImageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const Toolbar = ({ open, selectedImage, handleImageChange }: Props) => {
  const dispatch = useStackDispatch();
  const {
    drawingMode,
    // stackLength
  } = useStackContext();

  const handleChangeDrawingMode = (drawingMode: DrawingMode) => {
    // if (stackLength > 0) {
    dispatch({
      type: "change-shape",
      payload: {
        shape: drawingMode,
      },
    });
    // }
    // setDrawingMode(drawingMode);
  };

  const handleDeleteLastShape = () => {
    dispatch({
      type: "delete-current-shape",
    });
  };

  const handleDeleteLastPoint = () => {
    dispatch({ type: "delete-final-point" });
  };

  const handleResetCurrentStack = () => {
    dispatch({ type: "clear-current-shape" });
  };

  const handleDeleteAllStacks = () => {
    dispatch({ type: "clear-all-stacks" });
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
          <button onClick={handleDeleteLastShape}>Delete Current Shape</button>

          {drawingMode === "line" && (
            <Fragment>
              <button onClick={handleDeleteLastPoint}>Delete Last Point</button>
              <button onClick={handleResetCurrentStack}>
                Reset Current Shape
              </button>
              {/* <button onClick={handleSaveShape}>Save Shape</button> */}
            </Fragment>
          )}

          <button onClick={handleDeleteAllStacks}>Delete All Shapes</button>
        </div>
      </div>
    </div>
  );
};

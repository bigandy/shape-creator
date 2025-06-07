import { Fragment, type ChangeEvent, useContext } from "react";
import { backgroundImages } from "@/sharedImages";
import type { DrawingMode } from "@/Types";

import { useStackContext } from "@context/StackContext";

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
  drawingMode: DrawingMode;
  stackActive: boolean;
  canRemoveShapes: boolean;
  handleChangeDrawingMode: (drawingMode: DrawingMode) => void;
  handleEditToggle: () => void;
  handleImageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export const Toolbar = ({
  open,
  selectedImage,
  drawingMode,
  stackActive,
  canRemoveShapes,
  handleChangeDrawingMode,
  handleImageChange,
}: Props) => {
  const { setSavedStack, savedStack, setStack } = useStackContext();

  const handleRemoveLastShape = () => {
    setSavedStack((savedStack) =>
      savedStack.filter(
        (_, index, stackArray) => index !== stackArray.length - 1
      )
    );
  };

  const handleSaveShape = () => {
    setSavedStack([...savedStack, { shape: drawingMode, coords: stack }]);
    setStack([]);
  };

  const handleRemoveLastPoint = () => {
    setStack(
      stack.filter((_, index, stackArray) => index !== stackArray.length - 1)
    );
  };

  const handleResetCurrentStack = () => {
    // countRef.current = countRef.current + 1;
    setStack([]);
  };

  const handleDeleteAllStacks = () => {
    setStack([]);
    setSavedStack([]);
    // countRef.current = countRef.current + 1;
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
          <button onClick={handleRemoveLastShape} disabled={!canRemoveShapes}>
            Remove Last Shape
          </button>

          {drawingMode === "line" && (
            <Fragment>
              <button onClick={handleRemoveLastPoint} disabled={!stackActive}>
                Remove Last Point
              </button>
              <button onClick={handleResetCurrentStack} disabled={!stackActive}>
                Reset Current Shape
              </button>
              <button onClick={handleSaveShape}>Save Shape</button>
            </Fragment>
          )}

          <button onClick={handleDeleteAllStacks} disabled={!stackActive}>
            Delete All Shapes
          </button>
        </div>
      </div>
    </div>
  );
};

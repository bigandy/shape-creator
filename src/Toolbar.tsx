import { type ChangeEvent } from "react";

type Props = {
  open: boolean;
  selectedImage?: string;
  drawingMode: DrawingMode;
  useAllShapes: boolean;
  stackActive: boolean;
  showCode: boolean;
  handleChangeDrawingMode: (drawingMode: DrawingMode) => void;
  handleRemoveLastPoint: () => void;
  handleEditToggle: () => void;
  handleResetCurrentStack: () => void;
  handleResetAllStacks: () => void;
  handleImageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveShape: () => void;
  handleUseAllShapesToggle: () => void;
  handleShowCodeToggle: () => void;
};

import { possibleImages } from "./sharedImages";
import type { DrawingMode } from "./Types";

export const Toolbar = ({
  open,
  selectedImage,
  useAllShapes,
  drawingMode,
  stackActive,
  showCode,
  handleChangeDrawingMode,
  handleRemoveLastPoint,
  handleEditToggle,
  handleResetCurrentStack,
  handleResetAllStacks,
  handleImageChange,
  handleSaveShape,
  handleUseAllShapesToggle,
  handleShowCodeToggle,
}: Props) => {
  return (
    <div className="toolbar">
      <h2>Toolbar</h2>

      <div className="buttons">
        <label>
          Line
          <input
            type="radio"
            name="mode"
            value="line"
            checked={drawingMode === "line"}
            onChange={() => handleChangeDrawingMode("line")}
          />
        </label>
        <label>
          Rectangle
          <input
            type="radio"
            name="mode"
            value="rectangle"
            checked={drawingMode === "rectangle"}
            onChange={() => handleChangeDrawingMode("rectangle")}
          />
        </label>
      </div>

      <div className="buttons">
        <button onClick={handleRemoveLastPoint}>Remove Last Point</button>

        <button onClick={handleEditToggle}>
          {open ? "Save Points" : "Edit Points"}
        </button>

        <button onClick={handleResetCurrentStack} disabled={!stackActive}>
          Reset Current Shape
        </button>

        <button onClick={handleResetAllStacks}>Reset All Shapes</button>

        <select onChange={handleImageChange} value={selectedImage}>
          <option value=""></option>
          {possibleImages.map((image, index) => {
            return (
              <option value={image.url} key={`image-${index}`}>
                {image.title}
              </option>
            );
          })}
        </select>

        <button onClick={handleSaveShape}>Save Shape</button>

        <button onClick={handleUseAllShapesToggle}>
          {useAllShapes ? "One Shape" : "All Shapes"}
        </button>
      </div>

      <div>
        <button onClick={handleShowCodeToggle}>
          {showCode ? "Hide" : "Show"} Code
        </button>
      </div>
    </div>
  );
};

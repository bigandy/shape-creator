import { type ChangeEvent, type Dispatch, type SetStateAction } from "react";

type Props = {
  open: boolean;
  selectedImage?: string;
  useAllShapes: boolean;
  drawingMode: DrawingMode;
  setDrawingMode: Dispatch<SetStateAction<DrawingMode>>;
  handleRemoveLastPoint: () => void;
  handleEditToggle: () => void;
  handleResetCurrentStack: () => void;
  handleResetAllStacks: () => void;
  handleImageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveShape: () => void;
  handleUseAllShapesToggle: () => void;
};

import { possibleImages } from "./sharedImages";
import type { DrawingMode } from "./Types";

export const Toolbar = ({
  drawingMode,
  open,
  selectedImage,
  useAllShapes,
  setDrawingMode,
  handleRemoveLastPoint,
  handleEditToggle,
  handleResetCurrentStack,
  handleResetAllStacks,
  handleImageChange,
  handleSaveShape,
  handleUseAllShapesToggle,
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
            onChange={() => setDrawingMode("line")}
          />
        </label>
        <label>
          Rectangle
          <input
            type="radio"
            name="mode"
            value="rectangle"
            checked={drawingMode === "rectangle"}
            onChange={() => setDrawingMode("rectangle")}
          />
        </label>
      </div>

      <div className="buttons">
        <button onClick={handleRemoveLastPoint}>Remove Last Point</button>

        <button onClick={handleEditToggle}>
          {open ? "Save Points" : "Edit Points"}
        </button>

        <button onClick={handleResetCurrentStack}>Reset Current Shape</button>

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
    </div>
  );
};

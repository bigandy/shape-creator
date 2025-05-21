import { type ChangeEvent } from "react";

type Props = {
  open: boolean;
  selectedImage?: string;
  drawingMode: DrawingMode;
  useAllShapes: boolean;
  stackActive: boolean;
  showCode: boolean;
  canRemoveShapes: boolean;
  handleRemoveLastShape: () => void;
  handleChangeDrawingMode: (drawingMode: DrawingMode) => void;
  handleRemoveLastPoint: () => void;
  handleEditToggle: () => void;
  handleResetCurrentStack: () => void;
  handleResetAllStacks: () => void;
  handleImageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveShape: () => void;
  handleUseAllShapesToggle: () => void;
  handleShowCodeToggle: () => void;
  handleCloseToolbar: () => void;
};

import { possibleImages } from "./sharedImages";
import type { DrawingMode } from "./Types";

const shapeOptions: Array<{ label: string; id: DrawingMode }> = [
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

export const Toolbar = ({
  open,
  selectedImage,
  useAllShapes,
  drawingMode,
  stackActive,
  canRemoveShapes,
  showCode,
  handleRemoveLastShape,
  handleChangeDrawingMode,
  handleRemoveLastPoint,
  handleEditToggle,
  handleResetCurrentStack,
  handleResetAllStacks,
  handleImageChange,
  handleSaveShape,
  handleUseAllShapesToggle,
  handleShowCodeToggle,
  handleCloseToolbar,
}: Props) => {
  return (
    <div className={`toolbar ${open ? "toolbar--open" : ""}`}>
      <div className="inner">
        <button className="toolbar-toggle-button" onClick={handleCloseToolbar}>
          Close
        </button>

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
        </div>

        <div className="buttons">
          <button onClick={handleRemoveLastShape} disabled={!canRemoveShapes}>
            Remove Last Shape
          </button>

          <button onClick={handleRemoveLastPoint} disabled={!stackActive}>
            Remove Last Point
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
          {/* <button onClick={handleEditToggle}>Open Sidebar - Edit Points</button> */}
        </div>

        <div>
          <button onClick={handleShowCodeToggle}>
            {showCode ? "Hide" : "Show"} Code
          </button>
        </div>
      </div>
    </div>
  );
};

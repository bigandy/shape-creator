import { Fragment, type ChangeEvent, type ChangeEventHandler } from "react";
import { backgroundImages } from "@/sharedImages";
import type { DrawingMode } from "@/Types";

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
  useAllShapes: boolean;
  stackActive: boolean;
  canRemoveShapes: boolean;
  precision: number;
  handleRemoveLastShape: () => void;
  handleChangeDrawingMode: (drawingMode: DrawingMode) => void;
  handleRemoveLastPoint: () => void;
  handleEditToggle: () => void;
  handleResetCurrentStack: () => void;
  handleResetAllStacks: () => void;
  handleImageChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  handleSaveShape: () => void;
  handleUseAllShapesToggle: () => void;
  handleCloseToolbar: () => void;
  handleSetPrecision: ChangeEventHandler<HTMLInputElement>;
};

export const Toolbar = ({
  open,
  selectedImage,
  useAllShapes,
  drawingMode,
  stackActive,
  canRemoveShapes,
  precision,
  handleRemoveLastShape,
  handleChangeDrawingMode,
  handleRemoveLastPoint,
  handleResetCurrentStack,
  handleResetAllStacks,
  handleImageChange,
  handleSaveShape,
  handleUseAllShapesToggle,
  handleCloseToolbar,
  handleSetPrecision,
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

          <label>
            Precision
            <input
              type="number"
              value={precision}
              onChange={handleSetPrecision}
              min="0"
              max="21"
            />
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
            </Fragment>
          )}

          <button onClick={handleResetAllStacks}>Reset All Shapes</button>

          <button onClick={handleSaveShape}>Save Shape</button>

          {drawingMode === "line" && (
            <button onClick={handleUseAllShapesToggle}>
              {useAllShapes ? "One Shape" : "All Shapes"}
            </button>
          )}

          {/* <button onClick={handleEditToggle}>Open Sidebar - Edit Points</button> */}
        </div>
      </div>
    </div>
  );
};

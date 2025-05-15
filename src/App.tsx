import { useState, type ChangeEvent } from "react";

import { OutputBox } from "./OutputBox";
import { OutputBoxAllShapes } from "./OutputBoxAllShapes";
import { ClickArea } from "./ClickArea";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";

import { possibleImages } from "./sharedImages";

import "./App.css";

import { type DrawingMode, type Coords, type Shape } from "./Types";

function App() {
  const [stack, setStack] = useState<Coords[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(possibleImages[0].url);
  const [savedStack, setSavedStack] = useState<Shape[]>([]);
  const [useAllShapes, setUseAllShapes] = useState(true);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("line");

  const handleRemoveLastPoint = () => {
    setStack(
      stack.filter((_, index, stackArray) => index !== stackArray.length - 1)
    );
  };

  const handleEditToggle = () => {
    setOpen((open) => !open);
  };

  const handleResetCurrentStack = () => setStack([]);
  const handleResetAllStacks = () => {
    setStack([]);
    setSavedStack([]);
  };

  const handleCloseSidebar = () => setOpen(false);

  const handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedImage(e.target.value);
  };

  const handleUseAllShapesToggle = () => setUseAllShapes((useAll) => !useAll);

  const handleSaveShape = () => {
    setSavedStack([...savedStack, stack]);
    // clear current stack
    setStack([]);
  };

  return (
    <>
      <ClickArea stack={stack} setStack={setStack} drawingMode={drawingMode} />

      {useAllShapes ? (
        <OutputBoxAllShapes
          savedStack={savedStack}
          currentStack={stack}
          selectedImage={selectedImage}
        />
      ) : (
        <OutputBox stack={stack} selectedImage={selectedImage} />
      )}

      <Toolbar
        open={open}
        selectedImage={selectedImage}
        useAllShapes={useAllShapes}
        drawingMode={drawingMode}
        setDrawingMode={setDrawingMode}
        handleEditToggle={handleEditToggle}
        handleRemoveLastPoint={handleRemoveLastPoint}
        handleResetCurrentStack={handleResetCurrentStack}
        handleResetAllStacks={handleResetAllStacks}
        handleImageChange={handleImageChange}
        handleSaveShape={handleSaveShape}
        handleUseAllShapesToggle={handleUseAllShapesToggle}
      />

      <Sidebar
        open={open}
        handleClose={handleCloseSidebar}
        stack={stack}
        setStack={setStack}
        savedStack={savedStack}
      />
    </>
  );
}

export default App;

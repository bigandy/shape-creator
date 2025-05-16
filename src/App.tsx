import { Fragment, useState, type ChangeEvent, useRef } from "react";

import { OutputBox } from "./OutputBox";
import { OutputBoxAllShapes } from "./OutputBoxAllShapes";
import { ClickArea } from "./ClickArea";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";
import { CodeViewer } from "./CodeViewer";

import { possibleImages } from "./sharedImages";

import "./App.css";

import { type DrawingMode, type Coords, type Shape } from "./Types";
import { ClickAreaRectangle } from "./ClickAreaRectangle";

function App() {
  const countRef = useRef(0);
  const [stack, setStack] = useState<Coords[]>([]);
  const [open, setOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(possibleImages[0].url);
  const [savedStack, setSavedStack] = useState<Shape[]>([]);
  const [useAllShapes, setUseAllShapes] = useState(true);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("rectangle");
  const [showCode, setShowCode] = useState(false);

  const handleRemoveLastPoint = () => {
    setStack(
      stack.filter((_, index, stackArray) => index !== stackArray.length - 1)
    );
  };

  const handleEditToggle = () => {
    setOpen((open) => !open);
  };

  const handleResetCurrentStack = () => {
    countRef.current = countRef.current + 1;
    setStack([]);
  };
  const handleResetAllStacks = () => {
    setStack([]);
    setSavedStack([]);
    countRef.current = countRef.current + 1;
  };

  const handleCloseSidebar = () => setOpen(false);

  const handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedImage(e.target.value);
  };

  const handleUseAllShapesToggle = () => setUseAllShapes((useAll) => !useAll);

  const handleSaveShape = () => {
    // if (stack.length === 0) {
    //   console.log("cannot save, nothing to save");
    //   return;
    // }
    // console.log("save shape", [...savedStack, stack]);
    setSavedStack([...savedStack, stack]);
    // clear current stack
    setStack([]);
  };

  const handleSaveShapeToStack = (stack) => {
    console.log({ stack });
    setSavedStack((savedStack) => [...savedStack, stack]);
    setStack([]);
  };

  const handleChangeDrawingMode = (drawingMode: DrawingMode) => {
    if (stack.length > 0) {
      setSavedStack([...savedStack, stack]);
      setStack([]);
    }

    setDrawingMode(drawingMode);
  };

  const handleShowCodeToggle = () => setShowCode((o) => !o);

  return (
    <Fragment>
      {drawingMode === "rectangle" ? (
        <ClickAreaRectangle
          stack={stack}
          setStack={setStack}
          handleSaveShapeToStack={handleSaveShapeToStack}
        />
      ) : (
        <ClickArea stack={stack} setStack={setStack} key={countRef.current} />
      )}

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
        stackActive={stack.length !== 0}
        open={open}
        selectedImage={selectedImage}
        useAllShapes={useAllShapes}
        drawingMode={drawingMode}
        showCode={showCode}
        handleChangeDrawingMode={handleChangeDrawingMode}
        handleEditToggle={handleEditToggle}
        handleRemoveLastPoint={handleRemoveLastPoint}
        handleResetCurrentStack={handleResetCurrentStack}
        handleResetAllStacks={handleResetAllStacks}
        handleImageChange={handleImageChange}
        handleSaveShape={handleSaveShape}
        handleUseAllShapesToggle={handleUseAllShapesToggle}
        handleShowCodeToggle={handleShowCodeToggle}
      />

      <Sidebar
        open={open}
        handleClose={handleCloseSidebar}
        stack={stack}
        setStack={setStack}
        savedStack={savedStack}
      />

      <CodeViewer
        open={showCode}
        savedStack={savedStack}
        currentStack={stack}
        handleClose={() => setShowCode(false)}
      />
    </Fragment>
  );
}

export default App;

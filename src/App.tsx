import { Fragment, useState, type ChangeEvent, useRef } from "react";

import { OutputBox } from "@components/OutputBox";
import { OutputBoxAllShapes } from "@components/OutputBoxAllShapes";
import { ClickAreaLine } from "@components/ClickAreaLine";
import { Toolbar } from "@components/Toolbar";
import { Sidebar } from "@components/Sidebar";
import { CodeViewer } from "@components/CodeViewer";
import { ClickAreaRectangle } from "@components/ClickAreaRectangle";
import { ClickAreaCircle } from "@components/ClickAreaCircle";

import { possibleImages } from "@components/sharedImages";

import "./App.css";

import { type DrawingMode, type Coords, type Shape } from "./Types";

function App() {
  const countRef = useRef(0);
  const [stack, setStack] = useState<Coords[]>([]);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(possibleImages[0].url);
  const [savedStack, setSavedStack] = useState<Shape[]>([]);
  const [useAllShapes, setUseAllShapes] = useState(true);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("circle");
  const [showCode, setShowCode] = useState(false);
  const [editbarOpen, setEditbarOpen] = useState(false);

  const handleRemoveLastPoint = () => {
    setStack(
      stack.filter((_, index, stackArray) => index !== stackArray.length - 1)
    );
  };

  const handleEditToggle = () => {
    setEditbarOpen((open) => !open);
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

  const handleCloseSidebar = () => setEditbarOpen(false);

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
    setSavedStack([...savedStack, { shape: drawingMode, coords: stack }]);
    // clear current stack
    setStack([]);
  };

  const handleSaveShapeToStack = (coords: Coords[], shape: DrawingMode) => {
    setSavedStack((savedStack) => [...savedStack, { shape, coords }]);
    setStack([]);
  };

  const handleChangeDrawingMode = (drawingMode: DrawingMode) => {
    if (stack.length > 0) {
      setSavedStack([...savedStack, { shape: drawingMode, coords: stack }]);
      setStack([]);
    }

    setDrawingMode(drawingMode);
  };

  const handleShowCodeToggle = () => setShowCode((o) => !o);
  const handleToolbarToggle = () => setToolbarOpen((o) => !o);
  const handleCloseToolbar = () => setToolbarOpen(false);

  const handleRemoveLastShape = () => {
    setSavedStack((savedStack) =>
      savedStack.filter(
        (_, index, stackArray) => index !== stackArray.length - 1
      )
    );
  };

  return (
    <Fragment>
      <button className="toolbar-toggle-button" onClick={handleToolbarToggle}>
        Toolbar Toggle
      </button>
      {drawingMode === "rectangle" && (
        <ClickAreaRectangle
          stack={stack}
          setStack={setStack}
          handleSaveShapeToStack={handleSaveShapeToStack}
        />
      )}
      {drawingMode === "line" && (
        <ClickAreaLine
          stack={stack}
          setStack={setStack}
          key={countRef.current}
        />
      )}

      {drawingMode === "circle" && (
        <ClickAreaCircle
          stack={stack}
          setStack={setStack}
          key={countRef.current}
          handleSaveShapeToStack={handleSaveShapeToStack}
        />
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
        open={toolbarOpen}
        selectedImage={selectedImage}
        useAllShapes={useAllShapes}
        drawingMode={drawingMode}
        showCode={showCode}
        canRemoveShapes={savedStack.length !== 0}
        handleRemoveLastShape={handleRemoveLastShape}
        handleChangeDrawingMode={handleChangeDrawingMode}
        handleEditToggle={handleEditToggle}
        handleRemoveLastPoint={handleRemoveLastPoint}
        handleResetCurrentStack={handleResetCurrentStack}
        handleResetAllStacks={handleResetAllStacks}
        handleImageChange={handleImageChange}
        handleSaveShape={handleSaveShape}
        handleUseAllShapesToggle={handleUseAllShapesToggle}
        handleShowCodeToggle={handleShowCodeToggle}
        handleCloseToolbar={handleCloseToolbar}
      />

      <Sidebar
        open={editbarOpen}
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

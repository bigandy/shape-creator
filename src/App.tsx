import { Fragment, useState, useRef, type ChangeEvent } from "react";

import { Toaster } from "react-hot-toast";

import { OutputBox } from "@components/OutputBox";
import { ClickAreaLine } from "@components/ClickAreaLine";
import { Toolbar } from "@components/Toolbar";
import { Sidebar } from "@components/Sidebar";
import { CodeViewer } from "@components/CodeViewer";
import { ClickAreaRectangle } from "@components/ClickAreaRectangle";
import { ClickAreaCircle } from "@components/ClickAreaCircle";

import { backgroundImages } from "@/sharedImages";

import "./App.css";

import { type DrawingMode, type Coords, type Shape } from "./Types";

function App() {
  const countRef = useRef(0);
  const [stack, setStack] = useState<Coords[]>([]);
  const [toolbarOpen, setToolbarOpen] = useState(false);
  const [codeViewerOpen, setCodeViewerOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [backgroundImage, setBackgroundImage] = useState(
    backgroundImages[0].url
  );
  const [savedStack, setSavedStack] = useState<Shape[]>([]);
  const [useAllShapes, setUseAllShapes] = useState(true);
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("rectangle");

  const [precision, setPrecision] = useState(2);

  const handleRemoveLastPoint = () => {
    setStack(
      stack.filter((_, index, stackArray) => index !== stackArray.length - 1)
    );
  };

  const handleEditToggle = () => {
    setSidebarOpen((open) => !open);
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

  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBackgroundImage(e.target.value);
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

  const handleShowCodeToggle = () => setCodeViewerOpen((o) => !o);
  const handleToolbarToggle = () => setToolbarOpen((o) => !o);
  const handleCloseToolbar = () => setToolbarOpen(false);
  const handleSidebarToggle = () => setSidebarOpen((o) => !o);

  const handleRemoveLastShape = () => {
    setSavedStack((savedStack) =>
      savedStack.filter(
        (_, index, stackArray) => index !== stackArray.length - 1
      )
    );
  };

  const handleSetPrecision = (e: ChangeEvent<HTMLInputElement>) => {
    setPrecision(Number(e.target.value));
  };

  return (
    <Fragment>
      <Toolbar
        stackActive={stack.length !== 0}
        open={toolbarOpen}
        selectedImage={backgroundImage}
        useAllShapes={useAllShapes}
        drawingMode={drawingMode}
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
        handleCloseToolbar={handleCloseToolbar}
      />
      <main>
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

        <OutputBox
          savedStack={savedStack}
          currentStack={stack}
          backgroundImage={backgroundImage}
          precision={precision}
        />
      </main>

      <Sidebar
        open={sidebarOpen}
        handleClose={handleCloseSidebar}
        stack={stack}
        setStack={setStack}
        savedStack={savedStack}
      />

      <CodeViewer
        open={codeViewerOpen}
        savedStack={savedStack}
        currentStack={stack}
        handleClose={() => setCodeViewerOpen(false)}
        precision={precision}
        handleSetPrecision={handleSetPrecision}
      />
      <button className="toggle-code-button" onClick={handleShowCodeToggle}>
        {codeViewerOpen ? "Hide" : "Show"} Code
      </button>

      <button className="toggle-toolbar-button" onClick={handleToolbarToggle}>
        {toolbarOpen ? "Hide" : "Show"} Toolbar
      </button>

      {/* <button className="toggle-sidebar-button" onClick={handleSidebarToggle}>
        {sidebarOpen ? "Hide" : "Show"} Sidebar
      </button> */}
      <Toaster position="bottom-center" />
    </Fragment>
  );
}

export default App;

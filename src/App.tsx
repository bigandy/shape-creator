import { Fragment, useRef, useState, type ChangeEvent } from "react";

import { Toaster } from "react-hot-toast";

import { ClickAreaCircle } from "@components/ClickAreaCircle";
import { ClickAreaLine } from "@components/ClickAreaLine";
import { ClickAreaRectangle } from "@components/ClickAreaRectangle";
import { CodeViewer } from "@components/CodeViewer";
import { OutputBox } from "@components/OutputBox";
import { Sidebar } from "@components/Sidebar";
import { Toolbar } from "@components/Toolbar";

import { backgroundImages } from "@/sharedImages";

import { StackProvider } from "@context/StackProvider";

import "./App.css";

import { type DrawingMode } from "./Types";

function App() {
  const countRef = useRef(0);

  const [toolbarOpen, setToolbarOpen] = useState(true);
  const [codeViewerOpen, setCodeViewerOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(
    backgroundImages[0].url
  );
  const [drawingMode, setDrawingMode] = useState<DrawingMode>("line");

  const [editingNumber, setEditingNumber] = useState<undefined | number>(
    undefined
  );

  const handleEditToggle = () => {
    setSidebarOpen((open) => !open);
  };

  const handleCloseSidebar = () => setSidebarOpen(false);

  const handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setBackgroundImage(e.target.value);
  };

  const handleShowCodeToggle = () => setCodeViewerOpen((o) => !o);
  const handleToolbarToggle = () => setToolbarOpen((o) => !o);
  const handleSidebarToggle = () => setSidebarOpen((o) => !o);

  return (
    <Fragment>
      <Toolbar
        stackActive={true} // AHTODO: fix
        open={toolbarOpen}
        selectedImage={backgroundImage}
        drawingMode={drawingMode}
        canRemoveShapes={true} // AHTODO: fix
        setDrawingMode={setDrawingMode}
        handleEditToggle={handleEditToggle}
        handleImageChange={handleImageChange}
      />
      <main>
        {drawingMode === "line" && <ClickAreaLine key={countRef.current} />}
        {drawingMode === "rectangle" && <ClickAreaRectangle />}
        {drawingMode === "circle" && <ClickAreaCircle key={countRef.current} />}

        <OutputBox backgroundImage={backgroundImage} />
      </main>

      <CodeViewer
        open={codeViewerOpen}
        handleClose={() => setCodeViewerOpen(false)}
      />

      <button className="toggle-code-button" onClick={handleShowCodeToggle}>
        {codeViewerOpen ? "Hide" : "Show"} Code
      </button>

      <button className="toggle-toolbar-button" onClick={handleToolbarToggle}>
        {toolbarOpen ? "Hide" : "Show"} Toolbar
      </button>

      <Sidebar
        open={sidebarOpen}
        handleClose={handleCloseSidebar}
        drawingMode={drawingMode}
        editingNumber={editingNumber}
        setEditingNumber={setEditingNumber}
      />

      <button className="toggle-sidebar-button" onClick={handleSidebarToggle}>
        {sidebarOpen ? "Hide" : "Show"} Sidebar
      </button>
      <Toaster position="bottom-center" />
    </Fragment>
  );
}

const WrappedApp = () => {
  return (
    <StackProvider>
      <App />
    </StackProvider>
  );
};

export default WrappedApp;

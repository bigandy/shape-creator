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

import { useStackContext } from "./hooks/useStackContext";

function App() {
  const countRef = useRef(0);

  const [toolbarOpen, setToolbarOpen] = useState(true);
  const [codeViewerOpen, setCodeViewerOpen] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [backgroundImage, setBackgroundImage] = useState(
    backgroundImages[0].url
  );
  const { editingNumber, savedStack } = useStackContext();

  const drawingMode = savedStack[editingNumber]?.shape || "line";

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
  const handleCodeViewerClose = () => setCodeViewerOpen(false);

  return (
    <Fragment>
      <Toolbar
        open={toolbarOpen}
        selectedImage={backgroundImage}
        drawingMode={drawingMode}
        handleEditToggle={handleEditToggle}
        handleImageChange={handleImageChange}
      />
      <main>
        {drawingMode === "line" && <ClickAreaLine key={countRef.current} />}
        {drawingMode === "rectangle" && <ClickAreaRectangle />}
        {drawingMode === "circle" && <ClickAreaCircle key={countRef.current} />}

        <OutputBox backgroundImage={backgroundImage} />
      </main>

      <CodeViewer open={codeViewerOpen} handleClose={handleCodeViewerClose} />

      <button className="toggle-code-button" onClick={handleShowCodeToggle}>
        {codeViewerOpen ? "Hide" : "Show"} Code
      </button>

      <button className="toggle-toolbar-button" onClick={handleToolbarToggle}>
        {toolbarOpen ? "Hide" : "Show"} Toolbar
      </button>

      <Sidebar open={sidebarOpen} handleClose={handleCloseSidebar} />

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

import { ClickAreaCircle } from "@components/ClickArea/Circle";
import { ClickAreaLineWrapper } from "@components/ClickArea/Line";
import { ClickAreaRectangle } from "@components/ClickArea/Rectangle";
import { CodeViewer } from "@components/CodeViewer";
import { OutputBox } from "@components/OutputBox";
import { Sidebar } from "@components/Sidebar";
import { Toolbar } from "@components/Toolbar";
import { ViewingBar } from "@components/ViewingBar";
import { StackProvider } from "@context/StackProvider";
import { backgroundImages } from "@utils/sharedImages";
import { type ChangeEvent, Fragment, useState } from "react";
import { Toaster } from "react-hot-toast";

import "./App.css";

import { useStackContext } from "./hooks/useStackContext";

function App() {
	const [toolbarOpen, setToolbarOpen] = useState(true);
	const [codeViewerOpen, setCodeViewerOpen] = useState(false);
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const [backgroundImage, setBackgroundImage] = useState(
		backgroundImages[0].url,
	);
	const [viewingBarOpen, setViewingBarOpen] = useState(true);

	const { drawingMode } = useStackContext();

	const handleEditToggle = () => {
		setSidebarOpen((open) => !open);
	};

	const handleCloseSidebar = () => setSidebarOpen(false);
	const handleCloseViewingBar = () => setViewingBarOpen(false);

	const handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
		setBackgroundImage(e.target.value);
	};

	const handleShowCodeToggle = () => setCodeViewerOpen((o) => !o);
	const handleToolbarToggle = () => setToolbarOpen((o) => !o);
	const handleSidebarToggle = () => setSidebarOpen((o) => !o);
	const handleCodeViewerClose = () => setCodeViewerOpen(false);
	const handleViewingBarToggle = () => setViewingBarOpen((o) => !o);

	return (
		<Fragment>
			<Toolbar
				open={toolbarOpen}
				selectedImage={backgroundImage}
				handleEditToggle={handleEditToggle}
				handleImageChange={handleImageChange}
			/>
			<main>
				{drawingMode === "line" && <ClickAreaLineWrapper />}
				{drawingMode === "rectangle" && <ClickAreaRectangle />}
				{drawingMode === "circle" && <ClickAreaCircle />}

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

			<ViewingBar
				open={viewingBarOpen}
				handleClose={handleCloseViewingBar}
				backgroundImage={backgroundImage}
			/>

			<button className="toggle-sidebar-button" onClick={handleSidebarToggle}>
				{sidebarOpen ? "Hide" : "Show"} Sidebar
			</button>

			<button className="toggle-viewing-bar" onClick={handleViewingBarToggle}>
				{viewingBarOpen ? "Hide" : "Show"} Viewing Bar
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

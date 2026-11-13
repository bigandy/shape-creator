import { ClickAreaCircle } from "@components/ClickArea/Circle";
import { ClickAreaLineWrapper } from "@components/ClickArea/Line";
import { ClickAreaRectangle } from "@components/ClickArea/Rectangle";
import { CodeViewer } from "@/components/CodeViewer";
import { OutputBox } from "@components/OutputBox";
import { Sidebar } from "@/components/Sidebar";
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
	const [codeViewerOpen, setCodeViewerOpen] = useState(true);
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [viewingBarOpen, setViewingBarOpen] = useState(true);

	const [backgroundImage, setBackgroundImage] = useState(
		backgroundImages[0].url,
	);

	const { drawingMode } = useStackContext();

	// const handleEditToggle = () => {
	// 	setSidebarOpen((open) => !open);
	// };

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
			<main>
				<Toolbar
					open={toolbarOpen}
					selectedImage={backgroundImage}
					handleToggle={handleToolbarToggle}
					handleImageChange={handleImageChange}
				/>

				<div className="drawing-area">
					{drawingMode === "line" && <ClickAreaLineWrapper />}
					{drawingMode === "rectangle" && <ClickAreaRectangle />}
					{drawingMode === "circle" && <ClickAreaCircle />}

					<OutputBox backgroundImage={backgroundImage} />
				</div>

				<CodeViewer
					open={codeViewerOpen}
					handleToggle={handleShowCodeToggle}
					handleClose={handleCodeViewerClose}
				/>

				<ViewingBar
					open={viewingBarOpen}
					handleToggle={handleViewingBarToggle}
					handleClose={handleCloseViewingBar}
					backgroundImage={backgroundImage}
				/>
			</main>

			<Sidebar
				open={sidebarOpen}
				handleToggle={handleSidebarToggle}
				handleClose={handleCloseSidebar}
			/>

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

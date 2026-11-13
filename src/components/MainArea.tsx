import { ClickAreaCircle } from "@components/ClickArea/Circle";
import { ClickAreaLineWrapper } from "@components/ClickArea/Line";
import { ClickAreaRectangle } from "@components/ClickArea/Rectangle";
import { OutputBox } from "@components/OutputBox";
import { Toolbar } from "@components/Toolbar";
import { backgroundImages } from "@utils/sharedImages";
import { type ChangeEvent, useState } from "react";
import { CodeOutput } from "@/components/CodeOutput";
import { ViewingBar } from "@/components/ViewingBar";

import { useStackContext } from "@/hooks/useStackContext";

// type MainAreaProps = {};

export const MainArea = () => {
    const [toolbarOpen, setToolbarOpen] = useState(true);
    const [codeOutputOpen, setCodeOutputOpen] = useState(true);
    const [viewingBarOpen, setViewingBarOpen] = useState(true);

    const [backgroundImage, setBackgroundImage] = useState(
        backgroundImages[0].url,
    );

    const { drawingMode } = useStackContext();

    // const handleEditToggle = () => {
    // 	setSidebarOpen((open) => !open);
    // };

    const handleCloseViewingBar = () => setViewingBarOpen(false);

    const handleImageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setBackgroundImage(e.target.value);
    };

    const handleShowCodeToggle = () => setCodeOutputOpen((o) => !o);
    const handleToolbarToggle = () => setToolbarOpen((o) => !o);
    const handleCodeViewerClose = () => setCodeOutputOpen(false);
    const handleViewingBarToggle = () => setViewingBarOpen((o) => !o);
    return (
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

            <CodeOutput
                open={codeOutputOpen}
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
    );
};

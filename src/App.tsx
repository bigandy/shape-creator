import { useState } from "react";

import { OutputBox } from "./OutputBox";
import { OutputBoxAllShapes } from "./OutputBoxAllShapes";
import { ClickArea } from "./ClickArea";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";

import { possibleImages } from "./sharedImages";

import "./App.css";

import type { Coords, Shape } from "./Types";

function App() {
  const [stack, setStack] = useState<Coords[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(possibleImages[0].url);
  const [savedStack, setSavedStack] = useState<Shape[]>([]);
  const [useAllShapes, setUseAllShapes] = useState(true);

  const handleRemoveLastPoint = () => {
    setStack(
      stack.filter((_, index, stackArray) => index !== stackArray.length - 1)
    );
  };

  const handleEditToggle = () => {
    setIsEditing((editing) => !editing);
  };

  const handleResetCurrentStack = () => setStack([]);
  const handleResetAllStacks = () => {
    setStack([]);
    setSavedStack([]);
  };

  const handleCloseSidebar = () => setIsEditing(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.value);
  };

  const handleUseAllShapesToggle = () => setUseAllShapes((useAll) => !useAll);

  // AHTODO!
  // This will enable the saving of multiple shapes within the shape().
  const handleSaveShape = () => {
    // add stack to savedStack
    const newStack = [...savedStack, stack];
    setSavedStack(newStack);
    // clear stack ??
    setStack([]);
  };

  return (
    <>
      <ClickArea stack={stack} setStack={setStack} isEditing={isEditing} />

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
        isEditing={isEditing}
        selectedImage={selectedImage}
        useAllShapes={useAllShapes}
        handleEditToggle={handleEditToggle}
        handleRemoveLastPoint={handleRemoveLastPoint}
        handleResetCurrentStack={handleResetCurrentStack}
        handleResetAllStacks={handleResetAllStacks}
        handleImageChange={handleImageChange}
        handleSaveShape={handleSaveShape}
        handleUseAllShapesToggle={handleUseAllShapesToggle}
      />

      <Sidebar
        open={isEditing}
        handleClose={handleCloseSidebar}
        stack={stack}
        setStack={setStack}
        savedStack={savedStack}
      />
    </>
  );
}

export default App;

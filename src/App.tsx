import { useState } from "react";

import { OutputBox } from "./OutputBox";
import { ClickArea } from "./ClickArea";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";

import "./App.css";

import type { Coords, Shape } from "./Types";

function App() {
  const [stack, setStack] = useState<Coords[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [savedStack, setSavedStack] = useState<Shape[]>([]);

  const handleRemoveLastPoint = () => {
    setStack(
      stack.filter((_, index, stackArray) => index !== stackArray.length - 1)
    );
  };

  const handleEditToggle = () => {
    setIsEditing((editing) => !editing);
  };

  const handleReset = () => setStack([]);

  const handleCloseSidebar = () => setIsEditing(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.value);
  };

  // AHTODO!
  // This will enable the saving of multiple shapes within the shape().
  const handleSaveShape = () => {
    // add stack to savedStack
    const newStack = [...savedStack, stack];
    setSavedStack(newStack);
    // clear stack ??
    setStack([]);
  };

  console.log({ savedStack });

  return (
    <>
      <ClickArea stack={stack} setStack={setStack} isEditing={isEditing} />

      <OutputBox stack={stack} selectedImage={selectedImage} />

      <Toolbar
        isEditing={isEditing}
        selectedImage={selectedImage}
        handleEditToggle={handleEditToggle}
        handleRemoveLastPoint={handleRemoveLastPoint}
        handleReset={handleReset}
        handleImageChange={handleImageChange}
        handleSaveShape={handleSaveShape}
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

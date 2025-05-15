import { useState } from "react";

import { OutputBox } from "./OutputBox";
import { ClickArea } from "./ClickArea";
import { Toolbar } from "./Toolbar";
import { Sidebar } from "./Sidebar";

import "./App.css";

import type { Coords } from "./Types";

function App() {
  const [stack, setStack] = useState<Coords[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // const [savedStack, setSavedStack] = useState<Shape[]>([]);

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

  // AHTODO!
  // This will enable the saving of multiple shapes within the shape().
  // const handleSaveShape = () => {
  //   // add stack to savedStack
  //   // setSavedStack((prevState) => {
  //   //   const updatedStack = [...prevState];
  //   //   updatedStack.push(stack);
  //   //   return updatedStack;
  //   // });
  //   // clear stack ??
  //   // setStack([]);
  // };

  return (
    <>
      <ClickArea stack={stack} setStack={setStack} isEditing={isEditing} />

      <OutputBox stack={stack} />

      <Toolbar
        isEditing={isEditing}
        handleEditToggle={handleEditToggle}
        handleRemoveLastPoint={handleRemoveLastPoint}
        handleReset={handleReset}
      />

      <Sidebar
        open={isEditing}
        handleClose={handleCloseSidebar}
        stack={stack}
        setStack={setStack}
      />
    </>
  );
}

export default App;

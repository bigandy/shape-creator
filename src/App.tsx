import { useState } from "react";

import { OutputBox } from "./OutputBox";
import { ClickArea } from "./ClickArea";
import { Toolbar } from "./Toolbar";

import "./App.css";

import type { Coords } from "./Types";

function App() {
  const [stack, setStack] = useState<Coords[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  // const [savedStack, setSavedStack] = useState<Shape[]>([]);

  const handleUndoLastMove = () => {
    setStack((stack) => {
      const newStack = [...stack];
      newStack.pop();
      return newStack;
    });
  };

  const handleEditToggle = () => {
    setIsEditing((editing) => !editing);
  };

  const handleReset = () => setStack([]);

  // AHTODO!
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
        handleUndoLastMove={handleUndoLastMove}
        handleReset={handleReset}
      />
    </>
  );
}

export default App;

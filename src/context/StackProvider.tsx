import {
  // useReducer,
  useState,
  type PropsWithChildren,
} from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

import { type StackContextValue, StackContext } from "./StackContext";

export function StackProvider({ children }: PropsWithChildren) {
  //   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

  const [stack, setStack] = useState<Coords[]>([]);
  const [savedStack, setSavedStack] = useState<Shape[]>([]);

  // AHTODO: move this up to parent?
  const clipPath = useClipPathStyle({
    currentStack: stack,
    savedStack,
    precision: 2,
  });

  const handleSaveShapeToStack = (coords: Coords[], shape: DrawingMode) => {
    setSavedStack((savedStack) => [...savedStack, { shape, coords }]);
    setStack([]);
  };

  return (
    <StackContext
      value={
        {
          stack,
          savedStack,
          setStack,
          setSavedStack,
          clipPath,
          handleSaveShapeToStack,
        } as StackContextValue
      }
    >
      {/* <StackDispatchContext value={dispatch}> */}
      {children}
      {/* </StackDispatchContext> */}
    </StackContext>
  );
}

import {
  createContext,
  useContext,
  // useReducer,
  useState,
  type Dispatch,
  type SetStateAction,
  type PropsWithChildren,
} from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

export const StackContext = createContext<StackContextValue | null>(null);
export const StackDispatchContext = createContext(null);

type StackContextValue = {
  clipPath: string;
  stack: Coords[];
  savedStack: Shape[];
  setStack: Dispatch<SetStateAction<Coords[]>>;
  setSavedStack: Dispatch<SetStateAction<Shape[]>>;
  handleSaveShapeToStack: (updatedState: Coords[], shape: DrawingMode) => void;
};

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

export const useStackContext = () => {
  const context = useContext(StackContext);

  if (!context) {
    throw new Error("useStackContext has to be used within <StackProvider>");
  }

  return context;
};

// function stackReducer(tasks, action) {
//   switch (action.type) {
//     case "added": {
//       return [
//         ...tasks,
//         {
//           id: action.id,
//           text: action.text,
//           done: false,
//         },
//       ];
//     }
//     case "changed": {
//       return tasks.map((t) => {
//         if (t.id === action.task.id) {
//           return action.task;
//         } else {
//           return t;
//         }
//       });
//     }
//     case "deleted": {
//       return tasks.filter((t) => t.id !== action.id);
//     }
//     default: {
//       throw Error("Unknown action: " + action.type);
//     }
//   }
// }

// const initialTasks = [
//   { id: 0, text: "Philosopher’s Path", done: true },
//   { id: 1, text: "Visit the temple", done: false },
//   { id: 2, text: "Drink matcha", done: false },
// ];

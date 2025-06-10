import {
  createContext,
  // useReducer,
  type Dispatch,
  type SetStateAction,
} from "react";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

export type StackContextValue = {
  clipPath: string;
  stack: Coords[];
  savedStack: Shape[];
  setStack: Dispatch<SetStateAction<Coords[]>>;
  setSavedStack: Dispatch<SetStateAction<Shape[]>>;
  handleSaveShapeToStack: (updatedState: Coords[], shape: DrawingMode) => void;
};

// From https://react.dev/learn/scaling-up-with-reducer-and-context
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
export const StackContext = createContext<StackContextValue | null>(null);
// export const StackDispatchContext = createContext(null);

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

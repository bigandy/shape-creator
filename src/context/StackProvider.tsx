import {
  useReducer,
  useState,
  type PropsWithChildren,
  type Dispatch,
  type SetStateAction,
} from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

import { StackContext, StackDispatchContext } from "./StackContext";

export type StackContextValue = {
  clipPath: string;
  stack: Coords[];
  savedStack: Shape[];
  setSavedStack: Dispatch<SetStateAction<Shape[]>>;
  handleSaveShapeToStack: (updatedState: Coords[], shape: DrawingMode) => void;
};

export type StackReducerAction =
  | { type: string; payload: { coords: Coords[]; index: number } } // Is this needed?
  | {
      type: "clear-stack";
    }
  | {
      type: "add";
      payload: {
        coords: Coords[];
      };
    }
  | {
      type: "update";
      payload: {
        coords: Coords[];
      };
    }
  | {
      type: "remove-final";
    }
  | {
      type: "remove-index";
      payload: {
        index: number;
      };
    };

function stackReducer(stack: Coords[], action: StackReducerAction): Coords[] {
  switch (action.type) {
    case "clear-stack": {
      return [];
    }
    case "add": {
      return [...stack, ...action.payload.coords];
    }
    case "update": {
      return action.payload.coords;
    }
    case "remove-final": {
      return stack.filter(
        (_, index, stackArray) => index !== stackArray.length - 1
      );
    }
    case "remove-index": {
      return stack.filter((_, index) => index !== action.payload.index);
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

const initialState: Coords[] = [];

export function StackProvider({ children }: PropsWithChildren) {
  const [stack, dispatch] = useReducer(stackReducer, initialState);

  // const [stack, setStack] = useState<Coords[]>([]);
  const [savedStack, setSavedStack] = useState<Shape[]>([]);

  const clipPath = useClipPathStyle({
    currentStack: stack,
    savedStack,
    precision: 2,
  });

  const handleSaveShapeToStack = (coords: Coords[], shape: DrawingMode) => {
    setSavedStack((savedStack) => [...savedStack, { shape, coords }]);
    dispatch({ type: "clear-stack" });
  };

  return (
    <StackContext
      value={
        {
          stack,
          savedStack,
          setSavedStack,
          clipPath,
          handleSaveShapeToStack,
        } as StackContextValue
      }
    >
      <StackDispatchContext value={dispatch}>{children}</StackDispatchContext>
    </StackContext>
  );
}

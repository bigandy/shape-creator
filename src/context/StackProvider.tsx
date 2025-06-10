import { useReducer, type PropsWithChildren } from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

import { StackContext, StackDispatchContext } from "./StackContext";

export type StackContextValue = {
  clipPath: string;
  stack: Coords[];
  savedStack: Shape[];
};

export type StackReducerAction =
  | {
      type: string;
      payload: { coords: Coords[]; index: number; shape: DrawingMode };
    } // Is this needed?
  | {
      type: "clear-current-stack";
    }
  | {
      type: "clear-all-stacks";
    }
  | {
      type: "add";
      payload: {
        coords: Coords[];
      };
    }
  | {
      type: "update-current-shape";
      payload: {
        coords: Coords[];
      };
    }
  | {
      type: "remove-final-point";
    }
  | {
      type: "remove-final-shape";
    }
  | {
      type: "remove-index";
      payload: {
        index: number;
      };
    }
  | {
      type: "save-shape";
      payload: {
        shape: DrawingMode;
        coords: Coords[];
      };
    }
  | {
      type: "delete-shape";
      payload: {
        index: number;
      };
    };

type ReducerState = {
  currentStack: Coords[];
  savedStack: Shape[];
};

function stackReducer(
  state: ReducerState,
  action: StackReducerAction
): ReducerState {
  switch (action.type) {
    case "clear-current-stack": {
      return { ...state, currentStack: [] };
    }
    case "clear-all-stacks": {
      return { currentStack: [], savedStack: [] };
    }
    case "add": {
      return {
        ...state,
        currentStack: [...state.currentStack, ...action.payload.coords],
      };
    }
    case "update-current-shape": {
      return {
        ...state,
        currentStack: action.payload.coords,
      };
    }
    case "remove-final-point": {
      return {
        ...state,
        currentStack: state.currentStack.filter(
          (_, index, stackArray) => index !== stackArray.length - 1
        ),
      };
    }
    case "remove-index": {
      return {
        ...state,
        currentStack: state.currentStack.filter(
          (_, index) => index !== action.payload.index
        ),
      };
    }
    case "save-shape": {
      return {
        savedStack: [
          ...state.savedStack,
          { shape: action.payload.shape, coords: action.payload.coords },
        ],
        currentStack: [],
      };
    }
    case "remove-final-shape": {
      return {
        ...state,
        savedStack: state.savedStack.filter(
          (_, index, stackArray) => index !== stackArray.length - 1
        ),
      };
    }
    case "delete-shape": {
      return {
        ...state,
        savedStack: state.savedStack.filter(
          (_, index) => index !== action.payload.index
        ),
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function StackProvider({ children }: PropsWithChildren) {
  const [{ savedStack, currentStack }, dispatch] = useReducer(stackReducer, {
    currentStack: [],
    savedStack: [],
  });

  const clipPath = useClipPathStyle({
    currentStack,
    savedStack,
    precision: 2,
  });

  return (
    <StackContext
      value={
        {
          stack: currentStack,
          savedStack,
          clipPath,
        } as StackContextValue
      }
    >
      <StackDispatchContext value={dispatch}>{children}</StackDispatchContext>
    </StackContext>
  );
}

import { useReducer, type PropsWithChildren } from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

import { StackContext, StackDispatchContext } from "./StackContext";

export type StackContextValue = {
  clipPath: string;
  stackLength: number;
  savedStack: Shape[];
  editingNumber: number;
};

export type StackReducerAction =
  | {
      type: string;
      payload: { coords: Coords[]; index: number; shape: DrawingMode };
    } // Is this needed?
  | {
      type: "clear-current-shape";
    }
  | {
      type: "clear-all-stacks";
    }
  | {
      type: "add-point";
      payload: {
        coords: Coords;
      };
    }
  | {
      type: "update-edit-index";
      payload: { index: number };
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
      type: "change-shape";
      payload: {
        shape: DrawingMode;
      };
    }
  | {
      type: "delete-shape";
      payload: {
        index: number;
      };
    };

type ReducerState = {
  savedStack: Shape[];
  editingNumber: number;
};

const initialState = {
  savedStack: [],
  editingNumber: 0,
};

function stackReducer(
  state: ReducerState,
  action: StackReducerAction
): ReducerState {
  switch (action.type) {
    case "clear-current-shape": {
      const updatedSavedStack = state.savedStack.map((stack, index) => {
        if (index === state.editingNumber) {
          return {
            ...stack,
            coords: [],
          };
        } else {
          return { ...stack };
        }
      });

      return { ...state, savedStack: [...updatedSavedStack] };
    }
    case "clear-all-stacks": {
      return initialState;
    }
    case "update-edit-index": {
      return {
        ...state,
        editingNumber: action.payload.index,
      };
    }
    case "add-point": {
      if (state.savedStack.length === 0 && state.editingNumber === 0) {
        return {
          ...state,
          savedStack: [
            { coords: [action.payload.coords as Coords], shape: "line" },
          ],
        };
      } else {
        const updatedSavedState = [
          ...state.savedStack.map((stack, stackIndex) => {
            if (stackIndex === state.editingNumber) {
              return {
                ...stack,
                coords: [...stack.coords, action.payload.coords as Coords],
              };
            }
            return stack;
          }),
        ];
        return {
          ...state,
          savedStack: updatedSavedState,
        };
      }
    }
    case "update-current-shape": {
      const updatedSavedStack = state.savedStack.map((stack, index) => {
        if (index === state.editingNumber) {
          return { ...stack, coords: action.payload.coords };
        } else {
          return stack;
        }
      });

      return {
        ...state,
        savedStack: [...updatedSavedStack],
      };
    }
    case "change-shape": {
      const updatedSavedStack = [
        ...state.savedStack,
        { shape: action.payload.shape, coords: [] },
      ];

      return {
        ...state,
        savedStack: [...updatedSavedStack],
        editingNumber: state.editingNumber + 1,
      };
    }
    case "remove-final-point": {
      const updatedSavedStack = state.savedStack.map((stack, index) => {
        if (index === state.editingNumber) {
          return {
            ...stack,
            coords: stack.coords.filter(
              (_, coordsIndex, stackArray) =>
                coordsIndex !== stackArray.length - 1
            ),
          };
        } else {
          return stack;
        }
      });

      return {
        ...state,
        savedStack: [...updatedSavedStack],
      };
    }
    case "remove-index": {
      const updatedSavedStack = state.savedStack.map((stack, index) => {
        if (index === state.editingNumber) {
          return {
            ...stack,
            coords: stack.coords.filter(
              (_, coordsIndex) => coordsIndex !== action.payload.index
            ),
          };
        } else {
          return stack;
        }
      });

      return {
        ...state,
        savedStack: [...updatedSavedStack],
      };
    }
    case "save-shape": {
      const updatedStack = {
        shape: action.payload.shape,
        coords: action.payload.shape === "line" ? [] : action.payload.coords,
      };
      return {
        ...state,
        savedStack: [...state.savedStack, updatedStack],
        editingNumber: state.editingNumber + 1,
      };
    }
    case "remove-final-shape": {
      const updatedSavedStack = state.savedStack.filter(
        (_, index, stackArray) => index !== stackArray.length - 1
      );

      return {
        ...state,
        savedStack: [...updatedSavedStack],
        editingNumber: state.editingNumber > 1 ? state.editingNumber - 1 : 0,
      };
    }
    case "delete-shape": {
      return {
        ...state,
        savedStack: state.savedStack.filter(
          (_, index) => index !== action.payload.index
        ),
        editingNumber: state.editingNumber > 1 ? state.editingNumber - 1 : 0,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function StackProvider({ children }: PropsWithChildren) {
  const [{ savedStack, editingNumber }, dispatch] = useReducer(
    stackReducer,
    initialState
  );

  const stackLength = savedStack[editingNumber]?.coords.length || 0;

  const clipPath = useClipPathStyle({
    savedStack,
    precision: 2,
  });

  return (
    <StackContext
      value={
        {
          savedStack,
          stackLength,
          clipPath,
          editingNumber,
        } as StackContextValue
      }
    >
      <StackDispatchContext value={dispatch}>{children}</StackDispatchContext>
    </StackContext>
  );
}

import { useReducer, type PropsWithChildren } from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

import { StackContext, StackDispatchContext } from "./StackContext";

export type StackContextValue = {
  clipPath: string;
  stackLength: number;
  savedStack: Shape[];
  editingNumber: number | undefined;
  drawingMode: DrawingMode;
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
      type: "delete-final-point";
    }
  | {
      type: "delete-current-shape";
    }
  | {
      type: "delete-index";
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
  drawingMode: DrawingMode;
};

const initialState = {
  savedStack: [],
  editingNumber: 0,
  drawingMode: "rectangle" as DrawingMode,
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
        editingNumber:
          state.editingNumber === action.payload.index
            ? undefined
            : action.payload.index,
        // drawingMode: state.savedStack[action.payload.index].shape,
      };
    }
    case "add-point": {
      if (state.savedStack.length === 0 && state.editingNumber === 0) {
        return {
          ...state,
          savedStack: [
            {
              coords: [action.payload.coords as Coords],
              shape: "line",
            },
          ],
        };
      } else {
        const updatedSavedState = state.savedStack.map((stack, stackIndex) => {
          if (stackIndex === state.editingNumber) {
            return {
              ...stack,
              coords: [...stack.coords, action.payload.coords as Coords],
            };
          }
          return stack;
        });
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
      let updatedSavedStack = [];
      const editingNumber =
        action.payload.shape === "line" ? state.savedStack.length : undefined;
      // Check to see if current last shape has coords
      if (state.savedStack[state.savedStack.length - 1]?.coords.length === 0) {
        updatedSavedStack = [...state.savedStack];
        updatedSavedStack[updatedSavedStack.length - 1].shape =
          action.payload.shape;
        // editingNumber += 1;
      } else {
        updatedSavedStack = [
          ...state.savedStack,
          { shape: action.payload.shape, coords: [] },
        ];
        // editingNumber += 1;
      }

      return {
        ...state,
        savedStack: [...updatedSavedStack],
        editingNumber,
        drawingMode: action.payload.shape,
      };
    }
    case "delete-final-point": {
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
    case "delete-index": {
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
      const updatedStack = [...state.savedStack];
      let editingNumber = state.editingNumber;
      if (state.savedStack[updatedStack.length - 1]?.coords.length === 0) {
        updatedStack[updatedStack.length - 1] = {
          shape: action.payload.shape,
          coords: action.payload.coords,
        };
        // editingNumber = undefined;
      } else {
        updatedStack.push({
          shape: action.payload.shape,
          coords: action.payload.shape === "line" ? [] : action.payload.coords,
        });
        // editingNumber += 1;
      }

      return {
        ...state,
        savedStack: [...updatedStack],
        editingNumber: undefined,
      };
    }
    case "delete-current-shape": {
      const updatedSavedStack = state.savedStack.filter(
        (_, index) => index !== state.editingNumber
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
  const [{ savedStack, editingNumber, drawingMode }, dispatch] = useReducer(
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
          activeStack: savedStack[editingNumber],
          drawingMode,
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

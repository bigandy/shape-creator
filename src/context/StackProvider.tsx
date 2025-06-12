import { useReducer, type PropsWithChildren } from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

import { StackContext, StackDispatchContext } from "./StackContext";

export type StackContextValue = {
  clipPath: string;
  stackLength: number;
  savedStack: Shape[];
  savedStackLength: number;
  editingNumber: number | undefined;
  isActiveStackBeingMoved: boolean;
  drawingMode: DrawingMode;
  movingNumber: number | undefined;
  activeStack: Shape;
  moveAllShapes: boolean;
};

export type StackReducerAction =
  | {
      type: string;
      payload: {
        coords: Coords[];
        index: number;
        shape: DrawingMode;
        savedStack: Shape[];
      };
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
      type: "update-move-index";
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
      type: "move-all-shapes";
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
    }
  | {
      type: "update-stack-order";
      payload: {
        savedStack: Shape[];
      };
    }
  | {
      type: "update-all-shapes";
      payload: {
        savedStack: Shape[];
      };
    };

type ReducerState = {
  savedStack: Shape[];
  editingNumber: number | undefined;
  movingNumber: number | undefined;
  drawingMode: DrawingMode;
  moveAllShapes: boolean;
};

const initialState = {
  savedStack: [],
  editingNumber: 0,
  movingNumber: undefined,
  drawingMode: "rectangle" as DrawingMode,
  moveAllShapes: false,
};

function stackReducer(
  state: ReducerState,
  action: StackReducerAction
): ReducerState {
  const uuid = self.crypto.randomUUID();

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
        drawingMode: state.savedStack[action.payload.index].shape,
        movingNumber: undefined,
      };
    }
    case "update-move-index": {
      return {
        ...state,
        movingNumber:
          state.movingNumber === action.payload.index
            ? undefined
            : action.payload.index,
        editingNumber:
          state.movingNumber === action.payload.index
            ? undefined
            : action.payload.index,
        drawingMode: state.savedStack[action.payload.index].shape,
      };
    }
    case "add-point": {
      if (
        state.savedStack.length === 0 &&
        (state.editingNumber === undefined || state.editingNumber === 0)
      ) {
        return {
          ...state,
          savedStack: [
            {
              coords: [action.payload.coords as Coords],
              shape: "line",
              id: uuid,
            },
          ],
          editingNumber: 0,
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
          editingNumber: updatedSavedState.length - 1,
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
      } else {
        updatedSavedStack = [
          ...state.savedStack,
          { shape: action.payload.shape, coords: [], id: uuid },
        ];
      }

      return {
        ...state,
        savedStack: [...updatedSavedStack],
        editingNumber,
        drawingMode: action.payload.shape,
        movingNumber: undefined,
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
      if (state.savedStack[updatedStack.length - 1]?.coords.length === 0) {
        updatedStack[updatedStack.length - 1] = {
          shape: action.payload.shape,
          coords: action.payload.coords,
          id: uuid,
        };
      } else {
        updatedStack.push({
          shape: action.payload.shape,
          coords: action.payload.shape === "line" ? [] : action.payload.coords,
          id: uuid,
        });
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
        editingNumber: undefined,
      };
    }
    case "delete-shape": {
      return {
        ...state,
        savedStack: state.savedStack.filter(
          (_, index) => index !== action.payload.index
        ),
        editingNumber: undefined,
      };
    }
    case "update-stack-order": {
      return {
        ...state,
        savedStack: action.payload.savedStack,
        editingNumber: undefined,
      };
    }
    case "move-all-shapes": {
      return {
        ...state,
        moveAllShapes: !state.moveAllShapes,
      };
    }
    case "update-all-shapes": {
      console.log(action.payload.savedStack);
      return {
        ...state,
        savedStack: action.payload.savedStack,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function StackProvider({ children }: PropsWithChildren) {
  const [
    { savedStack, editingNumber, drawingMode, movingNumber, moveAllShapes },
    dispatch,
  ] = useReducer(stackReducer, initialState);

  const stackLength =
    (editingNumber && savedStack[editingNumber]?.coords.length) || 0;

  const clipPath = useClipPathStyle({
    savedStack,
    precision: 2,
  });

  // @ts-expect-error sort it out
  const activeStack = savedStack[editingNumber] ?? [];
  // @ts-expect-error sort it out
  const isActiveStackBeingMoved = savedStack[movingNumber]?.coords.length > 0;

  const savedStackLength = savedStack.length;

  return (
    <StackContext
      value={
        {
          activeStack,
          drawingMode,
          savedStack,
          stackLength,
          clipPath,
          editingNumber,
          isActiveStackBeingMoved,
          movingNumber,
          savedStackLength,
          moveAllShapes,
        } as StackContextValue
      }
    >
      <StackDispatchContext value={dispatch}>{children}</StackDispatchContext>
    </StackContext>
  );
}

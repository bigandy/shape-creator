import { useReducer, type PropsWithChildren } from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type Coords, type DrawingMode, type Shape } from "@/Types";

import { StackContext, StackDispatchContext } from "./StackContext";

export type StackContextValue = {
  clipPath: string;
  stackLength: number;
  savedStack: Array<Shape>;
  savedStackLength: number;
  editingNumber: number | undefined;
  isActiveStackBeingEdited: boolean;
  drawingMode: DrawingMode;
  activeStack: Shape;
  moveAllShapes: boolean;
  snapTo: boolean;
  xPoints: Array<number>;
  yPoints: Array<number>;
  activePoint?: number;
};

export type StackReducerAction =
  | {
      type: string;
      payload: {
        coords: Array<Coords>;
        index: number;
        shape: DrawingMode;
        savedStack: Array<Shape>;
        pointCoord: Coords;
      };
    } // Is this needed?
  | {
      type: "clear-current-shape";
    }
  | {
      type: "delete-all-shapes";
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
        coords: Array<Coords>;
      };
    }
  | {
      type: "update-current-point";
      payload: {
        index: number;
        pointCoord: Coords;
      };
    }
  | {
      type: "delete-final-point";
    }
  | {
      type: "move-all-shapes";
    }
  | {
      type: "delete-last-shape";
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
        coords: Array<Coords>;
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
      type: "duplicate-shape";
      payload: {
        index: number;
      };
    }
  | {
      type: "update-all-shapes";
      payload: {
        savedStack: Array<Shape>;
      };
    }
  | {
      type: "toggle-snap-to";
    };

type ReducerState = {
  savedStack: Array<Shape>;
  editingNumber: number | undefined;
  drawingMode: DrawingMode;
  moveAllShapes: boolean;
  snapTo: boolean;
  activePoint?: number;
};

// const initialState = {
//   savedStack: [],
//   editingNumber: 0,
//   drawingMode: "circle" as DrawingMode,
//   moveAllShapes: false,
//   snapTo: false,
// };

const initialState = {
  savedStack: [
    {
      shape: "line",
      coords: [
        {
          percentX: 23.535283181327088,
          percentY: 15.689457548851315,
        },
        {
          percentX: 39.119442357367326,
          percentY: 15.970253209680868,
        },
        {
          percentX: 40.52342066151509,
          percentY: 26.078896999544803,
        },
        {
          percentX: 23.535283181327088,
          percentY: 29.729240590329002,
        },
      ],
      id: "2c966664-da55-450f-bdf6-9a57e5a37767",
    },
  ],
  editingNumber: 0,
  drawingMode: "line",
  moveAllShapes: false,
  snapTo: true,
  activePoint: 0,
};

function stackReducer(
  state: ReducerState,
  action: StackReducerAction,
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
    case "delete-all-shapes": {
      return {
        ...initialState,
        drawingMode: state.drawingMode,
      };
    }
    case "update-edit-index": {
      return {
        ...state,
        editingNumber:
          state.editingNumber === action.payload.index
            ? undefined
            : action.payload.index,
        drawingMode: state.savedStack[action.payload.index].shape,
        moveAllShapes: false,
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
    case "update-current-point": {
      const updatedSavedStack = state.savedStack.map((stack, index) => {
        if (index === state.editingNumber) {
          const coords = [...stack.coords];
          coords[action.payload.index] = action.payload.pointCoord;

          // AHTODO: handle snapping here

          return {
            ...stack,
            coords: coords,
          };
        } else {
          return stack;
        }
      });

      return {
        ...state,
        savedStack: [...updatedSavedStack],
        activePoint: action.payload.index,
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
        moveAllShapes: false,
      };
    }
    case "delete-final-point": {
      const updatedSavedStack = state.savedStack.map((stack, index) => {
        if (index === state.editingNumber) {
          return {
            ...stack,
            coords: stack.coords.filter(
              (_, coordsIndex, stackArray) =>
                coordsIndex !== stackArray.length - 1,
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
              (_, coordsIndex) => coordsIndex !== action.payload.index,
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
        editingNumber:
          action.payload.shape === "line" ? updatedStack.length - 1 : undefined,
        moveAllShapes: false,
      };
    }
    case "delete-last-shape": {
      const updatedSavedStack = state.savedStack.filter(
        (_, index, stackArray) => index !== stackArray.length - 1,
      );

      return {
        ...state,
        savedStack: [...updatedSavedStack],
        editingNumber: undefined,
        moveAllShapes: false,
      };
    }
    case "delete-shape": {
      return {
        ...state,
        savedStack: state.savedStack.filter(
          (_, index) => index !== action.payload.index,
        ),
        editingNumber: undefined,
        moveAllShapes: false,
      };
    }
    case "duplicate-shape": {
      const positionToInsertAt = action.payload.index + 1;

      const updatedStack = [
        ...state.savedStack.slice(0, positionToInsertAt),
        state.savedStack[action.payload.index],
        ...state.savedStack.slice(positionToInsertAt),
      ];

      return {
        ...state,
        savedStack: updatedStack,
        editingNumber: positionToInsertAt,
        moveAllShapes: false,
      };
    }
    case "move-all-shapes": {
      return {
        ...state,
        moveAllShapes: !state.moveAllShapes,
        editingNumber: undefined,
        snapTo: false,
      };
    }
    case "update-all-shapes": {
      return {
        ...state,
        savedStack: action.payload.savedStack,
      };
    }
    case "toggle-snap-to": {
      return {
        ...state,
        snapTo: !state.snapTo,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}

export function StackProvider({ children }: PropsWithChildren) {
  const [
    {
      savedStack,
      editingNumber,
      drawingMode,
      moveAllShapes,
      snapTo,
      activePoint,
    },
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
  const isActiveStackBeingEdited = savedStack[editingNumber]?.coords.length > 0;
  const savedStackLength = savedStack[editingNumber ?? 0]?.coords.length;

  let xPoints: number[] = [];
  let yPoints: number[] = [];

  if (snapTo) {
    // Get All Points vertical and horizontal
    const allCoords = savedStack
      .filter((stack, stackIndex) => {
        if (stack.shape === "line" && editingNumber === 0) {
          return true;
        }
        return stackIndex !== editingNumber;
      })
      .flatMap((stack) => {
        return stack.coords;
      });

    const uniqueXPoints = [
      ...new Set(allCoords?.map(({ percentX }) => percentX)),
    ].filter((_, index) => index !== activePoint);
    const uniqueYPoints = [
      ...new Set(allCoords?.map(({ percentY }) => percentY)),
    ].filter((_, index) => index !== activePoint);

    yPoints = uniqueYPoints.length > 0 ? [0, ...uniqueYPoints, 99.9] : [];
    xPoints = uniqueXPoints.length > 0 ? [0, ...uniqueXPoints, 99.9] : [];
  }

  return (
    <StackContext
      value={
        {
          snapTo,
          activeStack,
          drawingMode,
          savedStack,
          stackLength,
          clipPath,
          editingNumber,
          isActiveStackBeingEdited,
          savedStackLength,
          moveAllShapes,
          xPoints,
          yPoints,
          activePoint,
        } as StackContextValue
      }
    >
      <StackDispatchContext value={dispatch}>{children}</StackDispatchContext>
    </StackContext>
  );
}

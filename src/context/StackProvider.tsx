import { useReducer, type PropsWithChildren } from "react";

import { useClipPathStyle } from "@hooks/useClipPathStyle";

import { type DrawingMode, type Coords, type Shape } from "@/Types";

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
};

export type StackReducerAction =
  | {
      type: string;
      payload: {
        coords: Array<Coords>;
        index: number;
        shape: DrawingMode;
        savedStack: Array<Shape>;
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
      type: "update-current-shape";
      payload: {
        coords: Array<Coords>;
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
};

const tempInitialStateForTestingSnapTo: Array<Shape> = [
  {
    shape: "rectangle",
    coords: [
      {
        percentX: 51.517680983457254,
        percentY: 18.03005008347246,
      },
      {
        percentX: 51.517680983457254,
        percentY: 44.01274852026104,
      },
      {
        percentX: 76.16482015480345,
        percentY: 44.01274852026104,
      },
      {
        percentX: 76.16482015480345,
        percentY: 18.03005008347246,
      },
    ],
    id: "28fbd87d-4597-4d48-acc6-8cff4033bcdb",
  },
  {
    shape: "rectangle",
    coords: [
      {
        percentX: 9.568978600698133,
        percentY: 8.802549704052208,
      },
      {
        percentX: 9.568978600698133,
        percentY: 31.264228259219912,
      },
      {
        percentX: 32.880558506601915,
        percentY: 31.264228259219912,
      },
      {
        percentX: 32.880558506601915,
        percentY: 8.802549704052208,
      },
    ],
    id: "2d400555-da54-4659-bf14-cb7864d656a4",
  },
  {
    shape: "rectangle",
    coords: [
      {
        percentX: 19.042713605350773,
        percentY: 53.02996372105523,
      },
      {
        percentX: 19.042713605350773,
        percentY: 80.93041310222301,
      },
      {
        percentX: 47.51645989161105,
        percentY: 80.93041310222301,
      },
      {
        percentX: 47.51645989161105,
        percentY: 53.02996372105523,
      },
    ],
    id: "7a35b4d8-240b-42ac-88e0-ad13b8a74b2e",
  },
  {
    shape: "rectangle",
    coords: [
      {
        percentX: 60.12899180364582,
        percentY: 64.68700079126917,
      },
      {
        percentX: 60.12899180364582,
        percentY: 92.77854914080112,
      },
      {
        percentX: 88.0294411848136,
        percentY: 92.77854914080112,
      },
      {
        percentX: 88.0294411848136,
        percentY: 64.68700079126917,
      },
    ],
    id: "b6b5000b-47f0-427d-92fc-83103416ecf9",
  },
  {
    shape: "rectangle",
    coords: [
      {
        percentX: 58.409101088368345,
        percentY: 48.44358848031531,
      },
      {
        percentX: 58.409101088368345,
        percentY: 57.42523999343098,
      },
      {
        percentX: 87.45614427972112,
        percentY: 57.42523999343098,
      },
      {
        percentX: 87.45614427972112,
        percentY: 48.44358848031531,
      },
    ],
    id: "f804ae66-37e8-4c10-bb7f-75b2c08e8512",
  },
  {
    shape: "rectangle",
    coords: [
      {
        percentX: 81.14987832370375,
        percentY: 6.40181544019946,
      },
      {
        percentX: 81.14987832370375,
        percentY: 28.569295770442366,
      },
      {
        percentX: 96.62889476120094,
        percentY: 28.569295770442366,
      },
      {
        percentX: 96.62889476120094,
        percentY: 6.40181544019946,
      },
    ],
    id: "2ece1df5-4468-42a2-abe7-a6b9330609da",
  },
];

const initialState = {
  savedStack: tempInitialStateForTestingSnapTo,
  editingNumber: 0,
  drawingMode: "rectangle" as DrawingMode,
  moveAllShapes: false,
  snapTo: true,
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
      // AHTODO: when finished the snapTo, can move back to just initialState
      return { ...initialState, savedStack: [] };
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
        moveAllShapes: false,
      };
    }
    case "delete-last-shape": {
      const updatedSavedStack = state.savedStack.filter(
        (_, index, stackArray) => index !== stackArray.length - 1
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
          (_, index) => index !== action.payload.index
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
    { savedStack, editingNumber, drawingMode, moveAllShapes, snapTo },
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

  const savedStackLength = savedStack.length;

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

  const yPoints = [...new Set(allCoords.map(({ percentY }) => percentY))];
  const xPoints = [...new Set(allCoords.map(({ percentX }) => percentX))];

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
        } as StackContextValue
      }
    >
      <StackDispatchContext value={dispatch}>{children}</StackDispatchContext>
    </StackContext>
  );
}

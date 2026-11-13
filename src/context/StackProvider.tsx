import { useClipPathStyle } from "@hooks/useClipPathStyle";
import { type PropsWithChildren, useReducer } from "react";

import type { Coords, DrawingMode, Shape } from "@/Types";

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

export const ALLOWED_REDUCER_TYPES = {
	clearCurrentShape: "clear-current-shape",
	deleteAllShapes: "delete-all-shapes",
	addPoint: "add-point",
	updateEditIndex: "update-edit-index",
	updateCurrentShape: "update-current-shape",
	updateCurrentPoint: "update-current-point",
	deleteFinalPoint: "delete-final-point",
	moveAllShapes: "move-all-shapes",
	deleteLastShape: "delete-last-shape",
	deleteIndex: "delete-index",
	saveShape: "save-shape",
	changeShape: "change-shape",
	deleteShape: "delete-shape",
	duplicateShape: "duplicate-shape",
	updateAllShapes: "update-all-shapes",
	toggleSnapTo: "toggle-snap-to",
} as const

type AllowedReducerTypes = keyof typeof ALLOWED_REDUCER_TYPES

export type StackReducerAction =
	| {
		type: AllowedReducerTypes;
		payload: {
			coords: Array<Coords>;
			index: number;
			shape: DrawingMode;
			savedStack: Array<Shape>;
			pointCoord: Coords;
		};
	} // Is this needed?
	| {
		type: typeof ALLOWED_REDUCER_TYPES.clearCurrentShape;
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.deleteAllShapes;
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.addPoint;
		payload: {
			coords: Coords;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.updateEditIndex;
		payload: { index: number };
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.updateCurrentShape;
		payload: {
			coords: Array<Coords>;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.updateCurrentPoint;
		payload: {
			index: number;
			pointCoord: Coords;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.deleteFinalPoint;
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.moveAllShapes;
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.deleteLastShape;
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.deleteIndex;
		payload: {
			index: number;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.saveShape;
		payload: {
			shape: DrawingMode;
			coords: Array<Coords>;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.changeShape;
		payload: {
			shape: DrawingMode;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.deleteShape;
		payload: {
			index: number;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.duplicateShape;
		payload: {
			index: number;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.updateAllShapes;
		payload: {
			savedStack: Array<Shape>;
		};
	}
	| {
		type: typeof ALLOWED_REDUCER_TYPES.toggleSnapTo;
	};

type ReducerState = {
	savedStack: Array<Shape>;
	editingNumber: number | undefined;
	drawingMode: DrawingMode;
	moveAllShapes: boolean;
	snapTo: boolean;
};

const initialState = {
	savedStack: [],
	editingNumber: 0,
	drawingMode: "line" as DrawingMode,
	moveAllShapes: false,
	snapTo: false,
};

// const initialState = {
//   savedStack: [
//     {
//       shape: "line",
//       coords: [
//         {
//           percentX: 23.535283181327088,
//           percentY: 15.689457548851315,
//         },
//         {
//           percentX: 39.119442357367326,
//           percentY: 15.970253209680868,
//         },
//         {
//           percentX: 40.52342066151509,
//           percentY: 26.078896999544803,
//         },
//         {
//           percentX: 23.535283181327088,
//           percentY: 29.729240590329002,
//         },
//       ],
//       id: "2c966664-da55-450f-bdf6-9a57e5a37767",
//     },
//   ],
//   editingNumber: 0,
//   drawingMode: "line",
//   moveAllShapes: false,
//   snapTo: true,
// };

function stackReducer(
	state: ReducerState,
	action: StackReducerAction,
): ReducerState {
	const uuid = self.crypto.randomUUID();

	switch (action.type) {
		case ALLOWED_REDUCER_TYPES.clearCurrentShape: {
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
		case ALLOWED_REDUCER_TYPES.deleteAllShapes: {
			return {
				...initialState,
				drawingMode: state.drawingMode,
			};
		}
		case ALLOWED_REDUCER_TYPES.updateEditIndex: {
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
		case ALLOWED_REDUCER_TYPES.addPoint: {
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
		case ALLOWED_REDUCER_TYPES.updateCurrentShape: {
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
		case ALLOWED_REDUCER_TYPES.updateCurrentPoint: {
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
			};
		}
		case ALLOWED_REDUCER_TYPES.changeShape: {
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
		case ALLOWED_REDUCER_TYPES.deleteFinalPoint: {
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

		case ALLOWED_REDUCER_TYPES.deleteIndex: {
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
		case ALLOWED_REDUCER_TYPES.saveShape: {
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
		case ALLOWED_REDUCER_TYPES.deleteLastShape: {
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
		case ALLOWED_REDUCER_TYPES.deleteShape: {
			return {
				...state,
				savedStack: state.savedStack.filter(
					(_, index) => index !== action.payload.index,
				),
				editingNumber: undefined,
				moveAllShapes: false,
			};
		}
		case ALLOWED_REDUCER_TYPES.duplicateShape: {
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
		case ALLOWED_REDUCER_TYPES.moveAllShapes: {
			return {
				...state,
				moveAllShapes: !state.moveAllShapes,
				editingNumber: undefined,
				snapTo: false,
			};
		}
		case ALLOWED_REDUCER_TYPES.updateAllShapes: {
			return {
				...state,
				savedStack: action.payload.savedStack,
			};
		}
		case ALLOWED_REDUCER_TYPES.toggleSnapTo: {
			return {
				...state,
				snapTo: !state.snapTo,
			};
		}
		default: {
			throw Error(`Unknown action: ${action.type}`);
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

		const uniqueXPoints = allCoords?.map(({ percentX }) => percentX) ?? [];
		const uniqueYPoints = allCoords?.map(({ percentY }) => percentY) ?? [];

		yPoints = allCoords.length > 0 ? [0, ...uniqueYPoints, 99.9] : [];
		xPoints = allCoords.length > 0 ? [0, ...uniqueXPoints, 99.9] : [];
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
				} as StackContextValue
			}
		>
			<StackDispatchContext value={dispatch}>{children}</StackDispatchContext>
		</StackContext>
	);
}

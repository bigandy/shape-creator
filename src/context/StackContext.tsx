import { createContext } from "react";

import type { StackContextValue, StackReducerAction } from "./StackProvider";

export type StackDispatchValue = (query: StackReducerAction) => void;

// From https://react.dev/learn/scaling-up-with-reducer-and-context
// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context/
export const StackContext = createContext<StackContextValue | null>(null);
export const StackDispatchContext = createContext<StackDispatchValue | null>(
	null,
);

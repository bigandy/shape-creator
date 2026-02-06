import { StackContext } from "@context/StackContext";
import { use } from "react";

export const useStackContext = () => {
	const context = use(StackContext);

	if (!context) {
		throw new Error("useStackContext has to be used within <StackProvider>");
	}

	return context;
};

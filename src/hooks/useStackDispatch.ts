import { StackDispatchContext } from "@context/StackContext";
import { useContext } from "react";

export const useStackDispatch = () => {
	const dispatch = useContext(StackDispatchContext);

	if (!dispatch) {
		throw new Error("useStackDispatch has to be used within <StackProvider>");
	}

	return dispatch;
};

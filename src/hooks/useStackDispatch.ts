import { useContext } from "react";

import { StackDispatchContext } from "@context/StackContext";

export const useStackDispatch = () => {
  const dispatch = useContext(StackDispatchContext);

  if (!dispatch) {
    throw new Error("useStackDispatch has to be used within <StackProvider>");
  }

  return dispatch;
};

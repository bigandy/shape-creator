import { useContext } from "react";

import { StackContext } from "@context/StackContext";

export const useStackContext = () => {
  const context = useContext(StackContext);

  if (!context) {
    throw new Error("useStackContext has to be used within <StackProvider>");
  }

  return context;
};

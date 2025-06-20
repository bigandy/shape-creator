import { use } from "react";

import { StackContext } from "@context/StackContext";

export const useStackContext = () => {
  const context = use(StackContext);

  if (!context) {
    throw new Error("useStackContext has to be used within <StackProvider>");
  }

  return context;
};

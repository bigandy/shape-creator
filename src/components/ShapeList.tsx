import { useStackContext } from "@hooks/useStackContext";

import { ShapeListItem } from "@components/ShapeListItem";

export const ShapeList = () => {
  const { savedStack } = useStackContext();

  if (savedStack.length === 0) {
    return <p>No Shapes Added, Save One?</p>;
  }

  return (
    <ol>
      {savedStack.map((stack, stackIndex) => {
        return (
          <ShapeListItem
            key={stackIndex}
            stackIndex={stackIndex}
            stack={stack}
          />
        );
      })}
    </ol>
  );
};

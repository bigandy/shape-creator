// import React, {useState} from 'react';
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragMoveEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useStackContext } from "@hooks/useStackContext";

import { useStackDispatch } from "@/hooks/useStackDispatch";
import { SortableListItem } from "@components/SortableListItem";

export const SortableShapeList = () => {
  const { savedStack } = useStackContext();

  const dispatch = useStackDispatch();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragMoveEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = savedStack.findIndex((stack) => stack.id === active.id);
      const newIndex = savedStack.findIndex((stack) => stack.id === over?.id);

      const out = arrayMove(savedStack, oldIndex, newIndex);

      console.log({ out });

      dispatch({
        type: "update-stack-order",
        payload: {
          savedStack: out,
        },
      });
    }
  };

  if (savedStack.length === 0) {
    return <p>No Shapes Added, Save One?</p>;
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={savedStack}
        strategy={verticalListSortingStrategy}
      >
        {savedStack.map((stack) => (
          <SortableListItem key={stack.id} id={stack.id}>
            {stack.shape}
          </SortableListItem>
        ))}
        {/* {savedStack.map((stack, stackIndex) => {
          return (
            <SortableListItem id={stackIndex} key={stackIndex}>
              <ShapeListItem stackIndex={stackIndex} stack={stack} noEditMode />
            </SortableListItem>
          );
        })} */}
      </SortableContext>
    </DndContext>
  );
};

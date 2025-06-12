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
import { ShapeListItem } from "./ShapeListItem";

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

      const updatedSavedStack = arrayMove(savedStack, oldIndex, newIndex);

      dispatch({
        type: "update-stack-order",
        payload: {
          savedStack: updatedSavedStack,
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
        <ol>
          {savedStack.map((stack, stackIndex) => (
            <SortableListItem key={stack.id} id={stack.id}>
              <ShapeListItem
                stack={stack}
                stackIndex={stackIndex}
                preventEditMode
              />
            </SortableListItem>
          ))}
        </ol>
      </SortableContext>
    </DndContext>
  );
};

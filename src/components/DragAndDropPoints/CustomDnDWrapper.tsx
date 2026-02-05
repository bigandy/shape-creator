import { type PropsWithChildren } from "react";

import {
	DndContext,
	KeyboardSensor,
	MouseSensor,
	TouchSensor,
	useSensor,
	useSensors,
	type DragMoveEvent,
} from "@dnd-kit/core";

import { customCoordinatesGetter } from "./customCoordinatesGetter";

interface Props extends PropsWithChildren {
	onDragMove: (event: DragMoveEvent) => void;
}

export const CustomDnDWrapper = ({ onDragMove, children }: Props) => {
	const mouseSensor = useSensor(MouseSensor);
	const touchSensor = useSensor(TouchSensor);
	const keyboardSensor = useSensor(KeyboardSensor, {
		coordinateGetter: customCoordinatesGetter,
	});

	const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

	return (
		<DndContext onDragMove={onDragMove} sensors={sensors}>
			{children}
		</DndContext>
	);
};

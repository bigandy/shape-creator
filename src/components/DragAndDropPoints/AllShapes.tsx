import { Draggable } from "@components/Draggable";

import type { DragMoveEvent } from "@dnd-kit/core";
import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";
import { getDragDropCoords } from "@utils/coordinates";
import type { RefObject } from "react";
import type { Shape } from "@/Types";

import { CustomDnDWrapper } from "./CustomDnDWrapper";

type Props = {
	clickAreaRef: RefObject<HTMLDivElement | null>;
};

const getCenterPointAllShapes = (savedStack: Shape[]) => {
	const coords = [
		savedStack
			.filter((stack) => stack.coords.length)
			.flatMap((stack) => stack.coords),
	];

	const coordsX = coords[0].map((coord) => coord.percentX);
	const coordsY = coords[0].map((coord) => coord.percentY);

	const minX = Math.min(...coordsX);
	const minY = Math.min(...coordsY);
	const maxX = Math.max(...coordsX);
	const maxY = Math.max(...coordsY);

	return {
		percentX: (minX + maxX) / 2,
		percentY: (minY + maxY) / 2,
	};
};

export const DragAndDropPointsAllShapes = ({ clickAreaRef }: Props) => {
	const { savedStack } = useStackContext();

	const dispatch = useStackDispatch();

	const middlePoint = getCenterPointAllShapes(savedStack);

	const handleAllMove = (event: DragMoveEvent) => {
		const oldCoords = getCenterPointAllShapes(savedStack);
		const newCoords = getDragDropCoords(event, clickAreaRef)!;

		const updatedShapes = savedStack.map((stack) => {
			const coords = stack.coords.map((coord) => {
				return {
					percentX: coord.percentX + newCoords.percentX - oldCoords.percentX,
					percentY: coord.percentY + newCoords.percentY - oldCoords.percentY,
				};
			});

			return {
				...stack,
				coords,
			};
		});

		dispatch({
			type: "update-all-shapes",
			payload: { savedStack: updatedShapes },
		});
	};

	if (savedStack.length === 0) {
		return null;
	}

	return (
		<CustomDnDWrapper onDragMove={handleAllMove}>
			<Draggable
				index={1}
				top={middlePoint.percentY}
				left={middlePoint.percentX}
				isCenter
			>
				<div className="cursor-move">C</div>
			</Draggable>
		</CustomDnDWrapper>
	);
};

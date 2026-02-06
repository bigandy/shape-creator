import { DragAndDropPointsAllShapes } from "@components/DragAndDropPoints/AllShapes";
import { DragAndDropPointsSingleShape } from "@components/DragAndDropPoints/SingleShape";
import { useStackContext } from "@hooks/useStackContext";
import type { RefObject } from "react";
import type { DrawingMode } from "@/Types";

type Props = {
	clickAreaRef: RefObject<HTMLDivElement | null>;
	drawingMode: DrawingMode;
};

export const DragAndDropPoints = ({ clickAreaRef, drawingMode }: Props) => {
	const { moveAllShapes } = useStackContext();

	if (moveAllShapes) {
		return <DragAndDropPointsAllShapes clickAreaRef={clickAreaRef} />;
	} else {
		return (
			<DragAndDropPointsSingleShape
				clickAreaRef={clickAreaRef}
				drawingMode={drawingMode}
			/>
		);
	}
};

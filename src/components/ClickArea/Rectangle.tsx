import { ClickAreaWrapper } from "@components/ClickArea/index";
import { MousePosition } from "@components/ClickArea/MousePosition";
import { Point } from "@components/ClickArea/Point";
import { DragAndDropPoints } from "@components/DragAndDropPoints/index";
import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";
import { getCoords, getCoordsWithSnapping } from "@utils/coordinates";
import { Fragment, type MouseEvent, useRef, useState } from "react";
import type { Coords } from "@/Types";

export const ClickAreaRectangle = () => {
	const dispatch = useStackDispatch();
	const [recording, setRecording] = useState(false);
	const clickAreaRef = useRef<HTMLDivElement>(null);
	const [mousePosition, setMousePosition] = useState<Coords | null>(null);
	const [initialPoint, setInitialPoint] = useState<Coords | null>(null);
	const [finalPoint, setFinalPoint] = useState<Coords | null>(null);

	const { activeStack, moveAllShapes, snapTo, xPoints, yPoints } =
		useStackContext();

	const drawRectangle = () => {
		if (initialPoint === null || finalPoint === null) {
			return;
		}
		const points = [
			{
				percentX: initialPoint.percentX,
				percentY: initialPoint.percentY,
			},
			{
				percentX: initialPoint.percentX,
				percentY: finalPoint.percentY,
			},
			{
				percentX: finalPoint.percentX,
				percentY: finalPoint.percentY,
			},
			{
				percentX: finalPoint.percentX,
				percentY: initialPoint.percentY,
			},
		];
		const updatedState = [...points];

		setInitialPoint(null);
		setFinalPoint(null);

		dispatch({
			type: "save-shape",
			payload: {
				coords: updatedState,
				shape: "rectangle",
			},
		});
	};

	const handleMouseDown = (event: MouseEvent<HTMLDivElement>) => {
		setFinalPoint(null);

		const initialCoords =
			snapTo && xPoints.length > 0 && yPoints.length > 0
				? getCoordsWithSnapping(event, clickAreaRef, xPoints, yPoints)!
				: getCoords(event, clickAreaRef)!;

		setInitialPoint(initialCoords);
		setRecording(true);
	};

	const handleMouseUp = (event: MouseEvent<HTMLDivElement>) => {
		// AHTODO: How to handle mouseup or out of bounds movement of the mouse?

		const upCoords =
			snapTo && xPoints.length > 0 && yPoints.length > 0
				? getCoordsWithSnapping(event, clickAreaRef, xPoints, yPoints)!
				: getCoords(event, clickAreaRef)!;

		setFinalPoint(upCoords);

		setRecording(false);
		drawRectangle();
	};

	/**
	 * This handles when the mouse cursor moves inside the click-area. It shows the position of the mouse with a div in the same style as the points on the DragAndDropPoints dots.
	 */
	const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
		const coords =
			snapTo && xPoints.length > 0 && yPoints.length > 0
				? getCoordsWithSnapping(event, clickAreaRef, xPoints, yPoints)!
				: getCoords(event, clickAreaRef)!;

		setMousePosition(coords);

		if (initialPoint === null || recording === false) {
			return;
		}
		setFinalPoint(coords);
	};

	// AHTODO: handle case when moving the mouse and dragging a point at the same time. At the moment handleMouseLeave kicks in and the point does not go out of the box.
	const handleMouseLeave = () => setMousePosition(null);

	if (activeStack.coords || moveAllShapes) {
		return (
			<ClickAreaWrapper clickAreaRef={clickAreaRef}>
				<DragAndDropPoints
					clickAreaRef={clickAreaRef}
					drawingMode="rectangle"
				/>
			</ClickAreaWrapper>
		);
	} else {
		return (
			<ClickAreaWrapper
				handleMouseDown={handleMouseDown}
				handleMouseUp={handleMouseUp}
				handleMouseMove={handleMouseMove}
				handleMouseLeave={handleMouseLeave}
				clickAreaRef={clickAreaRef}
			>
				{snapTo && (
					<Fragment>
						{initialPoint !== null && (
							<Point coords={initialPoint} type="initial" />
						)}

						{finalPoint !== null && <Point coords={finalPoint} type="final" />}
					</Fragment>
				)}

				{finalPoint !== null && initialPoint !== null && (
					<MiddlePoint initialPoint={initialPoint} finalPoint={finalPoint} />
				)}

				{mousePosition !== null && (
					<MousePosition coords={mousePosition}>P</MousePosition>
				)}
			</ClickAreaWrapper>
		);
	}
};

const MiddlePoint = ({
	initialPoint,
	finalPoint,
}: {
	initialPoint: Coords;
	finalPoint: Coords;
}) => {
	return (
		<div
			className="dot-bg rectangle-middle-point"
			style={{
				translate: `${
					Math.min(initialPoint.percentX, finalPoint.percentX) + "cqb"
				} ${Math.min(initialPoint.percentY, finalPoint.percentY) + "cqi"}`,
				height: Math.abs(initialPoint.percentY - finalPoint.percentY) + "%",
				width: Math.abs(initialPoint.percentX - finalPoint.percentX) + "%",
			}}
		/>
	);
};

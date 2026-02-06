import { GridLines } from "@components/GridLines";
import { useStackContext } from "@hooks/useStackContext";
import type { MouseEvent, PropsWithChildren, RefObject } from "react";

interface Props extends PropsWithChildren {
	handleClick?: (event: MouseEvent<HTMLDivElement>) => void;
	handleMouseDown?: (event: MouseEvent<HTMLDivElement>) => void;
	handleMouseMove?: (event: MouseEvent<HTMLDivElement>) => void;
	handleMouseUp?: (event: MouseEvent<HTMLDivElement>) => void;
	handleMouseLeave?: (event: MouseEvent<HTMLDivElement>) => void;
	clickAreaRef: RefObject<HTMLDivElement | null>;
	innerRef: RefObject<HTMLDivElement | null>;
}

export const ClickAreaWrapper = ({
	handleClick = undefined,
	handleMouseDown = undefined,
	handleMouseMove = undefined,
	handleMouseUp = undefined,
	handleMouseLeave = undefined,
	clickAreaRef,
	innerRef,
	children,
}: Props) => {
	const { snapTo } = useStackContext();

	return (
		<div
			className="click-area-wrapper"
			ref={clickAreaRef}
			onClick={handleClick}
			onMouseDown={handleMouseDown}
			onMouseUp={handleMouseUp}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<div className="click-area" ref={innerRef}></div>
			{children}
			{snapTo && <GridLines />}
		</div>
	);
};

import { type PropsWithChildren } from "react";

import { useStackContext } from "@/hooks/useStackContext";
import type { Coords } from "@/Types";

interface Props extends PropsWithChildren {
	coords: Coords;
}

export const MousePosition = ({ coords, children }: Props) => {
	let overlapTop = false;
	let overlapLeft = false;
	let nearBoth = false;
	const { snapTo } = useStackContext();

	if (snapTo) {
		/* eslint-disable-next-line react-hooks/rules-of-hooks */
		const { xPoints, yPoints } = useStackContext();

		// AHTODO - Doing this in every Draggable seems to be bad. Move into somewhere else to share these values?
		const nearY =
			yPoints.filter((yPoint) => {
				return Math.abs(coords.percentY - yPoint) <= 0;
			}).length > 0;

		const nearX =
			xPoints.filter((xPoint) => {
				return Math.abs(coords.percentX - xPoint) <= 0;
			}).length > 0;

		if (nearY) {
			// "top overlap"
			overlapTop = true;
		}

		if (nearX) {
			// "left overlap"
			overlapLeft = true;
		}

		nearBoth = nearX && nearY;
	}

	const getBgColor = () => {
		if (nearBoth) {
			return "linear-gradient(to right, red 50%, green 50% 0)";
		} else if (overlapLeft) {
			const direction = "left";
			return `linear-gradient(to ${direction}, red 50%, transparent 50% 0)`;
		} else if (overlapTop) {
			const direction = "top";
			return `linear-gradient(to ${direction}, transparent 50%, red 50% 0)`;
		}
	};

	return (
		<div
			className="mouse-position"
			style={{
				translate: `calc(${coords.percentX}cqi - 50%) calc(${coords.percentY}cqb - 50%)`,
				background: getBgColor(),
			}}
		>
			{children}
		</div>
	);
};

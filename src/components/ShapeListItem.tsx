import { SidebarItem } from "@components/SidebarItem";
import { useStackContext } from "@hooks/useStackContext";
import { useStackDispatch } from "@hooks/useStackDispatch";
import { Fragment } from "react";

import { ALLOWED_REDUCER_TYPES } from "@/context/StackProvider";

import type { Shape } from "@/Types";

export const ShapeListItem = ({
	stackIndex,
	stack,
	preventEditMode,
}: {
	stackIndex: number;
	stack: Shape;
	preventEditMode?: boolean;
}) => {
	const { editingNumber } = useStackContext();

	const dispatch = useStackDispatch();

	const onEditShape = () => {
		dispatch({ type: ALLOWED_REDUCER_TYPES.updateEditIndex, payload: { index: stackIndex } });
	};

	const onDeleteShape = () => {
		dispatch({
			type: ALLOWED_REDUCER_TYPES.deleteShape,
			payload: {
				index: stackIndex,
			},
		});
	};

	const onDuplicateShape = () => {
		dispatch({
			type: ALLOWED_REDUCER_TYPES.duplicateShape,
			payload: {
				index: stackIndex,
			},
		});
	};

	const canEdit = !preventEditMode && editingNumber === stackIndex;

	return (
		<li
			className={`sidebar-shape ${canEdit ? ` editable-shape ` : ""}`}
			key={`savedStackItem-${stackIndex}`}
		>
			{stack.shape}
			<br />
			{!preventEditMode && (
				<Fragment>
					<button onClick={onEditShape}>
						{!canEdit ? "Edit" : "Unedit"} Shape?
					</button>
					<br />

					<button onClick={onDuplicateShape}>Duplicate Shape?</button>
					<br />
					<button onClick={onDeleteShape}>Delete Shape?</button>
				</Fragment>
			)}

			{stack.shape === "line" && canEdit && (
				<Fragment>
					<ol>
						{stack.coords.map(({ percentX, percentY }, index) => {
							return (
								<SidebarItem
									key={`item-${index}`}
									x={percentX}
									y={percentY}
									currentIndex={index}
									editable={canEdit}
								/>
							);
						})}
					</ol>
					{/* {<pre>{JSON.stringify(stack.coords, null, 2)}</pre>} */}
				</Fragment>
			)}
		</li>
	);
};

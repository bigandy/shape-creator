type DialogProps = {
	open: boolean;
	positiveCallback: () => void;
	negativeCallback: () => void;
};

export const Dialog = ({
	open,
	positiveCallback,
	negativeCallback,
}: DialogProps) => {
	if (!open) {
		return;
	}

	return (
		<dialog open>
			<p>Do you want to delete this point?</p>
			<button onClick={positiveCallback}>Yes</button>
			<button onClick={negativeCallback}>No</button>
		</dialog>
	);
};

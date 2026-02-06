import { useMemo } from "react";

type Props = {
	disabled: boolean;
	clipPathStyle: string;
};

export const CodepenCreatorButton = ({ clipPathStyle, disabled }: Props) => {
	// Create a codepen with the clipPath styles, plus some basic boilerplate.
	// AHTODO: have some options here so the user can customise what they want to be in the HTML, css etc.
	// AHTODO: specify the image in the code posted to Codepen.
	// AHTODO: specify the name / description.

	const json = useMemo(() => {
		const style = `
body::after {
	clip-path: ${clipPathStyle};
}

html,
body {
	height: 100%;
}

body {
	background: black;
    position: relative;
    margin: unset;

	&::after {
		background: red;
		background-image: url(https://assets.codepen.io/17687/PXL_20250310_153313191+%281%29.jpg?width=1618&height=1215&format=auto&quality=26);

		content: "";
		position: absolute;
		inset: 0;
	}
}
*, *::after, *::before { box-sizing: border-box; }
    `;

		// List of available options to pass:
		// https://blog.codepen.io/documentation/prefill/
		const data = {
			title: "Created with shaper.andrewhudson.dev",
			description: "A clip-path: shape() creation from @bigandy",
			html_pre_processor: "none",
			css_pre_processor: "none",
			js_pre_processor: "none",
			html: "",
			css: style,
			js: "",
			private: true,
			tags: ["clip-path", "clip-path: shape()"], // an array of strings
		};
		const json = JSON.stringify(data)
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&apos;");

		return json;
	}, [clipPathStyle]);

	return (
		<form
			action="https://codepen.io/pen/define"
			method="POST"
			target="_blank"
			rel="noopener"
		>
			<input type="hidden" name="data" value={json} />
			<button type="submit" disabled={disabled}>
				Create Codepen Demo with this Code!
			</button>
		</form>
	);
};

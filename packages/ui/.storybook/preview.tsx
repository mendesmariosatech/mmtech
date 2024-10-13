import React from "react";
import type { Preview } from "@storybook/react";
import "../src/globals.css";

import { TooltipProvider } from "../src/components/ui/tooltip";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
	},
	decorators: [
		(Story, { parameters }) => {
			// 👇 Make it configurable by reading from parameters
			return (
				<TooltipProvider>
					<Story />
				</TooltipProvider>
			);
		},
	],
};

export default preview;

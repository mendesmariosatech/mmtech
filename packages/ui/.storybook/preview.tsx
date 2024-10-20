import React from "react";
import type { Preview } from "@storybook/react";
import "../src/globals.css";
import { Toaster } from "../src/components/ui/sonner";

import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryProvider } from "@repo/hook-services";

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
				<QueryProvider>
					<TooltipProvider>
						<Story />
						<Toaster />
					</TooltipProvider>
				</QueryProvider>
			);
		},
	],
};

export default preview;

import React from "react";
import type { Preview } from "@storybook/react";
import "../src/globals.css";
import { Toaster } from "../src/components/ui/sonner";

import { TooltipProvider } from "../src/components/ui/tooltip";
import { QueryProvider } from "@repo/hook-services";
import { createRouter } from "next/navigation";

import { RouterContext } from "next-server/dist/lib/router-context";

const router = createRouter("", { user: "nikita" }, "", {
	initialProps: {},
	pageLoader: () => {},
	App: () => {},
	Component: {},
});

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
					<RouterContext.Provider value={router}>
						<TooltipProvider>
							<Story />
							<Toaster />
						</TooltipProvider>
					</RouterContext.Provider>
				</QueryProvider>
			);
		},
	],
};

export default preview;

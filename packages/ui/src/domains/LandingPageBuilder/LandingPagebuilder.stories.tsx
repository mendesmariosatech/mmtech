import type { Meta, StoryObj } from "@storybook/react";

import { LandingPageBuilder } from "./LandingPageBuilder";

const meta = {
	title: "LandingPageBuilder/LandingPageBuilder",
	component: LandingPageBuilder,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: "fullscreen",
	},
} satisfies Meta<typeof LandingPageBuilder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};

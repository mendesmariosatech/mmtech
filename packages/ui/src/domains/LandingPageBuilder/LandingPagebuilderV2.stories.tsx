import type { Meta, StoryObj } from "@storybook/react";

import { LandingPageBuilderV2 } from "./LandingPageBuilderV2";

const meta = {
	title: "LandingPageBuilder/LandingPageBuilderV2",
	component: LandingPageBuilderV2,
	parameters: {
		// More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
		layout: "fullscreen",
	},
} satisfies Meta<typeof LandingPageBuilderV2>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Page: Story = {};

import type { Meta, StoryObj } from "@storybook/react";
import { CoreServices } from "./CoreServices";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Marketing/CoreServices",
	component: CoreServices,
	parameters: {
		// layout: "centered",
	},
	// tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof CoreServices>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

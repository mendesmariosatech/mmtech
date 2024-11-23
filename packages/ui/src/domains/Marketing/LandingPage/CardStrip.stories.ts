import type { Meta, StoryObj } from "@storybook/react";
import { CardStrip } from "./CardStrip";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Marketing/CardStrip",
	component: CardStrip,
	parameters: {
		// layout: "centered",
	},
	// tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof CardStrip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

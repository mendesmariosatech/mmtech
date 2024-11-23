import type { Meta, StoryObj } from "@storybook/react";
import { Hero } from "./Hero";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Marketing/Hero",
	component: Hero,
	parameters: {
		// layout: "centered",
	},
	// tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Hero>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

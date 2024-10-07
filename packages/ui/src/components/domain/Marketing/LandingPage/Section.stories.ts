import type { Meta, StoryObj } from "@storybook/react";
import { Section } from "./Section";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
	title: "Marketing/Section",
	component: Section,
	parameters: {
		// layout: "centered",
	},
	// tags: ["autodocs"],
	argTypes: {},
	args: {},
} satisfies Meta<typeof Section>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
	args: {},
};

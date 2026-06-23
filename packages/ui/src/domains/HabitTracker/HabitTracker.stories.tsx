import type { Meta, StoryObj } from "@storybook/react";
import { HabitTracker } from "./HabitTracker";

const FIXED_DATE = new Date("2024-06-15T12:00:00.000Z");

const meta: Meta<typeof HabitTracker> = {
	title: "Domains/HabitTracker",
	component: HabitTracker,
	parameters: {
		layout: "fullscreen",
	},
};

export default meta;
type Story = StoryObj<typeof HabitTracker>;

export const Base: Story = {
	args: {
		currentDate: FIXED_DATE,
	},
};

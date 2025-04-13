import type { Meta, StoryObj } from "@storybook/react";
import { Tasks } from "./Tasks";

const meta = {
	title: "Tasks/Tasks", // Title for the Storybook sidebar
	component: Tasks,
} satisfies Meta<typeof Tasks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseTasks: Story = {
	args: {},
};

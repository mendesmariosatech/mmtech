import type { Meta, StoryObj } from "@storybook/react";
import { TaskList } from "./TaskList";

const meta = {
	title: "Tasks/TaskList", // Title for the Storybook sidebar
	component: TaskList,
} satisfies Meta<typeof TaskList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseTaskList: Story = {
	args: {},
};

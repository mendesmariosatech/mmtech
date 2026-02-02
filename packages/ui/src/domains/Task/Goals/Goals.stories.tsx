import type { Meta, StoryObj } from "@storybook/react";
import { Goals } from "./Goals";

const meta = {
	title: "Tasks/Goals",
	component: Goals,
} satisfies Meta<typeof Goals>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseGoals: Story = {
	args: {},
};

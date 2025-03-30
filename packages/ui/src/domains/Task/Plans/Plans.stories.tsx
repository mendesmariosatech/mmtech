import type { Meta, StoryObj } from "@storybook/react";
import { Plans } from "./Plans";

const meta = {
	title: "Tasks/Plans",
	component: Plans,
} satisfies Meta<typeof Plans>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasePlans: Story = {
	args: {},
};

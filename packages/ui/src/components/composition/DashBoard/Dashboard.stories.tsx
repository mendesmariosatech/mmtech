import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "./Dashboard";

const meta = {
	title: "Dashboard",
	component: Dashboard,
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseDashboard: Story = {
	args: {},
};

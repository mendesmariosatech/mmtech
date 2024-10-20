import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "./Dashboard";
import { useRouter } from "@storybook/nextjs/navigation.mock";

const meta = {
	title: "Dashboard",
	component: Dashboard,
	parameters: {
		nextjs: {
			appDirectory: true,
		},
	},
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseDashboard: Story = {
	args: {},
};

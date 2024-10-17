import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "./Dashboard";
import DashBoardData from "./DashBoardData.json";

const meta = {
	title: "Dashboard",
	component: Dashboard,
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseDashboard: Story = {
	args: {
		companyName: DashBoardData.companyName,
		buttonTop: DashBoardData.buttonTop,
		buttonBotton: DashBoardData.buttonBotton,
	},
};

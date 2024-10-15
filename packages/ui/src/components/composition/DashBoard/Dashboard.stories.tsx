import type { Meta, StoryObj } from "@storybook/react";
import { Dashboard } from "./Dashboard";
import { buttonsDataStatic } from "../../sideBar-builder/SideBarPath";

const meta = {
	title: "Dashboard",
	component: Dashboard,
} satisfies Meta<typeof Dashboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseDashboard: Story = {
	args: {
		companyName: buttonsDataStatic.companyName,
		buttonsData: buttonsDataStatic.buttonsData,
		buttonConfig: buttonsDataStatic.buttonConfig,
	},
};

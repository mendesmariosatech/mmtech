import { Meta, StoryObj } from "@storybook/react";
import { SideBarStaticFormer } from "./SideBarStaticFormer";
import { DashBoardData } from "@repo/data-testing/DashBoardData";

const meta = {
	title: "SideBarStatic",
	component: SideBarStaticFormer,
	argTypes: {},
} satisfies Meta<typeof SideBarStaticFormer>;

export default meta;

type Story = StoryObj<typeof SideBarStaticFormer>;

// Story para SideBarStaticFormer com TooltipProvider
export const SideBarStaticModel: Story = {
	args: {
		companyName: DashBoardData.companyName,
		buttonTop: DashBoardData.buttonTop,
		buttonBottom: DashBoardData.buttonBottom,
	},
};

export const SideBarStaticModelEmpty: Story = {
	args: {
		companyName: DashBoardData.companyName,
		buttonTop: [],
		buttonBottom: [],
	},
};

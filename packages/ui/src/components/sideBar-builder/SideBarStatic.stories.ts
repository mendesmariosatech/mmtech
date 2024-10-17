import { Meta, StoryObj } from "@storybook/react";
import { SideBarStaticFormer } from "./SideBarStaticFormer";
import SideBarJson from "./SideBarData.json";

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
		companyName: SideBarJson.companyName,
		buttonTop: SideBarJson.buttonTop,
		buttonBotton: SideBarJson.buttonBotton,
	},
};

export const SideBarStaticModelEmpty: Story = {
	args: {
		companyName: SideBarJson.companyName,
		buttonTop: [],
		buttonBotton: [],
	},
};

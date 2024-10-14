import { Meta, StoryObj } from "@storybook/react";
import { buttonsDataStatic } from "./SideBarPath";
import { SideBarStaticFormer } from "./SideBarStaticFormer";

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
		NomeEmpresa: buttonsDataStatic.NomeEmpresa,
		buttonsData: buttonsDataStatic.buttonsData,
		buttonConfig: buttonsDataStatic.buttonConfig,
	},
};

export const SideBarStaticModelEmpty: Story = {
	args: {
		NomeEmpresa: buttonsDataStatic.NomeEmpresa,
		buttonsData: [],
		buttonConfig: [],
	},
};

import type { Meta, StoryObj } from "@storybook/react";
import { SideBarFormer } from "./SideBarFormer";
import { buttonsData } from "./SideBarPath"; // Importando buttonsData corretamente

const meta = {
	title: "SideBar",
	component: SideBarFormer,
	argTypes: {},
} satisfies Meta<typeof SideBarFormer>;

export default meta;

// Stories for SideBarFormer
type Story = StoryObj<typeof SideBarFormer>;

export const NormalMode: Story = {
	args: {
		NomeEmpresa: buttonsData.NomeEmpresa,
		buttonsData: buttonsData.buttonsData,
		buttonConfig: buttonsData.buttonConfig,
	},
};

export const ContractMode: Story = {
	args: {
		NomeEmpresa: buttonsData.NomeEmpresa,
		buttonsData: [],
		buttonConfig: [],
	},
};

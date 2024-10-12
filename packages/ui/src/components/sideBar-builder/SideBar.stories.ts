import type { Meta, StoryObj } from "@storybook/react";
import { SideBarFormer } from "./SideBarFormer";
import { buttonsData } from "./sideBarPath"; // Importando buttonsData corretamente

interface ButtonData {
	icon: React.ReactNode;
	label: string;
	disable: boolean;
	link?: string; // Link opcional, já que dropdowns não necessariamente têm link
	dropdownItems?: DropMenuItem[]; // Adicionando itens de dropdown
}

interface DropMenuItem {
	label: string;
	path?: string;
	icon?: React.ReactNode;
	disabled?: boolean;
	onClick?: () => void;
}

export interface PropsSideBarBuilder {
	NomeEmpresa: string;
	buttonsData: ButtonData[]; // Lista de botões, que pode incluir dropdowns
}

const meta = {
	title: "SideBar",
	component: SideBarFormer,
	argTypes: {},
} satisfies Meta<typeof SideBarFormer>;

export default meta;

type Story = StoryObj<typeof meta>;

export const NormalMode: Story = {
	args: {
		NomeEmpresa: "Minha Empresa",
		buttonsData: buttonsData,
	},
};

export const ContractMode: Story = {
	args: {
		NomeEmpresa: "Sua Empresa",
		buttonsData: [],
	},
};

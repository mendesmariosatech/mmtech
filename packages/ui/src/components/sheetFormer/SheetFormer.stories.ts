import { Meta, StoryObj } from "@storybook/react";
import SheetFormer from "./SheetFormer";
import { buttonsDataStatic } from "../sideBar-builder/SideBarPath";
import { ShoppingCart } from "lucide-react";

const meta = {
	title: "SheetFormer",
	component: SheetFormer,
	argTypes: {},
} satisfies Meta<typeof SheetFormer>;

export default meta;

type Story = StoryObj<typeof SheetFormer>;

// Story para SideBarStaticFormer com TooltipProvider
export const SheetFormerFull: Story = {
	args: {
		triggerIcon: "",
		triggerLabel: "",
		position: "left",
		companyName: buttonsDataStatic.companyName,
		buttonsData: buttonsDataStatic.buttonsData,
		buttonConfig: buttonsDataStatic.buttonConfig,
	},
};

export const SheetFormerEmpity: Story = {
	args: {
		triggerIcon: "",
		triggerLabel: "",
		position: "left",
		companyName: "",
		buttonsData: [],
		buttonConfig: [],
	},
};

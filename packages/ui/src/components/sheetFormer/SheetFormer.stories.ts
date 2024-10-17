import { Meta, StoryObj } from "@storybook/react";
import SheetFormer from "./SheetFormer";
import SideBarJson from "./SheetData.json";

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
		companyName: SideBarJson.companyName,
		buttonTop: SideBarJson.buttonTop,
		buttonBotton: SideBarJson.buttonBotton,
	},
};

export const SheetFormerEmpity: Story = {
	args: {
		triggerIcon: "",
		triggerLabel: "",
		position: "left",
		companyName: "",
		buttonTop: [],
		buttonBotton: [],
	},
};

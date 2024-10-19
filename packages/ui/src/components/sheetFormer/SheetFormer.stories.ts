import { Meta, StoryObj } from "@storybook/react";
import SheetFormer from "./SheetFormer";
import { DashBoardData } from "@repo/data-testing/DashBoardData";

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
		triggerIcon: "ShoppingCart",
		triggerLabel: "",
		position: "left",
		companyName: DashBoardData.companyName,
		buttonTop: DashBoardData.buttonTop,
		buttonBotton: DashBoardData.buttonBottom,
	},
};

export const SheetFormerEmpity: Story = {
	args: {
		triggerIcon: "CreditCard",
		triggerLabel: "Ronaldo",
		position: "left",
		companyName: "",
		buttonTop: [],
		buttonBotton: [],
	},
};

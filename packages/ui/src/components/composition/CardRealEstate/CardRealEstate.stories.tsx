import type { Meta, StoryObj } from "@storybook/react";
import { CardRealEstate } from "./CardRealEstate";

const meta = {
	title: "CardRealEstate",
	component: CardRealEstate,
} satisfies Meta<typeof CardRealEstate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseCardRealEstate: Story = {
	args: {},
};

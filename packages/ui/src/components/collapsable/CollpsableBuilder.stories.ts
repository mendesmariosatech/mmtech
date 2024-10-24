import { Meta, StoryObj } from "@storybook/react";
import { iconsNames } from "../iconData/IconData";
import { CollapsableBuilder, items } from "./CollapsableBuilder";

const meta = {
	title: "Collapsable Builder",
	component: CollapsableBuilder,
	argTypes: {
		icon: {
			options: iconsNames,
			control: { type: "select" },
		},
	},
} satisfies Meta<typeof CollapsableBuilder>;

export default meta;

type Story = StoryObj<typeof CollapsableBuilder>;

const Data: items[] = [
	{
		id: 1,
		label: "Label teste",
		isChecked: true,
	},
];

export const Collapsable: Story = {
	args: {
		title: "My favorit",
		items: Data,
		icon: "ChevronRight",
	},
};

import { Meta, StoryObj } from "@storybook/react";
import { LinkFormer } from "./LinkFormer";
import { DashBoardData } from "@repo/data-testing/DashBoardData";
import { iconsNames, routeNames } from "../iconData/IconData";

console.log({
	iconsNames,
	routeNames,
});

const meta = {
	title: "Link Former",
	component: LinkFormer,
	argTypes: {
		icon: {
			control: {
				type: "select",
				options: iconsNames,
			},
		},
		link: {
			control: {
				type: "select",
				options: routeNames,
			},
		},
	},
} satisfies Meta<typeof LinkFormer>;

export default meta;

type Story = StoryObj<typeof LinkFormer>;

export const LinkFormerButton: Story = {
	args: {
		link: DashBoardData.buttonBottom[0]?.link,
		icon: DashBoardData.buttonBottom[0]?.icon,
		label: DashBoardData.buttonBottom[0]?.label,
	},
};

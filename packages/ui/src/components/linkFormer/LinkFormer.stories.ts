import { Meta, StoryObj } from "@storybook/react";
import { LinkFormer } from "./LinkFormer";
import { DashBoardData } from "@repo/data-testing/DashBoardData";

const meta = {
	title: "Link Former",
	component: LinkFormer,
	argTypes: {
		icon: {
			control: {
				type: "select",
				options: DashBoardData.buttonBottom.map((item) => item.icon),
			},
		},
		link: {
			control: {
				type: "select",
				options: DashBoardData.buttonBottom.map((item) => item.link),
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

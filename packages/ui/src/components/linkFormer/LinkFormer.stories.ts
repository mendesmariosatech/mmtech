import { Meta, StoryObj } from "@storybook/react";
import { LinkFormer } from "./LinkFormer";
import LinkData from "./LinkFormerData.json";

const meta = {
	title: "Link Former",
	component: LinkFormer,
	argTypes: {},
} satisfies Meta<typeof LinkFormer>;

export default meta;

type Story = StoryObj<typeof LinkFormer>;

// Story para SideBarStaticFormer com TooltipProvider
export const LinkFormerButton: Story = {
	args: {
		link: LinkData.link,
		icon: LinkData.icon,
		label: LinkData.label,
	},
};

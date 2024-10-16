import { Meta, StoryObj } from "@storybook/react";
import { LinkFormer } from "./LinkFormer";
import { linkButtonData } from "./LinkFormerData";

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
		link: linkButtonData.link,
		icon: linkButtonData.icon,
		label: linkButtonData.label,
	},
};

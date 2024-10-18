// ToolTipBuilder.stories.tsx
import { Meta, StoryObj } from "@storybook/react";
import { ToolTipBuilder } from "./ToolTipBuilder";
import ToolTipData from "./ToolTipData.json";

const meta = {
	title: "ToolTip",
	component: ToolTipBuilder,
	argTypes: {},
} satisfies Meta<typeof ToolTipBuilder>;

export default meta;

type Story = StoryObj<typeof ToolTipBuilder>;

// Story para ToolTipBuilder com TooltipProvider
export const ToolTipBuilderModel: Story = {
	args: {
		link: ToolTipData.link,
		icon: ToolTipData.icon,
		label: ToolTipData.label,
	},
};

import { Meta, StoryObj } from "@storybook/react";
import { ToolTipBuilder } from "./ToolTipBuilder";

import { IconName, iconsNames, routeNames } from "../iconData/IconData";
import DashBoardData from "@repo/data-testing/DashBoardData.json";

const meta = {
	title: "ToolTip",
	component: ToolTipBuilder,
	argTypes: {
		icon: {
			options: iconsNames,
			control: { type: "select" },
		},
		link: {
			options: routeNames,
			control: { type: "select" },
		},
	},
} satisfies Meta<typeof ToolTipBuilder>;

export default meta;

type Story = StoryObj<typeof ToolTipBuilder>;

export const ToolTipBuilderModel: Story = {
	args: {
		link: DashBoardData.buttonTop[0]?.link,
		icon: DashBoardData.buttonTop[0]?.icon as IconName,
		label: DashBoardData.buttonTop[0]?.label,
	},
};

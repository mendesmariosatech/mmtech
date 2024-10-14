import type { Meta, StoryObj } from "@storybook/react";
import { EmptyList } from "./EmptyList";

const meta = {
	title: "EmptyList",
	component: EmptyList,
} satisfies Meta<typeof EmptyList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseEmptyList: Story = {
	args: {},
};

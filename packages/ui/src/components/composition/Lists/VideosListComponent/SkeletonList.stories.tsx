import type { Meta, StoryObj } from "@storybook/react";
import { SkeletonList } from "./SkeletonList";

const meta = {
	title: "VideoList/SkeletonList",
	component: SkeletonList,
} satisfies Meta<typeof SkeletonList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseSkeletonList: Story = {
	args: {},
};

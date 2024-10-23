import type { Meta, StoryObj } from "@storybook/react";
import { CTACreateVideoLink } from "./CTACreateVideoLink";

const meta = {
	title: "VideoList/CTACreateVideoLink",
	component: CTACreateVideoLink,
} satisfies Meta<typeof CTACreateVideoLink>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseCTACreateVideoLink: Story = {
	args: {},
};

import type { Meta, StoryObj } from "@storybook/react";
import { ProjectList } from "./ProjectList";

const meta = {
	title: "ProjectList",
	component: ProjectList,
} satisfies Meta<typeof ProjectList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseProjectList: Story = {
	args: {},
};

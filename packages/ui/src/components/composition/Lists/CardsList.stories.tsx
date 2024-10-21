import type { Meta, StoryObj } from "@storybook/react";
import { CardsList } from "./CardsList";

const meta = {
	title: "List/CardsList",
	component: CardsList,
} satisfies Meta<typeof CardsList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseCardsList: Story = {
	args: {},
};

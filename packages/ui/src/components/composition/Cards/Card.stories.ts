import { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta = {
	title: "Card",
	component: Card,
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SmallCard: Story = {
	args: {
		width: 150,
		height: 150,
		aspectRatio: "square",
		className: "w-[150px]",
		album: {
			name: "The Art of Reusability",
			artist: "Lena Logic",
			cover:
				"https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
		},
	},
};

export const BigCard: Story = {
	args: {
		width: 250,
		height: 350,
		aspectRatio: "square",
		className: "w-[250px]",
		album: {
			name: "The Art of Reusability",
			artist: "Lena Logic",
			cover:
				"https://images.unsplash.com/photo-1490300472339-79e4adc6be4a?w=300&dpr=2&q=80",
		},
	},
};

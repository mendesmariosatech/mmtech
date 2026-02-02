import type { Meta, StoryObj } from "@storybook/react";
import { VideoList } from "./VideoListComponent";

const meta = {
	title: "VideoList/VideoList",
	component: VideoList,
} satisfies Meta<typeof VideoList>;

export default meta;
type Story = StoryObj<typeof meta>;

const MultipleVideos = new Array(10).fill({
	title: "Title",
	description: "Description",
	url: "https://www.youtube.com/watch?v=3QnD2c4Xovk",
	id: "3QnD2c4Xovk",
	num_comments: 10,
});

export const DataList: Story = {
	args: {
		data: MultipleVideos,
	},
};

export const EmptyList: Story = {
	args: {
		data: [],
	},
};

export const Error: Story = {
	args: {
		error: true,
	},
};

export const Loading: Story = {
	args: {
		isLoading: true,
	},
};

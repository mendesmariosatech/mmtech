import type { Meta, StoryObj } from "@storybook/react";
import { VideoListComponent } from "./VideoListComponent";

const meta = {
	title: "VideoList/VideoListComponent",
	component: VideoListComponent,
} satisfies Meta<typeof VideoListComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BaseVideoListComponent: Story = {
	args: {
		title: "Title",
		description: "Description",
		url: "https://www.youtube.com/watch?v=3QnD2c4Xovk",
		id: "3QnD2c4Xovk",
		num_comments: 10,
	},
};

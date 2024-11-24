"use client";
import { useGetAllVideos } from "@repo/hook-services";
import { VideoList } from "@repo/ui/components/composition/Lists/VideosListComponent/VideoListComponent";

export const VideoPage = () => {
	const { data, isLoading, error } = useGetAllVideos();

	if (isLoading) return <VideoList isLoading />;

	if (error || !data) return <VideoList error />;

	const newMap = data.data.map((video) => ({
		title: video.title,
		description: video.description,
		url: video.url,
		id: video.id,
		num_comments: 0,
	}));

	return <VideoList data={newMap} />;
};

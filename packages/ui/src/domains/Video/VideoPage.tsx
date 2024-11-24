import { useGetAllVideos } from "@repo/hook-services";
import { VideoList } from "@repo/ui/components/composition/Lists/VideosListComponent/VideoListComponent";

export const VideoPage = async () => {
	const { data, isLoading, error } = useGetAllVideos();

	if (isLoading) return <VideoList isLoading />;

	if (data?.status !== 200) return <VideoList error />;

	const response = await data.json();

	const newMap = response.data.map((video) => ({
		title: video.title,
		description: video.description,
		url: video.url,
		id: video.id,
		num_comments: 0,
	}));

	return <VideoList data={newMap} />;
};

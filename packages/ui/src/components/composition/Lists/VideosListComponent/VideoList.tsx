// if I have data, the user should be true, the loading should be false and the error should be false

import { Button } from "../../../ui/button";
import { ErrorAlert } from "./ErrorAlert";
import { SkeletonList } from "./SkeletonList";
import { VideoListComponent } from "./VideoListComponent";

// if I don't have the data, that can be because it's loading or because there's an error
type HappyPath = {};

// this list should not even be considered if the user is not logged in
type VideoListProps = {
	data: [];
	isLoading: false;
	error: false;
};

const AddVideoText = () => {
	// const { openSheet } = useSheetState()
	const openSheet = () => {};

	return (
		<div className="text-center h-64 content-end">
			<Button
				variant={"outline"}
				onClick={openSheet}
				className="text-lg text-primary"
			>
				{"Press '+' to start adding videos"}
			</Button>
		</div>
	);
};

export const VideoList: React.FC<VideoListProps> = (props) => {
	const { data, isLoading, error } = props;

	return (
		<>
			{error ? (
				<ErrorAlert />
			) : isLoading ? (
				<SkeletonList />
			) : data?.length && !isLoading ? (
				<AddVideoText />
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
					{data?.map((video: any) => (
						<VideoListComponent
							key={video.id}
							description={video.description}
							title={video.title}
							url={video.video_url}
							id={video.id}
							num_comments={video.num_comments}
						/>
					))}
				</div>
			)}
		</>
	);
};

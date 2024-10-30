// if I have data, the user should be true, the loading should be false and the error should be false

import { Button } from "../../../ui/button";
import { ErrorAlert } from "./ErrorAlert";
import { SkeletonList } from "./SkeletonList";
import {
	VideoListComponent,
	VideoListComponentProps,
} from "./VideoListComponent";

type HappyPath = {
	data: VideoListComponentProps[];
};

type VideoListProps =
	| HappyPath
	| {
			isLoading: true;
	  }
	| {
			error: true;
	  };

const AddVideoText = () => {
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
	return (
		<>
			{"error" in props ? (
				<ErrorAlert />
			) : "isLoading" in props ? (
				<SkeletonList />
			) : props.data.length === 0 ? (
				<AddVideoText />
			) : (
				<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full border-red-800">
					{props.data?.map((video) => (
						<VideoListComponent
							key={video.id}
							description={video.description}
							title={video.title}
							url={video.url}
							id={video.id}
							num_comments={video.num_comments}
						/>
					))}
				</div>
			)}
		</>
	);
};

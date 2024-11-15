"use client";
// import { useGetVideosQuery } from "@/lib/api/api";
import Link from "next/link";
import ReactPlayer from "react-player";
// import { usePopoverState } from "../NavBar/Auth/hooks";
// import { useSheetState } from "../CreateVideoSheet/hooks";
import { Button } from "../../../ui/button";

function trimString(str: string, maxLength: number) {
	if (str.length > maxLength) {
		return str.slice(0, maxLength - 3) + "...";
	}
	return str;
}

import React from "react";
import { Skeleton } from "../../../ui/skeleton";

import { InfoCircledIcon } from "@radix-ui/react-icons";

import { Alert, AlertDescription, AlertTitle } from "../../../ui/alert";

export function ErrorAlert() {
	return (
		<div className="pt-20">
			<Alert>
				<InfoCircledIcon className="h-4 w-4" />
				<AlertTitle>Sorry!</AlertTitle>
				<AlertDescription>
					Something went wrong. Try again later.
				</AlertDescription>
			</Alert>
		</div>
	);
}

function SkeletonCard() {
	return (
		<div className="bg-white rounded-lg p-2 border flex flex-col gap-1 h-48 overflow-hidden">
			<Skeleton className="h-[125px] w-full rounded-xl" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-full]" />
				<Skeleton className="h-4 w-full" />
			</div>
		</div>
	);
}

const array = new Array(12).fill({});

// make this a list with lots of videos
export const SkeletonList = () => (
	<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 w-full">
		{array.map((_, i) => (
			<SkeletonCard key={i} />
		))}
	</div>
);

export type VideoListComponentProps = {
	title: string;
	description: string;
	url: string;
	id: string;
	num_comments: number;
};

export const VideoListComponent: React.FC<VideoListComponentProps> = ({
	title,
	description,
	url,
	id,
}) => {
	return (
		<Link
			data-testid={`video-list-${id}`}
			href={`/video-detail/${id}?title=${title}&description=${description}&url=${url}`}
			passHref
		>
			<div className="bg-white rounded-lg p-2 border flex flex-col gap-1 h-48 overflow-hidden">
				<ReactPlayer
					light
					url={url}
					width={"100%"}
					height={"100%"}
					style={{ borderRadius: "10px" }}
				/>
				<p className="font-bold">{trimString(title, 45)}</p>
				<p className="text-gray-700">{trimString(description, 60)}</p>
			</div>
		</Link>
	);
};

// if I have data, the user should be true, the loading should be false and the error should be false

// if I don't have the data, that can be because it's loading or because there's an error

// this list should not even be considered if the user is not logged in
type VideoListProps = {
	data: VideoListProps[];
	isLoading: false;
	error: false;
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

const SigninText = () => {
	// const { openPopover } = usePopoverState()

	const openPopover = () => {};

	return (
		<div className="text-center h-64 content-end">
			<Button
				variant={"outline"}
				onClick={openPopover}
				className="text-lg text-primary"
			>
				Sign in to start creating videos
			</Button>
		</div>
	);
};

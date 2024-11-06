import { Skeleton } from "../../../ui/skeleton";

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

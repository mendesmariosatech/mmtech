import React from "react";
import { Card } from "../Cards/Card";

import { Separator } from "../../separator";
import { ScrollArea, ScrollBar } from "../../scroll-area";
import { madeForYouAlbums } from "../Cards/data";

export const CardsList = () => {
	return (
		<>
			<div className="mt-6 space-y-1">
				<h2 className="text-2xl font-semibold tracking-tight">Made for You</h2>
				<p className="text-sm text-muted-foreground">
					Your personal playlists. Updated daily.
				</p>
			</div>
			<Separator className="my-4" />
			<div className="relative">
				<ScrollArea>
					<div className="flex space-x-4 pb-4">
						{madeForYouAlbums.map((album) => (
							<Card
								key={album.name}
								album={album}
								className="w-[250px]"
								aspectRatio="portrait"
								width={250}
								height={330}
							/>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		</>
	);
};

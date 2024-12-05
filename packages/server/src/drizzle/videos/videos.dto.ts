import { DBConnectionFunc } from "../../drizzle/drizzle-client";
import { PaginationSchema } from "../../utils/pagination";
import { CreateVideoSchema, videosTable } from "./videos";
import { count } from "drizzle-orm";

export const VideoDTO = (db: DBConnectionFunc) => ({
	async createVideo(args: CreateVideoSchema) {
		const [video] = await db.insert(videosTable).values(args).returning();

		return video;
	},

	async getAllPaginatedVideos({ page, limit }: PaginationSchema) {
		const videos = await db.query.videosTable.findMany({
			orderBy: (users, { asc }) => asc(users.id),
			limit,
			offset: (page - 1) * limit,
		});

		return videos;
	},

	async getVideosCounts() {
		const [videos] = await db.select({ count: count() }).from(videosTable);

		return videos;
	},
});

export type VideoDTO = ReturnType<typeof VideoDTO>;

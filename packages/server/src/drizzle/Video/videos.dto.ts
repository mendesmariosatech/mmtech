import { DBConnection } from "../../drizzle/drizzle-client";
import { PaginationSchema } from "../../utils/pagination";
import { safeAwait } from "../../utils/safeAwait";
import { CreateVideoSchema, videosTable } from "./videos";
import { count } from "drizzle-orm";

export class VideoTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createVideo(args: CreateVideoSchema) {
		const [video] = await this.db.insert(videosTable).values(args).returning();

		return video;
	}

	public async getAllPaginatedVideos({ page, limit }: PaginationSchema) {
		const videos = await this.db.query.videosTable.findMany({
			orderBy: (users, { asc }) => asc(users.id),
			limit,
			offset: (page - 1) * limit,
		});

		return videos;
	}

	public async getVideosCounts() {
		const [videos] = await this.db.select({ count: count() }).from(videosTable);

		return videos;
	}
}

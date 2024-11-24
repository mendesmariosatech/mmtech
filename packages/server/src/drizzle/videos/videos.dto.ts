import { DBConnection } from "../../drizzle/drizzle-client";
import { PaginationSchema } from "../../utils/pagination";
import { CreateVideoSchema, videosTable } from "./videos";

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
}

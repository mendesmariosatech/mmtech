import { DBConnection } from "../../drizzle/drizzle-client";
import { CreateVideoSchema, videosTable } from "./videos";

export class VideoTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createVideo(args: CreateVideoSchema) {
		const [video] = await this.db.insert(videosTable).values(args).returning();

		return video;
	}
}

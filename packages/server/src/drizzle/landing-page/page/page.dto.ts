import { eq } from "drizzle-orm";
import { DBConnection } from "../../drizzle-client";
import { CreatePageSchema, pageTable, SelectPageSchema } from "./page";

export class PageTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createPage(args: CreatePageSchema) {
		const [video] = await this.db.insert(pageTable).values(args).returning();

		return video;
	}

	public async getTemplateById(id: SelectPageSchema["id"]) {
		const videos = await this.db.query.templateTable.findFirst({
			where: eq(pageTable.id, id),
		});

		return videos;
	}
}

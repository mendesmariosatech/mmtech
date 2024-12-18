import { eq } from "drizzle-orm";
import { DBConnection } from "../../drizzle-client";
import {
	CreateTemplateSchema,
	SelectTemplateSchema,
	templateTable,
} from "./template";

export class TemplateTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createTemplate(args: CreateTemplateSchema) {
		const [video] = await this.db
			.insert(templateTable)
			.values(args)
			.returning();

		return video;
	}

	public async getTemplateById({ id }: SelectTemplateSchema) {
		const videos = await this.db.query.templateTable.findFirst({
			where: eq(templateTable.id, id),
		});

		return videos;
	}
}

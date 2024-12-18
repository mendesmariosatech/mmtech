import { eq } from "drizzle-orm";
import { DBConnection } from "../../drizzle/drizzle-client";
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
		const [template] = await this.db
			.insert(templateTable)
			.values(args)
			.returning();

		return template;
	}

	public async getTemplateById(id: SelectTemplateSchema["id"]) {
		const template = await this.db.query.templateTable.findFirst({
			where: eq(templateTable.id, id),
		});

		return template;
	}

	public async getAllTemplates() {
		const template = await this.db.query.templateTable.findMany();

		return template;
	}
}

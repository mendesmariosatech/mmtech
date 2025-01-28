import { eq } from "drizzle-orm";
import { DBConnection } from "../../drizzle-client";
import { CreatePageSchema, pageTable, SelectPageSchema } from "./page";

export class PageTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createPage(args: CreatePageSchema) {
		const [page] = await this.db.insert(pageTable).values(args).returning();

		return page;
	}

	public async getAllPagesByTemplate(
		templateId: SelectPageSchema["templateId"],
	) {
		const pages = await this.db.query.pageTable.findMany({
			where: eq(pageTable.templateId, templateId),
		});

		return pages;
	}

	public async getPageById(id: SelectPageSchema["id"]) {
		const pages = await this.db.query.templateTable.findFirst({
			where: eq(pageTable.id, id),
		});

		return pages;
	}
}

import { eq } from "drizzle-orm";
import { DBConnection } from "../../drizzle-client";
import { componentPage, SelectComponentPageSchema } from "../page/page";
import {
	componentTable,
	ContentSchema,
	CssSchema,
	type CreateMergeComponentSchema,
} from "./component";

export class ComponentTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createComponent(args: CreateMergeComponentSchema) {
		const [page] = await this.db
			.insert(componentTable)
			.values(args)
			.returning();

		return page;
	}

	public async getAllComponentsByTemplate(
		pageId: SelectComponentPageSchema["id"],
	) {
		const components = await this.db.query.componentPage.findMany({
			where: eq(componentTable.id, pageId),
		});

		return components;
	}

	// update component
	public async updateComponent(
		args: CreateMergeComponentSchema & {
			id: number;
		},
	) {
		const cssArgs = CssSchema.parse(args.css);
		const content = ContentSchema.parse(args.content);

		const [page] = await this.db
			.update(componentTable)
			.set({
				type: args.type,
				css: cssArgs,
				content: content,
			})
			.where(eq(componentTable.id, args.id))
			.returning();

		return page;
	}
}

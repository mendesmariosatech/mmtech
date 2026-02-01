import { eq } from "drizzle-orm";
import { DBConnection } from "../../drizzle-client";
import { componentPage } from "../page/page";
import {
	componentTable,
	ContentSchema,
	CssSchema,
	type CreateMergeComponentSchema,
	GetMergedSchema,
} from "./component";

export class ComponentTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	public async createComponent(args: CreateMergeComponentSchema) {
		try {
			const [component] = await this.db
				.insert(componentTable)
				.values(args)
				.returning();

			return component;
		} catch (error) {
			console.error("Erro ao criar componente:", error);
			throw error;
		}
	}

	public async getAllComponentsByTemplate(pageId: string) {
		const componentPages = await this.db.query.componentPage.findMany({
			where: eq(componentPage.pageId, pageId),
			with: {
				component: true,
			},
			orderBy: (componentPage, { asc }) => [asc(componentPage.order)],
		});

		// Extract and return just the components, not the componentPage wrapper
		return componentPages.map((cp) => cp.component);
	}

	// update component
	public async updateComponent(
		args: CreateMergeComponentSchema & {
			id: number;
		},
	) {
		try {
			const cssArgs = CssSchema.parse(args.css);
			const content = ContentSchema.parse(args.content);

			const [updatedComponent] = await this.db
				.update(componentTable)
				.set({
					type: args.type,
					css: cssArgs,
					content: content,
				})
				.where(eq(componentTable.id, args.id))
				.returning();

			return updatedComponent;
		} catch (error) {
			throw error;
		}
	}
}

import { eq } from "drizzle-orm";
import { DBConnection } from "../drizzle-client";
import { businessTable, CreateBusinessSchema } from "./business";

export class BusinessTable extends DBConnection {
	constructor(TURSO_CONNECTION_URL: string, TURSO_AUTH_TOKEN: string) {
		super(TURSO_CONNECTION_URL, TURSO_AUTH_TOKEN);
	}

	async createBusiness(args: CreateBusinessSchema) {
		const [business] = await this.db
			.insert(businessTable)
			.values({
				name: args.name,
				clientId: args.clientId,
				description: args.description,
			})
			.returning();
		return business;
	}

	async findBusinessByClientId(clientId: string) {
		const [business] = await this.db
			.select()
			.from(businessTable)
			.where(eq(businessTable.clientId, clientId));
		return business;
	}
}

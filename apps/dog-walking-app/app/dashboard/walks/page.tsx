export const dynamic = "force-dynamic";

import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { PageHeader } from "@/components/dashboard/page-header";
import { WalkList } from "@/components/dashboard/walk-list";

export default async function WalksPage() {
	const mockUser = { id: "demo-user-id" };

	const companies = await db
		.select()
		.from(schema.dogWalkingCompanies)
		.where(eq(schema.dogWalkingCompanies.owner_id, mockUser.id))
		.limit(1);

	const company = companies[0];
	if (!company) return null;

	const walks = await db.query.dogWalkingWalks.findMany({
		where: eq(schema.dogWalkingWalks.company_id, company.id),
		with: {
			client: { columns: { name: true, dog_name: true, walk_rate: true } },
			employee: { columns: { name: true } },
		},
		orderBy: [desc(schema.dogWalkingWalks.started_at)],
	});

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Walks"
				description="View all completed and in-progress walks"
			/>
			<main className="flex-1 p-6">
				<WalkList walks={walks} />
			</main>
		</div>
	);
}

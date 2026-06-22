import { db, schema } from "@/lib/db";
import { PageHeader } from "@/components/dashboard/page-header";
import { ClientList } from "@/components/dashboard/client-list";
import { AddClientDialog } from "@/components/dashboard/add-client-dialog";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export default async function ClientsPage() {
	const user = await getCurrentUser();
	if (!user) return null;

	const companies = await db
		.select()
		.from(schema.dogWalkingCompanies)
		.where(eq(schema.dogWalkingCompanies.owner_id, user.id))
		.limit(1);

	const company = companies[0];
	if (!company) return null;

	const clients = await db
		.select()
		.from(schema.dogWalkingClients)
		.where(eq(schema.dogWalkingClients.company_id, company.id))
		.orderBy(desc(schema.dogWalkingClients.createdAt));

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Clients"
				description="Manage your clients and their dogs"
				action={<AddClientDialog companyId={company.id} />}
			/>
			<main className="flex-1 p-6">
				<ClientList clients={clients} />
			</main>
		</div>
	);
}

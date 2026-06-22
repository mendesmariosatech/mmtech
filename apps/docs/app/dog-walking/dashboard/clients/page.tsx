import { db, schema } from "~/lib/db";
import { PageHeader } from "@repo/ui/domains/DogWalking/dashboard";
import { ClientList } from "@repo/ui/domains/DogWalking/dashboard";
import { AddClientDialog } from "@repo/ui/domains/DogWalking/dashboard";
import { eq, desc } from "drizzle-orm";
import { getCurrentUser } from "~/lib/dog-walking-auth";
import {
	addClient,
	toggleClientActive,
	deleteClient,
} from "~/app/dog-walking/actions/dog-walking";

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
				action={
					<AddClientDialog companyId={company.id} onAddClient={addClient} />
				}
			/>
			<main className="flex-1 p-6">
				<ClientList
					clients={clients}
					onToggleActive={toggleClientActive}
					onDeleteClient={deleteClient}
				/>
			</main>
		</div>
	);
}

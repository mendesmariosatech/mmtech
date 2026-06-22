export const dynamic = "force-dynamic";

import { db, schema } from "@/lib/db";
import { eq, desc, and } from "drizzle-orm";
import { PageHeader } from "@/components/dashboard/page-header";
import { InvoiceList } from "@/components/dashboard/invoice-list";
import { GenerateInvoicesDialog } from "@/components/dashboard/generate-invoices-dialog";
import { getCurrentUser } from "@/lib/auth";

export default async function InvoicesPage() {
	const user = await getCurrentUser();
	if (!user) return null;

	const companies = await db
		.select()
		.from(schema.dogWalkingCompanies)
		.where(eq(schema.dogWalkingCompanies.owner_id, user.id))
		.limit(1);

	const company = companies[0];
	if (!company) return null;

	const invoices = await db.query.dogWalkingInvoices.findMany({
		where: eq(schema.dogWalkingInvoices.company_id, company.id),
		with: { client: true },
		orderBy: [desc(schema.dogWalkingInvoices.createdAt)],
	});

	const clients = await db
		.select({
			id: schema.dogWalkingClients.id,
			name: schema.dogWalkingClients.name,
		})
		.from(schema.dogWalkingClients)
		.where(
			and(
				eq(schema.dogWalkingClients.company_id, company.id),
				eq(schema.dogWalkingClients.is_active, true),
			),
		);

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Invoices"
				description="Generate and manage client invoices"
				action={
					<GenerateInvoicesDialog companyId={company.id} clients={clients} />
				}
			/>
			<main className="flex-1 p-6">
				<InvoiceList invoices={invoices} companyId={company.id} />
			</main>
		</div>
	);
}

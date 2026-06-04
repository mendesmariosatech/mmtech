import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/dashboard/page-header";
import { InvoiceList } from "@/components/dashboard/invoice-list";
import { GenerateInvoicesDialog } from "@/components/dashboard/generate-invoices-dialog";

export default async function InvoicesPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: company } = await supabase
		.from("companies")
		.select("id")
		.eq("owner_id", user!.id)
		.single();

	if (!company) return null;

	const { data: invoices } = await supabase
		.from("invoices")
		.select("*, client:clients(name, email)")
		.eq("company_id", company.id)
		.order("created_at", { ascending: false });

	const { data: clients } = await supabase
		.from("clients")
		.select("id, name")
		.eq("company_id", company.id)
		.eq("is_active", true);

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Invoices"
				description="Generate and manage client invoices"
				action={
					<GenerateInvoicesDialog
						companyId={company.id}
						clients={clients || []}
					/>
				}
			/>
			<main className="flex-1 p-6">
				<InvoiceList invoices={invoices || []} companyId={company.id} />
			</main>
		</div>
	);
}

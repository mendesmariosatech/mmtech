import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/dashboard/page-header";
import { ClientList } from "@/components/dashboard/client-list";
import { AddClientDialog } from "@/components/dashboard/add-client-dialog";

export default async function ClientsPage() {
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

	const { data: clients } = await supabase
		.from("clients")
		.select("*")
		.eq("company_id", company.id)
		.order("created_at", { ascending: false });

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Clients"
				description="Manage your clients and their dogs"
				action={<AddClientDialog companyId={company.id} />}
			/>
			<main className="flex-1 p-6">
				<ClientList clients={clients || []} />
			</main>
		</div>
	);
}

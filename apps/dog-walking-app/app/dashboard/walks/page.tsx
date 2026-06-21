export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/dashboard/page-header";
import { WalkList } from "@/components/dashboard/walk-list";

export default async function WalksPage() {
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

	const { data: walks } = await supabase
		.from("walks")
		.select(
			"*, client:clients(name, dog_name, walk_rate), employee:employees(name)",
		)
		.eq("company_id", company.id)
		.order("started_at", { ascending: false });

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Walks"
				description="View all completed and in-progress walks"
			/>
			<main className="flex-1 p-6">
				<WalkList walks={walks || []} />
			</main>
		</div>
	);
}

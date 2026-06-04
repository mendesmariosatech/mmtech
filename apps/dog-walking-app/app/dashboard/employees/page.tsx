import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmployeeList } from "@/components/dashboard/employee-list";
import { AddEmployeeDialog } from "@/components/dashboard/add-employee-dialog";

export default async function EmployeesPage() {
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

	const { data: employees } = await supabase
		.from("employees")
		.select("*")
		.eq("company_id", company.id)
		.order("created_at", { ascending: false });

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Employees"
				description="Manage your dog walking team"
				action={<AddEmployeeDialog companyId={company.id} />}
			/>
			<main className="flex-1 p-6">
				<EmployeeList employees={employees || []} />
			</main>
		</div>
	);
}

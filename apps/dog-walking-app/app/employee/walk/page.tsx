export const dynamic = "force-dynamic";

import { createClient } from "@/lib/supabase/server";
import { WalkTracker } from "@/components/employee/walk-tracker";

export default async function WalkPage() {
	const supabase = await createClient();

	const {
		data: { user },
	} = await supabase.auth.getUser();

	const { data: employee } = await supabase
		.from("employees")
		.select("id, company_id")
		.eq("user_id", user!.id)
		.single();

	if (!employee) return null;

	// Get active walk if any
	const { data: activeWalk } = await supabase
		.from("walks")
		.select("*, client:clients(name, dog_name, address, dog_notes)")
		.eq("employee_id", employee.id)
		.eq("status", "in_progress")
		.single();

	// Get clients for selection
	const { data: clients } = await supabase
		.from("clients")
		.select("id, name, dog_name, address, dog_notes")
		.eq("company_id", employee.company_id)
		.eq("is_active", true)
		.order("name");

	return (
		<WalkTracker
			employeeId={employee.id}
			companyId={employee.company_id}
			clients={clients || []}
			activeWalk={activeWalk}
		/>
	);
}

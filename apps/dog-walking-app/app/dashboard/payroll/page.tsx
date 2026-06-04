import { createClient } from "@/lib/supabase/server";
import { PageHeader } from "@/components/dashboard/page-header";
import { PayrollSummary } from "@/components/dashboard/payroll-summary";

export default async function PayrollPage() {
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

	// Get all employees with their completed walks for current month
	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

	const { data: employees } = await supabase
		.from("employees")
		.select("*")
		.eq("company_id", company.id)
		.eq("is_active", true);

	const { data: walks } = await supabase
		.from("walks")
		.select("employee_id, duration_minutes")
		.eq("company_id", company.id)
		.eq("status", "completed")
		.gte("started_at", startOfMonth.toISOString())
		.lte("started_at", endOfMonth.toISOString());

	// Calculate hours worked per employee
	const employeePayroll =
		employees?.map((employee) => {
			const employeeWalks =
				walks?.filter((w) => w.employee_id === employee.id) || [];
			const totalMinutes = employeeWalks.reduce(
				(sum, w) => sum + (w.duration_minutes || 30),
				0,
			);
			const totalHours = totalMinutes / 60;
			const totalPay = totalHours * employee.hourly_rate;

			return {
				...employee,
				totalWalks: employeeWalks.length,
				totalHours: totalHours.toFixed(2),
				totalPay: totalPay.toFixed(2),
			};
		}) || [];

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Payroll"
				description={`Payroll summary for ${startOfMonth.toLocaleDateString("en-US", { month: "long", year: "numeric" })}`}
			/>
			<main className="flex-1 p-6">
				<PayrollSummary employees={employeePayroll} />
			</main>
		</div>
	);
}

export const dynamic = "force-dynamic";

import { db, schema } from "@/lib/db";
import { eq, and, gte, lte } from "drizzle-orm";
import { PageHeader } from "@/components/dashboard/page-header";
import { PayrollSummary } from "@/components/dashboard/payroll-summary";
import { getCurrentUser } from "@/lib/auth";

export default async function PayrollPage() {
	const user = await getCurrentUser();
	if (!user) return null;

	const companies = await db
		.select()
		.from(schema.dogWalkingCompanies)
		.where(eq(schema.dogWalkingCompanies.owner_id, user.id))
		.limit(1);

	const company = companies[0];
	if (!company) return null;

	const now = new Date();
	const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
	const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

	const employees = await db
		.select()
		.from(schema.dogWalkingEmployees)
		.where(
			and(
				eq(schema.dogWalkingEmployees.company_id, company.id),
				eq(schema.dogWalkingEmployees.is_active, true),
			),
		);

	const walks = await db
		.select({
			employee_id: schema.dogWalkingWalks.employee_id,
			duration_minutes: schema.dogWalkingWalks.duration_minutes,
		})
		.from(schema.dogWalkingWalks)
		.where(
			and(
				eq(schema.dogWalkingWalks.company_id, company.id),
				eq(schema.dogWalkingWalks.status, "completed"),
				gte(schema.dogWalkingWalks.started_at, startOfMonth.toISOString()),
				lte(schema.dogWalkingWalks.started_at, endOfMonth.toISOString()),
			),
		);

	const employeePayroll = employees.map((employee) => {
		const employeeWalks = walks.filter((w) => w.employee_id === employee.id);
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
	});

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

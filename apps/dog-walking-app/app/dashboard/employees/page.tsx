export const dynamic = "force-dynamic";

import { db, schema } from "@/lib/db";
import { eq, desc } from "drizzle-orm";
import { PageHeader } from "@/components/dashboard/page-header";
import { EmployeeList } from "@/components/dashboard/employee-list";
import { AddEmployeeDialog } from "@/components/dashboard/add-employee-dialog";

export default async function EmployeesPage() {
	const mockUser = { id: "demo-user-id" };

	const companies = await db
		.select()
		.from(schema.dogWalkingCompanies)
		.where(eq(schema.dogWalkingCompanies.owner_id, mockUser.id))
		.limit(1);

	const company = companies[0];
	if (!company) return null;

	const employees = await db
		.select()
		.from(schema.dogWalkingEmployees)
		.where(eq(schema.dogWalkingEmployees.company_id, company.id))
		.orderBy(desc(schema.dogWalkingEmployees.createdAt));

	return (
		<div className="flex flex-col">
			<PageHeader
				title="Employees"
				description="Manage your dog walking team"
				action={<AddEmployeeDialog companyId={company.id} />}
			/>
			<main className="flex-1 p-6">
				<EmployeeList employees={employees} />
			</main>
		</div>
	);
}

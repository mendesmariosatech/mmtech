export const dynamic = "force-dynamic";

import { db, schema } from "~/lib/db";
import { eq, desc } from "drizzle-orm";
import { PageHeader } from "@repo/ui/domains/DogWalking/dashboard";
import { EmployeeList } from "@repo/ui/domains/DogWalking/dashboard";
import { AddEmployeeDialog } from "@repo/ui/domains/DogWalking/dashboard";
import { getCurrentUser } from "~/lib/dog-walking-auth";
import {
	addEmployee,
	toggleEmployeeActive,
	deleteEmployee,
} from "~/app/dog-walking/actions/dog-walking";

export default async function EmployeesPage() {
	const user = await getCurrentUser();
	if (!user) return null;

	const companies = await db
		.select()
		.from(schema.dogWalkingCompanies)
		.where(eq(schema.dogWalkingCompanies.owner_id, user.id))
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
				action={
					<AddEmployeeDialog
						companyId={company.id}
						onAddEmployee={addEmployee}
					/>
				}
			/>
			<main className="flex-1 p-6">
				<EmployeeList
					employees={employees}
					onToggleActive={toggleEmployeeActive}
					onDeleteEmployee={deleteEmployee}
				/>
			</main>
		</div>
	);
}

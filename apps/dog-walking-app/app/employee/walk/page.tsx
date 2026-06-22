export const dynamic = "force-dynamic";

import { db, schema } from "@/lib/db";
import { eq, and } from "drizzle-orm";
import { WalkTracker } from "@/components/employee/walk-tracker";

export default async function WalkPage() {
	const mockUser = { id: "demo-user-id" };

	const employee = await db.query.dogWalkingEmployees.findFirst({
		where: eq(schema.dogWalkingEmployees.user_id, mockUser.id),
	});

	if (!employee) return null;

	const activeWalk = await db.query.dogWalkingWalks.findFirst({
		where: and(
			eq(schema.dogWalkingWalks.employee_id, employee.id),
			eq(schema.dogWalkingWalks.status, "in_progress"),
		),
		with: {
			client: {
				columns: { name: true, dog_name: true, address: true, dog_notes: true },
			},
		},
	});

	const clients = await db
		.select({
			id: schema.dogWalkingClients.id,
			name: schema.dogWalkingClients.name,
			dog_name: schema.dogWalkingClients.dog_name,
			address: schema.dogWalkingClients.address,
			dog_notes: schema.dogWalkingClients.dog_notes,
		})
		.from(schema.dogWalkingClients)
		.where(
			and(
				eq(schema.dogWalkingClients.company_id, employee.company_id),
				eq(schema.dogWalkingClients.is_active, true),
			),
		);

	return (
		<WalkTracker
			employeeId={employee.id}
			companyId={employee.company_id}
			clients={clients}
			activeWalk={activeWalk ?? null}
		/>
	);
}

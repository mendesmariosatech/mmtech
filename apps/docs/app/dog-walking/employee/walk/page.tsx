export const dynamic = "force-dynamic";

import { db, schema } from "~/lib/db";
import { eq, and, asc } from "drizzle-orm";
import { WalkTracker } from "@repo/ui/domains/DogWalking/employee";
import { getCurrentUser } from "~/lib/dog-walking-auth";
import { startWalk, endWalk } from "~/app/dog-walking/actions/dog-walking";

export default async function WalkPage() {
	const user = await getCurrentUser();
	if (!user) return null;

	const employee = await db.query.dogWalkingEmployees.findFirst({
		where: eq(schema.dogWalkingEmployees.user_id, user.id),
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
		)
		.orderBy(asc(schema.dogWalkingClients.name));

	return (
		<WalkTracker
			employeeId={employee.id}
			companyId={employee.company_id}
			clients={clients}
			activeWalk={activeWalk ?? null}
			onStartWalk={startWalk}
			onEndWalk={endWalk}
		/>
	);
}

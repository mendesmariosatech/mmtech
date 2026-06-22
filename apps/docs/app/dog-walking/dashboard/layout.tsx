export const dynamic = "force-dynamic";

import { db, schema } from "~/lib/db";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@repo/ui/domains/DogWalking/dashboard";
import { SidebarProvider, SidebarInset } from "@repo/ui/components/ui/sidebar";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "~/lib/dog-walking-auth";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();
	if (!user) redirect("/dog-walking/auth/login");

	const companies = await db
		.select()
		.from(schema.dogWalkingCompanies)
		.where(eq(schema.dogWalkingCompanies.owner_id, user.id))
		.limit(1);

	const company = companies[0];

	if (!company) {
		const employees = await db
			.select()
			.from(schema.dogWalkingEmployees)
			.where(eq(schema.dogWalkingEmployees.user_id, user.id))
			.limit(1);

		if (employees.length > 0) {
			redirect("/dog-walking/employee");
		}

		redirect("/dog-walking/onboarding");
	}

	return (
		<SidebarProvider>
			<DashboardSidebar company={company} userEmail={user.email} />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}

import { db, schema } from "@/lib/db";
import { redirect } from "next/navigation";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { eq } from "drizzle-orm";
import { getCurrentUser } from "@/lib/auth";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const user = await getCurrentUser();
	if (!user) redirect("/auth/login");

	const companies = await db
		.select()
		.from(schema.dogWalkingCompanies)
		.where(eq(schema.dogWalkingCompanies.owner_id, user.id))
		.limit(1);

	const company = companies[0];

	if (!company) {
		// Check if user is an employee
		const employees = await db
			.select()
			.from(schema.dogWalkingEmployees)
			.where(eq(schema.dogWalkingEmployees.user_id, user.id))
			.limit(1);

		if (employees.length > 0) {
			redirect("/employee");
		}

		// Neither owner nor employee - needs onboarding
		redirect("/onboarding");
	}

	return (
		<SidebarProvider>
			<DashboardSidebar company={company} userEmail={user.email} />
			<SidebarInset>{children}</SidebarInset>
		</SidebarProvider>
	);
}

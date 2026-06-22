"use server";

import { db, schema } from "@/lib/db";
import { eq, and, gte, lte } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function addClient(companyId: string, formData: FormData) {
	try {
		await db.insert(schema.dogWalkingClients).values({
			company_id: companyId,
			name: formData.get("name") as string,
			email: (formData.get("email") as string) || null,
			phone: (formData.get("phone") as string) || null,
			address: (formData.get("address") as string) || null,
			dog_name: formData.get("dog_name") as string,
			dog_breed: (formData.get("dog_breed") as string) || null,
			dog_notes: (formData.get("dog_notes") as string) || null,
			walk_rate: parseInt(formData.get("walk_rate") as string) || 25,
		});
		return { success: true };
	} catch {
		return { success: false };
	}
}

export async function addEmployee(companyId: string, formData: FormData) {
	try {
		await db.insert(schema.dogWalkingEmployees).values({
			company_id: companyId,
			name: formData.get("name") as string,
			email: formData.get("email") as string,
			phone: (formData.get("phone") as string) || null,
			hourly_rate: parseInt(formData.get("hourly_rate") as string) || 15,
		});
		return { success: true };
	} catch {
		return { success: false };
	}
}

export async function toggleClientActive(clientId: string, isActive: boolean) {
	try {
		await db
			.update(schema.dogWalkingClients)
			.set({ is_active: !isActive })
			.where(eq(schema.dogWalkingClients.id, clientId));
		revalidatePath("/dashboard/clients");
		return { success: true };
	} catch (e) {
		return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
	}
}

export async function deleteClient(clientId: string) {
	try {
		await db
			.delete(schema.dogWalkingClients)
			.where(eq(schema.dogWalkingClients.id, clientId));
		revalidatePath("/dashboard/clients");
		return { success: true };
	} catch (e) {
		return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
	}
}

export async function toggleEmployeeActive(
	employeeId: string,
	isActive: boolean,
) {
	try {
		await db
			.update(schema.dogWalkingEmployees)
			.set({ is_active: !isActive })
			.where(eq(schema.dogWalkingEmployees.id, employeeId));
		revalidatePath("/dashboard/employees");
		return { success: true };
	} catch (e) {
		return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
	}
}

export async function deleteEmployee(employeeId: string) {
	try {
		await db
			.delete(schema.dogWalkingEmployees)
			.where(eq(schema.dogWalkingEmployees.id, employeeId));
		revalidatePath("/dashboard/employees");
		return { success: true };
	} catch (e) {
		return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
	}
}

export async function updateInvoiceStatus(
	invoiceId: string,
	status: "draft" | "sent" | "paid",
) {
	try {
		await db
			.update(schema.dogWalkingInvoices)
			.set({ status })
			.where(eq(schema.dogWalkingInvoices.id, invoiceId));
		revalidatePath("/dashboard/invoices");
		return { success: true };
	} catch (e) {
		return { success: false, error: e instanceof Error ? e.message : "Unknown error" };
	}
}

export async function generateInvoice(
	companyId: string,
	clientId: string,
	periodStart: string,
	periodEnd: string,
) {
	const walks = await db.query.dogWalkingWalks.findMany({
		where: and(
			eq(schema.dogWalkingWalks.company_id, companyId),
			eq(schema.dogWalkingWalks.client_id, clientId),
			eq(schema.dogWalkingWalks.status, "completed"),
			gte(schema.dogWalkingWalks.started_at, periodStart),
			lte(schema.dogWalkingWalks.started_at, periodEnd),
		),
		with: { client: { columns: { walk_rate: true } } },
	});

	if (walks.length === 0) {
		return {
			success: false,
			error: "No completed walks found for this period",
		};
	}

	const totalAmount = walks.reduce(
		(sum, walk) => sum + (walk.client?.walk_rate || 0),
		0,
	);
	const periodDate = new Date(periodStart);
	const yearNum = periodDate.getFullYear();
	const monthNum = periodDate.getMonth() + 1;
	const invoiceNumber = `INV-${yearNum}${String(monthNum).padStart(2, "0")}-${Date.now().toString().slice(-4)}`;

	await db.insert(schema.dogWalkingInvoices).values({
		company_id: companyId,
		client_id: clientId,
		invoice_number: invoiceNumber,
		period_start: periodStart.split("T")[0]!,
		period_end: periodEnd.split("T")[0]!,
		total_walks: walks.length,
		total_amount: totalAmount,
		status: "draft",
	});

	revalidatePath("/dashboard/invoices");
	return { success: true };
}

export async function startWalk(
	companyId: string,
	employeeId: string,
	clientId: string,
) {
	const [walk] = await db
		.insert(schema.dogWalkingWalks)
		.values({
			company_id: companyId,
			employee_id: employeeId,
			client_id: clientId,
			started_at: new Date().toISOString(),
			status: "in_progress",
		})
		.returning();

	if (!walk) return null;

	return db.query.dogWalkingWalks.findFirst({
		where: eq(schema.dogWalkingWalks.id, walk.id),
		with: {
			client: {
				columns: { name: true, dog_name: true, address: true, dog_notes: true },
			},
		},
	});
}

export async function endWalk(
	walkId: string,
	startedAt: string,
	notes?: string,
) {
	const endedAt = new Date();
	const durationMinutes = Math.round(
		(endedAt.getTime() - new Date(startedAt).getTime()) / 60000,
	);

	await db
		.update(schema.dogWalkingWalks)
		.set({
			ended_at: endedAt.toISOString(),
			duration_minutes: durationMinutes,
			notes: notes || null,
			status: "completed",
		})
		.where(eq(schema.dogWalkingWalks.id, walkId));
}

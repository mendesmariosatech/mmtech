export interface Company {
	id: string;
	owner_id: string;
	name: string;
	createdAt: string;
}

export interface Employee {
	id: string;
	user_id: string | null;
	company_id: string;
	name: string;
	email: string;
	phone: string | null;
	hourly_rate: number;
	is_active: boolean;
	createdAt: string;
}

export interface Client {
	id: string;
	company_id: string;
	name: string;
	email: string | null;
	phone: string | null;
	address: string | null;
	dog_name: string;
	dog_breed: string | null;
	dog_notes: string | null;
	walk_rate: number;
	is_active: boolean;
	createdAt: string;
}

export interface Walk {
	id: string;
	company_id: string;
	client_id: string;
	employee_id: string;
	started_at: string;
	ended_at: string | null;
	duration_minutes: number | null;
	notes: string | null;
	status: "in_progress" | "completed" | "cancelled";
	createdAt: string;
	// Joined fields — column selection may return a subset of the full type
	client?: Partial<Client>;
	employee?: Partial<Employee>;
}

export interface Invoice {
	id: string;
	company_id: string;
	client_id: string;
	invoice_number: string;
	period_start: string;
	period_end: string;
	total_walks: number;
	total_amount: number;
	status: "draft" | "sent" | "paid";
	createdAt: string;
	// Joined fields — column selection may return a subset of the full type
	client?: Partial<Client>;
}

export type UserRole = "owner" | "employee";

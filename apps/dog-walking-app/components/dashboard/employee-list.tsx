"use client";

import { Employee } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Mail, Phone, DollarSign } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface EmployeeListProps {
	employees: Employee[];
}

export function EmployeeList({ employees }: EmployeeListProps) {
	const router = useRouter();

	const toggleActive = async (employee: Employee) => {
		const supabase = createClient();
		await supabase
			.from("employees")
			.update({ is_active: !employee.is_active })
			.eq("id", employee.id);
		router.refresh();
	};

	const deleteEmployee = async (id: string) => {
		const supabase = createClient();
		await supabase.from("employees").delete().eq("id", id);
		router.refresh();
	};

	if (employees.length === 0) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<p className="text-muted-foreground">No employees yet</p>
					<p className="text-sm text-muted-foreground">
						Add your first team member to get started
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{employees.map((employee) => (
				<Card key={employee.id}>
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-lg">{employee.name}</CardTitle>
							<Badge
								variant={employee.is_active ? "default" : "secondary"}
								className="mt-1"
							>
								{employee.is_active ? "Active" : "Inactive"}
							</Badge>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => toggleActive(employee)}>
									{employee.is_active ? "Mark Inactive" : "Mark Active"}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => deleteEmployee(employee.id)}
									className="text-destructive"
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardHeader>
					<CardContent className="space-y-2 text-sm">
						<div className="flex items-center gap-2 text-muted-foreground">
							<Mail className="h-4 w-4" />
							<span>{employee.email}</span>
						</div>
						{employee.phone && (
							<div className="flex items-center gap-2 text-muted-foreground">
								<Phone className="h-4 w-4" />
								<span>{employee.phone}</span>
							</div>
						)}
						<div className="flex items-center gap-2 text-muted-foreground">
							<DollarSign className="h-4 w-4" />
							<span>${employee.hourly_rate}/hour</span>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

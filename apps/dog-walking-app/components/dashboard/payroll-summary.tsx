"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Employee } from "@/lib/types";

interface PayrollEmployee extends Employee {
	totalWalks: number;
	totalHours: string;
	totalPay: string;
}

interface PayrollSummaryProps {
	employees: PayrollEmployee[];
}

export function PayrollSummary({ employees }: PayrollSummaryProps) {
	const totalPayroll = employees.reduce(
		(sum, e) => sum + parseFloat(e.totalPay),
		0,
	);

	if (employees.length === 0) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<p className="text-muted-foreground">No active employees</p>
					<p className="text-sm text-muted-foreground">
						Add employees to see payroll calculations
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="space-y-6">
			<div className="grid gap-4 md:grid-cols-3">
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Total Employees
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">{employees.length}</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Total Walks This Month
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold">
							{employees.reduce((sum, e) => sum + e.totalWalks, 0)}
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader className="pb-2">
						<CardTitle className="text-sm font-medium text-muted-foreground">
							Total Payroll
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="text-2xl font-bold text-primary">
							${totalPayroll.toFixed(2)}
						</div>
					</CardContent>
				</Card>
			</div>

			<Card>
				<CardHeader>
					<CardTitle>Employee Breakdown</CardTitle>
				</CardHeader>
				<CardContent className="p-0">
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead>Employee</TableHead>
								<TableHead>Hourly Rate</TableHead>
								<TableHead>Walks</TableHead>
								<TableHead>Hours Worked</TableHead>
								<TableHead>Total Pay</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							{employees.map((employee) => (
								<TableRow key={employee.id}>
									<TableCell className="font-medium">{employee.name}</TableCell>
									<TableCell>${employee.hourly_rate}/hr</TableCell>
									<TableCell>{employee.totalWalks}</TableCell>
									<TableCell>{employee.totalHours} hrs</TableCell>
									<TableCell className="font-medium text-primary">
										${employee.totalPay}
									</TableCell>
								</TableRow>
							))}
						</TableBody>
					</Table>
				</CardContent>
			</Card>
		</div>
	);
}

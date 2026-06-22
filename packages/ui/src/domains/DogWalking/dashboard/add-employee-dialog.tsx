"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../../../components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Plus } from "lucide-react";

interface AddEmployeeDialogProps {
	companyId: string;
	onAddEmployee: (
		companyId: string,
		formData: FormData,
	) => Promise<{ success: boolean }>;
}

export function AddEmployeeDialog({
	companyId,
	onAddEmployee,
}: AddEmployeeDialogProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const result = await onAddEmployee(companyId, formData);

		if (result.success) {
			setOpen(false);
			router.refresh();
		}
		setIsLoading(false);
	};

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<Plus className="mr-2 h-4 w-4" />
					Add Employee
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Add New Employee</DialogTitle>
					<DialogDescription>
						Add a new team member to your dog walking business.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Name</Label>
							<Input id="name" name="name" placeholder="John Doe" required />
						</div>
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								name="email"
								type="email"
								placeholder="john@example.com"
								required
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="phone">Phone (optional)</Label>
							<Input
								id="phone"
								name="phone"
								type="tel"
								placeholder="(555) 123-4567"
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="hourly_rate">Hourly Rate ($)</Label>
							<Input
								id="hourly_rate"
								name="hourly_rate"
								type="number"
								step="0.01"
								defaultValue="15.00"
								required
							/>
						</div>
					</div>
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit" disabled={isLoading}>
							{isLoading ? "Adding..." : "Add Employee"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

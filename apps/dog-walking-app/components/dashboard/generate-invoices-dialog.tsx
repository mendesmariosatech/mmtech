"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FileText } from "lucide-react";
import { generateInvoice } from "@/app/actions/dog-walking";

interface GenerateInvoicesDialogProps {
	companyId: string;
	clients: { id: string; name: string }[];
}

export function GenerateInvoicesDialog({
	companyId,
	clients,
}: GenerateInvoicesDialogProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedClient, setSelectedClient] = useState<string>("");
	const [month, setMonth] = useState<string>(new Date().getMonth().toString());
	const [year, setYear] = useState<string>(new Date().getFullYear().toString());
	const router = useRouter();

	const handleGenerate = async () => {
		if (!selectedClient) return;
		setIsLoading(true);

		const monthNum = parseInt(month);
		const yearNum = parseInt(year);
		const periodStart = new Date(yearNum, monthNum, 1);
		const periodEnd = new Date(yearNum, monthNum + 1, 0);

		const result = await generateInvoice(
			companyId,
			selectedClient,
			periodStart.toISOString(),
			periodEnd.toISOString(),
		);

		if (!result.success) {
			alert(result.error || "Failed to generate invoice");
			setIsLoading(false);
			return;
		}

		setOpen(false);
		router.refresh();
		setIsLoading(false);
	};

	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>
					<FileText className="mr-2 h-4 w-4" />
					Generate Invoice
				</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Generate Invoice</DialogTitle>
					<DialogDescription>
						Create an invoice for a client based on completed walks.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid gap-2">
						<Label>Client</Label>
						<Select value={selectedClient} onValueChange={setSelectedClient}>
							<SelectTrigger>
								<SelectValue placeholder="Select a client" />
							</SelectTrigger>
							<SelectContent>
								{clients.map((client) => (
									<SelectItem key={client.id} value={client.id}>
										{client.name}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
					<div className="grid grid-cols-2 gap-4">
						<div className="grid gap-2">
							<Label>Month</Label>
							<Select value={month} onValueChange={setMonth}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{months.map((m, i) => (
										<SelectItem key={i} value={i.toString()}>
											{m}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="grid gap-2">
							<Label>Year</Label>
							<Select value={year} onValueChange={setYear}>
								<SelectTrigger>
									<SelectValue />
								</SelectTrigger>
								<SelectContent>
									{[2024, 2025, 2026].map((y) => (
										<SelectItem key={y} value={y.toString()}>
											{y}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
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
					<Button
						onClick={handleGenerate}
						disabled={isLoading || !selectedClient}
					>
						{isLoading ? "Generating..." : "Generate Invoice"}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

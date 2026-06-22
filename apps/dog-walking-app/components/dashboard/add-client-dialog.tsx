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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface AddClientDialogProps {
	companyId: string;
}

export function AddClientDialog({ companyId }: AddClientDialogProps) {
	const [open, setOpen] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		const formData = new FormData(e.currentTarget);
		const supabase = createClient();

		const { error } = await supabase.from("clients").insert({
			company_id: companyId,
			name: formData.get("name") as string,
			email: (formData.get("email") as string) || null,
			phone: (formData.get("phone") as string) || null,
			address: (formData.get("address") as string) || null,
			dog_name: formData.get("dog_name") as string,
			dog_breed: (formData.get("dog_breed") as string) || null,
			dog_notes: (formData.get("dog_notes") as string) || null,
			walk_rate: parseFloat(formData.get("walk_rate") as string) || 25,
		});

		if (!error) {
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
					Add Client
				</Button>
			</DialogTrigger>
			<DialogContent className="max-h-[90vh] overflow-y-auto">
				<DialogHeader>
					<DialogTitle>Add New Client</DialogTitle>
					<DialogDescription>
						Add a new client and their dog to your business.
					</DialogDescription>
				</DialogHeader>
				<form onSubmit={handleSubmit}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-2">
							<Label htmlFor="name">Owner Name</Label>
							<Input id="name" name="name" placeholder="Jane Smith" required />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="email">Email</Label>
								<Input
									id="email"
									name="email"
									type="email"
									placeholder="jane@example.com"
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="phone">Phone</Label>
								<Input
									id="phone"
									name="phone"
									type="tel"
									placeholder="(555) 123-4567"
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="address">Address</Label>
							<Input
								id="address"
								name="address"
								placeholder="123 Main St, City, State"
							/>
						</div>
						<hr className="my-2" />
						<div className="grid grid-cols-2 gap-4">
							<div className="grid gap-2">
								<Label htmlFor="dog_name">Dog Name</Label>
								<Input
									id="dog_name"
									name="dog_name"
									placeholder="Buddy"
									required
								/>
							</div>
							<div className="grid gap-2">
								<Label htmlFor="dog_breed">Breed</Label>
								<Input
									id="dog_breed"
									name="dog_breed"
									placeholder="Golden Retriever"
								/>
							</div>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="dog_notes">Notes about the dog</Label>
							<Textarea
								id="dog_notes"
								name="dog_notes"
								placeholder="Any special instructions or notes..."
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="walk_rate">Rate per Walk ($)</Label>
							<Input
								id="walk_rate"
								name="walk_rate"
								type="number"
								step="0.01"
								defaultValue="25.00"
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
							{isLoading ? "Adding..." : "Add Client"}
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

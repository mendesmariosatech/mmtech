"use client";

import { Client } from "../lib/types";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import {
	MoreHorizontal,
	Mail,
	Phone,
	MapPin,
	DollarSign,
	Dog,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

interface ClientListProps {
	clients: Client[];
	onToggleActive: (clientId: string, isActive: boolean) => Promise<unknown>;
	onDeleteClient: (clientId: string) => Promise<unknown>;
}

export function ClientList({
	clients,
	onToggleActive,
	onDeleteClient,
}: ClientListProps) {
	const router = useRouter();

	const toggleActive = async (client: Client) => {
		await onToggleActive(client.id, client.is_active);
		router.refresh();
	};

	const deleteClient = async (id: string) => {
		await onDeleteClient(id);
		router.refresh();
	};

	if (clients.length === 0) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<p className="text-muted-foreground">No clients yet</p>
					<p className="text-sm text-muted-foreground">
						Add your first client to start scheduling walks
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
			{clients.map((client) => (
				<Card key={client.id}>
					<CardHeader className="flex flex-row items-start justify-between pb-2">
						<div>
							<CardTitle className="text-lg">{client.name}</CardTitle>
							<Badge
								variant={client.is_active ? "default" : "secondary"}
								className="mt-1"
							>
								{client.is_active ? "Active" : "Inactive"}
							</Badge>
						</div>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="ghost" size="icon">
									<MoreHorizontal className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent align="end">
								<DropdownMenuItem onClick={() => toggleActive(client)}>
									{client.is_active ? "Mark Inactive" : "Mark Active"}
								</DropdownMenuItem>
								<DropdownMenuItem
									onClick={() => deleteClient(client.id)}
									className="text-destructive"
								>
									Delete
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</CardHeader>
					<CardContent className="space-y-2 text-sm">
						<div className="flex items-center gap-2 rounded-md bg-secondary p-2">
							<Dog className="h-4 w-4 text-primary" />
							<div>
								<span className="font-medium">{client.dog_name}</span>
								{client.dog_breed && (
									<span className="text-muted-foreground">
										{" "}
										- {client.dog_breed}
									</span>
								)}
							</div>
						</div>
						{client.email && (
							<div className="flex items-center gap-2 text-muted-foreground">
								<Mail className="h-4 w-4" />
								<span>{client.email}</span>
							</div>
						)}
						{client.phone && (
							<div className="flex items-center gap-2 text-muted-foreground">
								<Phone className="h-4 w-4" />
								<span>{client.phone}</span>
							</div>
						)}
						{client.address && (
							<div className="flex items-center gap-2 text-muted-foreground">
								<MapPin className="h-4 w-4" />
								<span className="truncate">{client.address}</span>
							</div>
						)}
						<div className="flex items-center gap-2 font-medium text-primary">
							<DollarSign className="h-4 w-4" />
							<span>${client.walk_rate}/walk</span>
						</div>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

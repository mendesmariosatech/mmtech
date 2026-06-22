"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Play, Square, Dog, MapPin, Clock, FileText } from "lucide-react";
import {
	startWalk as startWalkAction,
	endWalk as endWalkAction,
} from "@/app/actions/dog-walking";
import { Walk, Client } from "@/lib/types";

interface WalkTrackerProps {
	employeeId: string;
	companyId: string;
	clients: Pick<Client, "id" | "name" | "dog_name" | "address" | "dog_notes">[];
	activeWalk:
		| (Walk & {
				client: Pick<
					Client,
					"name" | "dog_name" | "address" | "dog_notes"
				> | null;
		  })
		| null;
}

export function WalkTracker({
	employeeId,
	companyId,
	clients,
	activeWalk,
}: WalkTrackerProps) {
	const [selectedClient, setSelectedClient] = useState<string>("");
	const [currentWalk, setCurrentWalk] = useState<typeof activeWalk>(activeWalk);
	const [elapsedTime, setElapsedTime] = useState(0);
	const [notes, setNotes] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	// Timer effect
	useEffect(() => {
		if (currentWalk && currentWalk.status === "in_progress") {
			const startTime = new Date(currentWalk.started_at).getTime();

			const interval = setInterval(() => {
				const now = Date.now();
				setElapsedTime(Math.floor((now - startTime) / 1000));
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [currentWalk]);

	const formatTime = (seconds: number) => {
		const hrs = Math.floor(seconds / 3600);
		const mins = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;

		if (hrs > 0) {
			return `${hrs}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
		}
		return `${mins}:${secs.toString().padStart(2, "0")}`;
	};

	const startWalk = async () => {
		if (!selectedClient) return;
		setIsLoading(true);

		const walkData = await startWalkAction(
			companyId,
			employeeId,
			selectedClient,
		);
		if (walkData) {
			// eslint-disable-next-line @typescript-eslint/no-explicit-any
			setCurrentWalk(walkData as any);
			setElapsedTime(0);
		}
		setIsLoading(false);
	};

	const endWalk = async () => {
		if (!currentWalk) return;
		setIsLoading(true);

		await endWalkAction(
			currentWalk.id,
			currentWalk.started_at,
			notes || undefined,
		);

		setCurrentWalk(null);
		setNotes("");
		setElapsedTime(0);
		router.push("/employee");
	};

	const selectedClientData = clients.find((c) => c.id === selectedClient);

	if (currentWalk) {
		return (
			<div className="p-4">
				<Card className="border-primary">
					<CardHeader className="text-center pb-2">
						<div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
							<Dog className="h-8 w-8 text-primary" />
						</div>
						<CardTitle className="text-xl">
							Walking {currentWalk.client?.dog_name}
						</CardTitle>
						<p className="text-muted-foreground">{currentWalk.client?.name}</p>
					</CardHeader>
					<CardContent className="space-y-6">
						<div className="flex flex-col items-center">
							<Clock className="h-6 w-6 text-muted-foreground mb-2" />
							<div className="text-5xl font-mono font-bold text-primary">
								{formatTime(elapsedTime)}
							</div>
							<p className="text-sm text-muted-foreground mt-1">
								Walk Duration
							</p>
						</div>

						{currentWalk.client?.address && (
							<div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
								<MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
								<div>
									<p className="text-sm font-medium">Pickup Location</p>
									<p className="text-sm text-muted-foreground">
										{currentWalk.client.address}
									</p>
								</div>
							</div>
						)}

						{currentWalk.client?.dog_notes && (
							<div className="flex items-start gap-2 rounded-lg bg-accent/20 p-3">
								<FileText className="h-5 w-5 text-accent-foreground mt-0.5" />
								<div>
									<p className="text-sm font-medium">Notes</p>
									<p className="text-sm text-muted-foreground">
										{currentWalk.client.dog_notes}
									</p>
								</div>
							</div>
						)}

						<div className="space-y-2">
							<Label htmlFor="notes">Walk Notes (optional)</Label>
							<Textarea
								id="notes"
								placeholder="How did the walk go? Any issues or observations..."
								value={notes}
								onChange={(e) => setNotes(e.target.value)}
								className="min-h-[100px]"
							/>
						</div>

						<Button
							onClick={endWalk}
							disabled={isLoading}
							variant="destructive"
							size="lg"
							className="w-full h-14 text-lg"
						>
							<Square className="mr-2 h-5 w-5" />
							{isLoading ? "Ending..." : "End Walk"}
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}

	return (
		<div className="p-4">
			<h1 className="text-2xl font-bold mb-6">Start New Walk</h1>

			<Card>
				<CardContent className="pt-6 space-y-6">
					<div className="space-y-2">
						<Label>Select Dog</Label>
						<Select value={selectedClient} onValueChange={setSelectedClient}>
							<SelectTrigger className="h-14">
								<SelectValue placeholder="Choose a client's dog" />
							</SelectTrigger>
							<SelectContent>
								{clients.map((client) => (
									<SelectItem key={client.id} value={client.id}>
										<div className="flex items-center gap-2">
											<Dog className="h-4 w-4" />
											<span className="font-medium">{client.dog_name}</span>
											<span className="text-muted-foreground">
												- {client.name}
											</span>
										</div>
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>

					{selectedClientData && (
						<div className="space-y-3">
							{selectedClientData.address && (
								<div className="flex items-start gap-2 rounded-lg bg-secondary p-3">
									<MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
									<div>
										<p className="text-sm font-medium">Pickup Location</p>
										<p className="text-sm text-muted-foreground">
											{selectedClientData.address}
										</p>
									</div>
								</div>
							)}
							{selectedClientData.dog_notes && (
								<div className="flex items-start gap-2 rounded-lg bg-accent/20 p-3">
									<FileText className="h-5 w-5 text-accent-foreground mt-0.5" />
									<div>
										<p className="text-sm font-medium">Dog Notes</p>
										<p className="text-sm text-muted-foreground">
											{selectedClientData.dog_notes}
										</p>
									</div>
								</div>
							)}
						</div>
					)}

					<Button
						onClick={startWalk}
						disabled={!selectedClient || isLoading}
						size="lg"
						className="w-full h-14 text-lg"
					>
						<Play className="mr-2 h-5 w-5" />
						{isLoading ? "Starting..." : "Start Walk"}
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}

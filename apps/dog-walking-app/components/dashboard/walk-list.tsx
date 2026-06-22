"use client";

import { Walk } from "@/lib/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { formatDistanceToNow } from "date-fns";

interface WalkListProps {
	walks: Walk[];
}

const statusColors: Record<string, string> = {
	in_progress: "bg-yellow-100 text-yellow-800",
	completed: "bg-green-100 text-green-800",
	cancelled: "bg-red-100 text-red-800",
};

export function WalkList({ walks }: WalkListProps) {
	if (walks.length === 0) {
		return (
			<Card>
				<CardContent className="flex flex-col items-center justify-center py-12">
					<p className="text-muted-foreground">No walks recorded yet</p>
					<p className="text-sm text-muted-foreground">
						Walks will appear here once employees start logging them
					</p>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card>
			<CardContent className="p-0">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Dog</TableHead>
							<TableHead>Client</TableHead>
							<TableHead>Walker</TableHead>
							<TableHead>Date</TableHead>
							<TableHead>Duration</TableHead>
							<TableHead>Rate</TableHead>
							<TableHead>Status</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{walks.map((walk) => (
							<TableRow key={walk.id}>
								<TableCell className="font-medium">
									{walk.client?.dog_name}
								</TableCell>
								<TableCell>{walk.client?.name}</TableCell>
								<TableCell>{walk.employee?.name}</TableCell>
								<TableCell>
									{new Date(walk.started_at).toLocaleDateString()}
									<span className="block text-xs text-muted-foreground">
										{formatDistanceToNow(new Date(walk.started_at), {
											addSuffix: true,
										})}
									</span>
								</TableCell>
								<TableCell>
									{walk.duration_minutes ? `${walk.duration_minutes} min` : "-"}
								</TableCell>
								<TableCell>${walk.client?.walk_rate}</TableCell>
								<TableCell>
									<Badge
										className={statusColors[walk.status]}
										variant="outline"
									>
										{walk.status.replace("_", " ")}
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

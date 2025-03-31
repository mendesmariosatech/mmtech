import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { PlanGrid } from "./PlanGrid";

export function Plans() {
	return (
		<div className="container mx-auto p-4 max-w-4xl">
			<div className="mb-6">
				<Link href="/tasks">
					<Button variant="outline" className="mb-4">
						<ArrowLeft className="h-4 w-4 mr-2" />
						Back to Tasks
					</Button>
				</Link>
				<h1 className="text-3xl font-bold">Pre-set Plans</h1>
			</div>

			<div className="grid gap-4">
				<Card className="bg-blue-50">
					<CardContent className="p-4">
						<PlanGrid />
					</CardContent>
				</Card>

				<Card className="bg-blue-50">
					<CardContent className="p-4">
						<div className="text-center text-gray-500">
							Plan details and recommendations will appear here
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

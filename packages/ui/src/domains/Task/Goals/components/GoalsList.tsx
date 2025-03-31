"use client";

import { useState } from "react";
import { Progress } from "../../../../components/ui/progress";

interface Goal {
	id: string;
	name: string;
	progress: number;
	userId: string;
	userName: string;
}

export default function GoalProgressList() {
	const [goals, setGoals] = useState<Goal[]>([
		{
			id: "1",
			name: "Complete Project",
			progress: 70,
			userId: "1",
			userName: "Alex Johnson",
		},
		{
			id: "2",
			name: "Learn New Skill",
			progress: 70,
			userId: "2",
			userName: "Sam Smith",
		},
		{
			id: "3",
			name: "Exercise Routine",
			progress: 70,
			userId: "3",
			userName: "Jamie Williams",
		},
		{
			id: "4",
			name: "Read 10 Books",
			progress: 70,
			userId: "4",
			userName: "Taylor Brown",
		},
	]);

	return (
		<div className="space-y-4">
			{goals.map((goal) => (
				<div
					key={goal.id}
					className="p-4 bg-yellow-100 rounded-lg flex items-center gap-4"
				>
					<div className="h-6 w-6 rounded-full bg-green-200 flex-shrink-0"></div>
					<div className="flex-grow">
						<div className="flex justify-between items-center mb-1">
							<span className="font-medium">
								{goal.userName}: {goal.name}
							</span>
							<span className="font-bold text-blue-700">{goal.progress}%</span>
						</div>
						<Progress value={goal.progress} className="h-4 bg-yellow-200" />
					</div>
				</div>
			))}
		</div>
	);
}

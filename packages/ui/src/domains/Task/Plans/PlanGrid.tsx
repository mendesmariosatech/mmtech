"use client";

import { useState } from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { addTask } from "../lib/tasks";

interface Plan {
	id: string;
	name: string;
	description: string;
	tasks: {
		title: string;
		description: string;
		dueDate: Date;
	}[];
}

export function PlanGrid() {
	const router = useRouter();
	const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

	const plans: Plan[] = [
		{
			id: "plan-abc",
			name: "Plan ABC",
			description: "A productivity plan focused on daily habits",
			tasks: [
				{
					title: "Morning Routine",
					description: "Complete your morning routine checklist",
					dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
				},
				{
					title: "Work Planning",
					description: "Plan your work tasks for the day",
					dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
				},
			],
		},
		{
			id: "plan-123",
			name: "PLAN 123",
			description: "A fitness and wellness plan",
			tasks: [
				{
					title: "Morning Exercise",
					description: "30 minutes of cardio",
					dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
				},
				{
					title: "Meal Prep",
					description: "Prepare healthy meals for the week",
					dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
				},
			],
		},
		{
			id: "plan-xyz",
			name: "Plan ABC",
			description: "A learning and development plan",
			tasks: [
				{
					title: "Study Session",
					description: "1 hour of focused study",
					dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
				},
				{
					title: "Skill Practice",
					description: "Practice your new skill for 30 minutes",
					dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
				},
			],
		},
		{
			id: "plan-456",
			name: "PLAN 123",
			description: "A project management plan",
			tasks: [
				{
					title: "Project Planning",
					description: "Define project scope and timeline",
					dueDate: new Date(new Date().setDate(new Date().getDate() + 1)),
				},
				{
					title: "Team Meeting",
					description: "Conduct team meeting to assign tasks",
					dueDate: new Date(new Date().setDate(new Date().getDate() + 2)),
				},
			],
		},
	];

	const handleSelectPlan = (planId: string) => {
		setSelectedPlan(planId === selectedPlan ? null : planId);
	};

	const handleApplyPlan = () => {
		if (!selectedPlan) return;

		const plan = plans.find((p) => p.id === selectedPlan);
		if (!plan) return;

		// Add all tasks from the plan
		plan.tasks.forEach((task) => {
			addTask({
				title: task.title,
				description: task.description,
				dueDate: task.dueDate,
				completed: false,
			});
		});

		// Navigate back to the task list
		router.push("/");
	};

	return (
		<div className="space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				{plans.map((plan) => (
					<Card
						key={plan.id}
						className={`bg-yellow-100 cursor-pointer transition-all ${
							selectedPlan === plan.id ? "ring-2 ring-blue-500" : ""
						}`}
						onClick={() => handleSelectPlan(plan.id)}
					>
						<CardContent className="p-4 h-full flex flex-col">
							<div className="flex justify-between items-start mb-2">
								<h3 className="font-bold text-blue-700">{plan.name}</h3>
								{selectedPlan === plan.id && (
									<div className="bg-blue-500 text-white rounded-full p-1">
										<Check className="h-4 w-4" />
									</div>
								)}
							</div>
							<p className="text-sm text-gray-600 mb-2">{plan.description}</p>
							<div className="text-sm mt-auto">
								<span className="font-medium">{plan.tasks.length} tasks</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{selectedPlan && (
				<div className="flex justify-end mt-4">
					<Button onClick={handleApplyPlan}>Apply Selected Plan</Button>
				</div>
			)}
		</div>
	);
}

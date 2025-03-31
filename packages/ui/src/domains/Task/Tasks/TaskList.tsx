"use client";

import { useEffect, useState } from "react";
import type { Task } from "../lib/types";
import { getTasks } from "../lib/tasks";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Checkbox } from "../../../components/ui/checkbox";
import { Clock, Eye } from "lucide-react";
import Link from "next/link";
import { updateTask } from "../lib/tasks";
import { formatDate } from "@repo/ui/lib/utils";

export function TaskList() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const tasksData = getTasks();
				setTasks(tasksData);
			} catch (error) {
				console.error("Error fetching tasks:", error);
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();
	}, []);

	const handleToggleComplete = (task: Task) => {
		const updatedTask = { ...task, completed: !task.completed };
		updateTask(task.id, updatedTask);
		setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
	};

	if (loading) {
		return (
			<div className="flex justify-center items-center h-64">
				<p>Loading tasks...</p>
			</div>
		);
	}

	if (tasks.length === 0) {
		return (
			<div className="flex flex-col justify-center items-center h-64 text-center">
				<p className="text-muted-foreground mb-4">
					No tasks found. Create your first task or select a plan to get
					started!
				</p>
				<div className="flex gap-2">
					<Link href="/add">
						<Button>Create Task</Button>
					</Link>
					<Link href="/tasks/plans">
						<Button variant="outline">Choose a Plan</Button>
					</Link>
				</div>
			</div>
		);
	}

	return (
		<Card className="bg-blue-50">
			<CardContent className="p-4">
				<div className="space-y-4">
					{tasks.map((task) => (
						<div
							key={task.id}
							className="bg-yellow-100 rounded-lg hover:shadow-md transition-shadow"
						>
							<div className="p-4">
								<div className="flex items-start justify-between">
									<div className="flex items-start gap-2">
										<Checkbox
											id={`task-${task.id}`}
											checked={task.completed}
											onCheckedChange={() => handleToggleComplete(task)}
											className="mt-1"
										/>
										<div>
											<div
												className={`font-medium text-blue-700 ${task.completed ? "line-through text-blue-400" : ""}`}
											>
												{task.title}
											</div>
											{task.description && (
												<div className="mt-1 text-sm text-gray-600 line-clamp-2">
													{task.description}
												</div>
											)}
											<div className="text-xs text-gray-500 mt-1 flex items-center">
												<Clock className="h-3 w-3 mr-1" />
												<span>Due: {formatDate(task.dueDate)}</span>
											</div>
										</div>
									</div>
									<Link href={`/${task.id}`}>
										<Button variant="ghost" size="sm" className="h-8 w-8 p-0">
											<Eye className="h-4 w-4" />
											<span className="sr-only">View Details</span>
										</Button>
									</Link>
								</div>
							</div>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}

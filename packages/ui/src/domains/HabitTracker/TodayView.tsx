"use client";

import { Card } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { CheckCircle2, Circle, Calendar, Flame } from "lucide-react";
import { cn } from "../../lib/utils";
import styles from "./HabitTracker.module.css";

interface Habit {
	id: string;
	name: string;
	color: string;
	completions: { [date: string]: boolean };
	streak: number;
	totalCompletions: number;
}

interface TodayViewProps {
	habits: Habit[];
	onToggleCompletion: (habitId: string, date: string) => void;
}

export function TodayView({ habits, onToggleCompletion }: TodayViewProps) {
	const today = new Date().toISOString().split("T")[0];
	const todayFormatted = new Date().toLocaleDateString("en-US", {
		weekday: "long",
		month: "long",
		day: "numeric",
	});

	const completedToday = habits.filter((habit) => habit.completions[today]).length;
	const totalHabits = habits.length;
	const completionRate = totalHabits > 0 ? Math.round((completedToday / totalHabits) * 100) : 0;

	return (
		<div className="space-y-6">
			<Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className={`p-2 rounded-lg bg-primary/20 ${styles["glow-effect"]}`}>
							<Calendar className="h-6 w-6 text-primary" />
						</div>
						<div>
							<h2 className={`text-xl font-bold font-heading ${styles["neon-text"]}`}>Today&apos;s Focus</h2>
							<p className="text-sm text-muted-foreground">{todayFormatted}</p>
						</div>
					</div>
					<div className="text-right">
						<div className={`text-2xl font-bold font-heading ${styles["neon-text"]}`}>
							{completedToday}/{totalHabits}
						</div>
						<div className="text-sm text-muted-foreground">{completionRate}% complete</div>
					</div>
				</div>
			</Card>

			<div className="grid gap-4">
				{habits.map((habit) => {
					const isCompleted = habit.completions[today];

					return (
						<Card key={habit.id} className="p-4 bg-card/50 border-border/50 backdrop-blur-sm">
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-4">
									<Button
										variant="ghost"
										size="sm"
										onClick={() => onToggleCompletion(habit.id, today)}
										className={cn(
											"p-2 rounded-full transition-all duration-200",
											isCompleted
												? `text-green-500 hover:text-green-400 ${styles["glow-effect"]}`
												: "text-muted-foreground hover:text-foreground",
										)}
									>
										{isCompleted ? <CheckCircle2 className="h-6 w-6" /> : <Circle className="h-6 w-6" />}
									</Button>

									<div className="flex items-center gap-3">
										<div
											className={`w-3 h-3 rounded-full ${styles["glow-effect"]}`}
											style={{ backgroundColor: habit.color }}
										/>
										<span
											className={cn(
												"font-medium transition-all duration-200",
												isCompleted && "line-through text-muted-foreground",
											)}
										>
											{habit.name}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-4 text-sm text-muted-foreground">
									<div className="flex items-center gap-1">
										<Flame className="h-4 w-4 text-orange-500" />
										<span>{habit.streak}</span>
									</div>
									<div className="text-xs px-2 py-1 rounded-full bg-secondary/50">{habit.totalCompletions} total</div>
								</div>
							</div>
						</Card>
					);
				})}
			</div>

			<Card className="p-4 bg-card/50 border-border/50 backdrop-blur-sm">
				<div className="space-y-2">
					<div className="flex justify-between text-sm">
						<span className="text-muted-foreground">Daily Progress</span>
						<span className="font-medium">{completionRate}%</span>
					</div>
					<div className="w-full bg-secondary/30 rounded-full h-2">
						<div
							className={`bg-primary h-2 rounded-full transition-all duration-500 ${styles["glow-effect"]}`}
							style={{ width: `${completionRate}%` }}
						/>
					</div>
				</div>
			</Card>
		</div>
	);
}

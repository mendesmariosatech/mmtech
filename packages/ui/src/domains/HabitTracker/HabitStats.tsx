"use client";

import { Card } from "../../components/ui/card";
import { TrendingUp, Target, Zap, Calendar } from "lucide-react";
import styles from "./HabitTracker.module.css";

interface Habit {
	id: string;
	name: string;
	color: string;
	completions: { [date: string]: boolean };
	streak: number;
	totalCompletions: number;
}

interface HabitStatsProps {
	habits: Habit[];
}

export function HabitStats({ habits }: HabitStatsProps) {
	const totalHabits = habits.length;
	const totalCompletions = habits.reduce(
		(sum, habit) => sum + habit.totalCompletions,
		0,
	);
	const longestStreak = Math.max(...habits.map((h) => h.streak), 0);

	const today = new Date().toISOString().split("T")[0]!;
	const completedToday = habits.filter((h) => h.completions[today]).length;

	const stats = [
		{
			label: "Total Habits",
			value: totalHabits,
			icon: Target,
			color: "text-blue-500",
		},
		{
			label: "Completed Today",
			value: `${completedToday}/${totalHabits}`,
			icon: Calendar,
			color: "text-green-500",
		},
		{
			label: "Longest Streak",
			value: longestStreak,
			icon: Zap,
			color: "text-orange-500",
		},
		{
			label: "Total Completions",
			value: totalCompletions,
			icon: TrendingUp,
			color: "text-purple-500",
		},
	];

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
			{stats.map((stat, index) => (
				<Card
					key={index}
					className="p-4 bg-card/50 border-border/50 backdrop-blur-sm"
				>
					<div className="flex items-center gap-3">
						<div
							className={`p-2 rounded-lg bg-primary/10 ${styles["glow-effect"]}`}
						>
							<stat.icon className={`h-5 w-5 ${stat.color}`} />
						</div>
						<div>
							<p
								className={`text-2xl font-bold font-heading ${styles["neon-text"]}`}
							>
								{stat.value}
							</p>
							<p className="text-xs text-muted-foreground">{stat.label}</p>
						</div>
					</div>
				</Card>
			))}
		</div>
	);
}

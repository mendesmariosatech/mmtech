"use client";

import { useState } from "react";
import { Card } from "../../components/ui/card";
import { BarChart3, Calendar, TrendingUp } from "lucide-react";
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

interface CombinedGridProps {
	habits: Habit[];
	onToggleCompletion: (habitId: string, date: string) => void;
}

export function CombinedGrid({ habits, onToggleCompletion }: CombinedGridProps) {
	const [hoveredDate, setHoveredDate] = useState<string | null>(null);

	const generateDates = () => {
		const dates = [];
		const today = new Date();

		for (let i = 364; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			dates.push(date.toISOString().split("T")[0]);
		}

		return dates;
	};

	const dates = generateDates();
	const weeks: string[][] = [];

	for (let i = 0; i < dates.length; i += 7) {
		weeks.push(dates.slice(i, i + 7));
	}

	const getCombinedIntensity = (date: string) => {
		const completedCount = habits.filter((habit) => habit.completions[date]).length;
		const totalHabits = habits.length;

		if (totalHabits === 0) return 0;
		return completedCount / totalHabits;
	};

	const getIntensityColor = (intensity: number) => {
		if (intensity === 0) return "bg-secondary/30 border-border/30";
		if (intensity <= 0.25) return "bg-primary/20 border-primary/30";
		if (intensity <= 0.5) return "bg-primary/40 border-primary/50";
		if (intensity <= 0.75) return "bg-primary/60 border-primary/70";
		return `bg-primary border-primary ${styles["glow-effect"]}`;
	};

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	};

	const getHoveredDateInfo = (date: string) => {
		const completedHabits = habits.filter((habit) => habit.completions[date]);
		return {
			completed: completedHabits.length,
			total: habits.length,
			habits: completedHabits.map((h) => h.name),
		};
	};

	const totalPossibleCompletions = dates.length * habits.length;
	const totalActualCompletions = dates.reduce((sum, date) => {
		return sum + habits.filter((habit) => habit.completions[date]).length;
	}, 0);
	const overallCompletionRate =
		totalPossibleCompletions > 0 ? Math.round((totalActualCompletions / totalPossibleCompletions) * 100) : 0;

	return (
		<Card className="p-6 bg-card/50 border-border/50 backdrop-blur-sm">
			<div className="space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className={`p-2 rounded-lg bg-primary/20 ${styles["glow-effect"]}`}>
							<BarChart3 className="h-6 w-6 text-primary" />
						</div>
						<div>
							<h3 className={`text-lg font-semibold font-heading ${styles["neon-text"]}`}>Combined Progress</h3>
							<p className="text-sm text-muted-foreground">All habits combined over time</p>
						</div>
					</div>
					<div className="flex items-center gap-4 text-sm text-muted-foreground">
						<div className="flex items-center gap-2">
							<TrendingUp className="h-4 w-4 text-green-500" />
							<span>{overallCompletionRate}% completion rate</span>
						</div>
						<div className="flex items-center gap-2">
							<Calendar className="h-4 w-4 text-blue-500" />
							<span>{totalActualCompletions} total completions</span>
						</div>
					</div>
				</div>

				<div className="relative">
					<div className="flex gap-1 overflow-x-auto pb-2">
						{weeks.map((week, weekIndex) => (
							<div key={weekIndex} className="flex flex-col gap-1">
								{week.map((date) => {
									const intensity = getCombinedIntensity(date);
									const isToday = date === new Date().toISOString().split("T")[0];

									return (
										<button
											key={date}
											onClick={() => {
												habits.forEach((habit) => {
													if (!habit.completions[date]) {
														onToggleCompletion(habit.id, date);
													}
												});
											}}
											onMouseEnter={() => setHoveredDate(date)}
											onMouseLeave={() => setHoveredDate(null)}
											className={cn(
												"w-3 h-3 rounded-sm border transition-all duration-200 hover:scale-125",
												getIntensityColor(intensity),
												isToday && "ring-2 ring-primary/50",
											)}
										/>
									);
								})}
							</div>
						))}
					</div>

					{hoveredDate && (
						<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-popover border border-border rounded-lg text-xs whitespace-nowrap z-10 max-w-xs">
							<div className="font-medium">{formatDate(hoveredDate)}</div>
							<div className="text-muted-foreground">
								{(() => {
									const info = getHoveredDateInfo(hoveredDate);
									return `${info.completed}/${info.total} habits completed`;
								})()}
							</div>
							{(() => {
								const info = getHoveredDateInfo(hoveredDate);
								return (
									info.habits.length > 0 && (
										<div className="mt-1 text-xs text-primary">{info.habits.join(", ")}</div>
									)
								);
							})()}
						</div>
					)}
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center gap-2 text-xs text-muted-foreground">
						<span>Less</span>
						<div className="flex gap-1">
							<div className="w-2 h-2 rounded-sm bg-secondary/30 border border-border/30" />
							<div className="w-2 h-2 rounded-sm bg-primary/20 border border-primary/30" />
							<div className="w-2 h-2 rounded-sm bg-primary/40 border border-primary/50" />
							<div className="w-2 h-2 rounded-sm bg-primary/60 border border-primary/70" />
							<div className={`w-2 h-2 rounded-sm bg-primary border-primary ${styles["glow-effect"]}`} />
						</div>
						<span>More</span>
					</div>

					<div className="flex items-center gap-3">
						{habits.slice(0, 5).map((habit) => (
							<div key={habit.id} className="flex items-center gap-1">
								<div
									className={`w-2 h-2 rounded-full ${styles["glow-effect"]}`}
									style={{ backgroundColor: habit.color }}
								/>
								<span className="text-xs text-muted-foreground">{habit.name}</span>
							</div>
						))}
						{habits.length > 5 && (
							<span className="text-xs text-muted-foreground">+{habits.length - 5} more</span>
						)}
					</div>
				</div>
			</div>
		</Card>
	);
}

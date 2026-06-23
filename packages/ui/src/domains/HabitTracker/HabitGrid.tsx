"use client";

import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Trash2, Flame, Calendar } from "lucide-react";
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

interface HabitGridProps {
	habit: Habit;
	onToggleCompletion: (habitId: string, date: string) => void;
	onDelete: (habitId: string) => void;
	currentDate?: Date;
}

export function HabitGrid({
	habit,
	onToggleCompletion,
	onDelete,
	currentDate,
}: HabitGridProps) {
	const [hoveredDate, setHoveredDate] = useState<string | null>(null);

	const generateDates = () => {
		const dates = [];
		const today = currentDate ?? new Date();

		for (let i = 364; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			dates.push(date.toISOString().split("T")[0]!);
		}

		return dates;
	};

	const dates = generateDates();
	const todayStr = (currentDate ?? new Date()).toISOString().split("T")[0]!;
	const weeks: string[][] = [];

	for (let i = 0; i < dates.length; i += 7) {
		weeks.push(dates.slice(i, i + 7));
	}

	const formatDate = (dateStr: string) => {
		const date = new Date(dateStr);
		return date.toLocaleDateString("en-US", {
			weekday: "short",
			month: "short",
			day: "numeric",
		});
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-3">
					<div
						className={`w-4 h-4 rounded-full ${styles["glow-effect"]}`}
						style={{ backgroundColor: habit.color }}
					/>
					<h3 className="text-lg font-semibold font-heading">{habit.name}</h3>
				</div>
				<div className="flex items-center gap-4">
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Flame className="h-4 w-4 text-orange-500" />
						<span>{habit.streak} day streak</span>
					</div>
					<div className="flex items-center gap-2 text-sm text-muted-foreground">
						<Calendar className="h-4 w-4 text-blue-500" />
						<span>{habit.totalCompletions} total</span>
					</div>
					<Button
						variant="ghost"
						size="sm"
						onClick={() => onDelete(habit.id)}
						className="text-destructive hover:text-destructive hover:bg-destructive/10"
					>
						<Trash2 className="h-4 w-4" />
					</Button>
				</div>
			</div>

			<div className="relative">
				<div className="flex gap-1 overflow-x-auto pb-2">
					{weeks.map((week, weekIndex) => (
						<div key={weekIndex} className="flex flex-col gap-1">
							{week.map((date) => {
								const isCompleted = habit.completions[date];
								const isToday = date === todayStr;

								return (
									<button
										key={date}
										onClick={() => onToggleCompletion(habit.id, date)}
										onMouseEnter={() => setHoveredDate(date)}
										onMouseLeave={() => setHoveredDate(null)}
										className={cn(
											"w-3 h-3 rounded-sm border transition-all duration-200 hover:scale-125",
											isCompleted
												? `border-transparent ${styles["glow-effect"]}`
												: "border-border/30 bg-secondary/30 hover:bg-secondary/50",
											isToday && "ring-2 ring-primary/50",
										)}
										style={{
											backgroundColor: isCompleted ? habit.color : undefined,
											boxShadow: isCompleted
												? `0 0 10px ${habit.color}40`
												: undefined,
										}}
									/>
								);
							})}
						</div>
					))}
				</div>

				{hoveredDate && (
					<div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-popover border border-border rounded text-xs whitespace-nowrap z-10">
						{formatDate(hoveredDate)} -{" "}
						{habit.completions[hoveredDate] ? "Completed" : "Not completed"}
					</div>
				)}
			</div>

			<div className="flex items-center gap-2 text-xs text-muted-foreground">
				<span>Less</span>
				<div className="flex gap-1">
					<div className="w-2 h-2 rounded-sm bg-secondary/30 border border-border/30" />
					<div className="w-2 h-2 rounded-sm bg-secondary/50 border border-border/30" />
					<div
						className={`w-2 h-2 rounded-sm border-transparent ${styles["glow-effect"]}`}
						style={{ backgroundColor: habit.color }}
					/>
				</div>
				<span>More</span>
			</div>
		</div>
	);
}

"use client";

import { useState, useEffect } from "react";
import { Button } from "../../components/ui/button";
import { Card } from "../../components/ui/card";
import { Plus, Zap, Target, Calendar, BarChart3 } from "lucide-react";
import { HabitGrid } from "./HabitGrid";
import { HabitStats } from "./HabitStats";
import { AddHabitDialog } from "./AddHabitDialog";
import { TodayView } from "./TodayView";
import { CombinedGrid } from "./CombinedGrid";
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

type ViewMode = "today" | "combined" | "individual";

export const HabitTracker = () => {
	const [habits, setHabits] = useState<Habit[]>([]);
	const [showAddDialog, setShowAddDialog] = useState(false);
	const [viewMode, setViewMode] = useState<ViewMode>("today");

	useEffect(() => {
		const savedHabits = localStorage.getItem("habitstack-habits");
		if (savedHabits) {
			setHabits(JSON.parse(savedHabits));
		}
	}, []);

	useEffect(() => {
		localStorage.setItem("habitstack-habits", JSON.stringify(habits));
	}, [habits]);

	const addHabit = (name: string, color: string) => {
		const newHabit: Habit = {
			id: Date.now().toString(),
			name,
			color,
			completions: {},
			streak: 0,
			totalCompletions: 0,
		};
		setHabits([...habits, newHabit]);
	};

	const toggleHabitCompletion = (habitId: string, date: string) => {
		setHabits(
			habits.map((habit) => {
				if (habit.id === habitId) {
					const newCompletions = { ...habit.completions };
					const wasCompleted = newCompletions[date];

					if (wasCompleted) {
						delete newCompletions[date];
					} else {
						newCompletions[date] = true;
					}

					const totalCompletions = Object.keys(newCompletions).length;
					const streak = calculateStreak(newCompletions);

					return {
						...habit,
						completions: newCompletions,
						totalCompletions,
						streak,
					};
				}
				return habit;
			}),
		);
	};

	const calculateStreak = (completions: { [date: string]: boolean }): number => {
		const today = new Date();
		let streak = 0;

		for (let i = 0; i < 365; i++) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			const dateStr = date.toISOString().split("T")[0];

			if (completions[dateStr]) {
				streak++;
			} else if (i > 0) {
				break;
			}
		}

		return streak;
	};

	const deleteHabit = (habitId: string) => {
		setHabits(habits.filter((habit) => habit.id !== habitId));
	};

	return (
		<div className="min-h-screen bg-background">
			<header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className={`p-2 rounded-lg bg-primary/20 ${styles["glow-effect"]}`}>
								<Zap className="h-6 w-6 text-primary" />
							</div>
							<div>
								<h1 className={`text-2xl font-bold font-heading ${styles["neon-text"]}`}>HabitStack</h1>
								<p className="text-sm text-muted-foreground">Stack Your Success</p>
							</div>
						</div>
						<div className="flex items-center gap-3">
							{habits.length > 0 && (
								<div className="flex items-center gap-1 p-1 bg-secondary/30 rounded-lg">
									<Button
										variant={viewMode === "today" ? "default" : "ghost"}
										size="sm"
										onClick={() => setViewMode("today")}
										className={cn(
											"h-8 px-3",
											viewMode === "today" && `bg-primary hover:bg-primary/90 ${styles["glow-effect"]}`,
										)}
									>
										<Calendar className="h-4 w-4 mr-1" />
										Today
									</Button>
									<Button
										variant={viewMode === "combined" ? "default" : "ghost"}
										size="sm"
										onClick={() => setViewMode("combined")}
										className={cn(
											"h-8 px-3",
											viewMode === "combined" && `bg-primary hover:bg-primary/90 ${styles["glow-effect"]}`,
										)}
									>
										<BarChart3 className="h-4 w-4 mr-1" />
										Combined
									</Button>
									<Button
										variant={viewMode === "individual" ? "default" : "ghost"}
										size="sm"
										onClick={() => setViewMode("individual")}
										className={cn(
											"h-8 px-3",
											viewMode === "individual" && `bg-primary hover:bg-primary/90 ${styles["glow-effect"]}`,
										)}
									>
										Individual
									</Button>
								</div>
							)}
							<Button
								onClick={() => setShowAddDialog(true)}
								className={`bg-primary hover:bg-primary/90 ${styles["glow-effect"]}`}
							>
								<Plus className="h-4 w-4 mr-2" />
								Add Habit
							</Button>
						</div>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				{habits.length === 0 ? (
					<div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
						<div className={`p-4 rounded-full bg-primary/10 mb-6 ${styles["glow-effect"]}`}>
							<Target className="h-12 w-12 text-primary" />
						</div>
						<h2 className={`text-2xl font-bold font-heading mb-2 ${styles["neon-text"]}`}>
							Build Your Habit Stack
						</h2>
						<p className="text-muted-foreground mb-6 max-w-md">
							Start your journey to mastery. Each dot tells a story of progress and dedication.
						</p>
						<Button
							onClick={() => setShowAddDialog(true)}
							size="lg"
							className={`bg-primary hover:bg-primary/90 ${styles["glow-effect"]}`}
						>
							<Plus className="h-5 w-5 mr-2" />
							Create Your First Habit
						</Button>
					</div>
				) : (
					<div className="space-y-8">
						<HabitStats habits={habits} />

						{viewMode === "today" && (
							<TodayView habits={habits} onToggleCompletion={toggleHabitCompletion} />
						)}

						{viewMode === "combined" && (
							<CombinedGrid habits={habits} onToggleCompletion={toggleHabitCompletion} />
						)}

						{viewMode === "individual" && (
							<div className="space-y-6">
								{habits.map((habit) => (
									<Card key={habit.id} className="p-6 bg-card/50 border-border/50 backdrop-blur-sm">
										<HabitGrid
											habit={habit}
											onToggleCompletion={toggleHabitCompletion}
											onDelete={deleteHabit}
										/>
									</Card>
								))}
							</div>
						)}
					</div>
				)}
			</main>

			<AddHabitDialog
				open={showAddDialog}
				onOpenChange={setShowAddDialog}
				onAddHabit={addHabit}
			/>
		</div>
	);
};

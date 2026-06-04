"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Clock, DollarSign, Plus, Minus, Save } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimeEntry {
	id: string;
	activity: string;
	minutes: number;
	cost: number;
}

export default function TimeSpendingApp() {
	const DAILY_BUDGET = 86400; // seconds in a day
	const [entries, setEntries] = useState<TimeEntry[]>([]);
	const [newActivity, setNewActivity] = useState("");
	const [newMinutes, setNewMinutes] = useState(0);
	const [timeLeft, setTimeLeft] = useState(DAILY_BUDGET);
	const [lastReset, setLastReset] = useState<string>("");

	// Calculate cost per second (1 dollar per second)
	const calculateCost = (minutes: number) => minutes * 60;

	// Calculate total spent
	const totalSpent = entries.reduce((sum, entry) => sum + entry.cost, 0);
	const totalMinutes = entries.reduce((sum, entry) => sum + entry.minutes, 0);
	const remainingBudget = DAILY_BUDGET - totalSpent;
	const progressPercent = (totalSpent / DAILY_BUDGET) * 100;

	// Load data from localStorage
	useEffect(() => {
		const savedData = localStorage.getItem("time-spending-data");
		const today = new Date().toDateString();

		if (savedData) {
			const data = JSON.parse(savedData);

			// Check if we need to reset for a new day
			if (data.date !== today) {
				// New day - reset everything
				setEntries([]);
				setTimeLeft(DAILY_BUDGET);
				setLastReset(today);
				// Save reset state
				localStorage.setItem(
					"time-spending-data",
					JSON.stringify({
						entries: [],
						date: today,
					}),
				);
			} else {
				// Same day - restore data
				setEntries(data.entries || []);
				setLastReset(data.date);
			}
		} else {
			// First time - initialize
			setLastReset(today);
			localStorage.setItem(
				"time-spending-data",
				JSON.stringify({
					entries: [],
					date: today,
				}),
			);
		}
	}, []);

	// Save to localStorage whenever entries change
	useEffect(() => {
		if (lastReset) {
			localStorage.setItem(
				"time-spending-data",
				JSON.stringify({
					entries,
					date: lastReset,
				}),
			);
		}
	}, [entries, lastReset]);

	const addEntry = () => {
		if (newActivity.trim() && newMinutes > 0) {
			const cost = calculateCost(newMinutes);

			// Check if we have enough budget
			if (cost <= remainingBudget) {
				const entry: TimeEntry = {
					id: Date.now().toString(),
					activity: newActivity,
					minutes: newMinutes,
					cost,
				};
				setEntries([...entries, entry]);
				setNewActivity("");
				setNewMinutes(0);
			} else {
				alert(
					`Not enough time budget! You only have ${Math.floor(remainingBudget / 60)} minutes left.`,
				);
			}
		}
	};

	const removeEntry = (id: string) => {
		setEntries(entries.filter((entry) => entry.id !== id));
	};

	const formatTime = (seconds: number) => {
		const hours = Math.floor(seconds / 3600);
		const minutes = Math.floor((seconds % 3600) / 60);
		const secs = seconds % 60;
		return `${hours}h ${minutes}m ${secs}s`;
	};

	return (
		<div className="min-h-screen bg-background cyberpunk-grid">
			<header className="border-b border-border/50 bg-card/50 backdrop-blur-sm">
				<div className="container mx-auto px-4 py-6">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-3">
							<div className="p-2 rounded-lg bg-primary/20 glow-effect">
								<Clock className="h-6 w-6 text-primary" />
							</div>
							<div>
								<h1 className="text-2xl font-bold neon-text">TimeSpend</h1>
								<p className="text-sm text-muted-foreground">
									86,400 seconds daily budget
								</p>
							</div>
						</div>
						<div className="text-right">
							<div className="text-lg font-bold text-primary neon-text">
								${remainingBudget.toLocaleString()}
							</div>
							<div className="text-sm text-muted-foreground">
								{formatTime(remainingBudget)} remaining
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-8">
				<div className="grid gap-6 md:grid-cols-2">
					{/* Budget Overview */}
					<Card className="bg-card/50 border-border/50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle className="flex items-center gap-2">
								<DollarSign className="h-5 w-5 text-primary" />
								Daily Budget
							</CardTitle>
							<CardDescription>
								Track how you spend your 24 hours
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<div className="flex justify-between text-sm">
									<span>Spent: ${totalSpent.toLocaleString()}</span>
									<span>{progressPercent.toFixed(1)}%</span>
								</div>
								<Progress value={progressPercent} className="h-3 glow-effect" />
							</div>
							<div className="grid grid-cols-2 gap-4 text-center">
								<div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
									<div className="text-lg font-bold text-primary">
										{Math.floor(totalMinutes / 60)}h {totalMinutes % 60}m
									</div>
									<div className="text-xs text-muted-foreground">
										Time Spent
									</div>
								</div>
								<div className="p-3 rounded-lg bg-secondary/10 border border-secondary/20">
									<div className="text-lg font-bold">
										{Math.floor(remainingBudget / 3600)}h{" "}
										{Math.floor((remainingBudget % 3600) / 60)}m
									</div>
									<div className="text-xs text-muted-foreground">Remaining</div>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Add Entry */}
					<Card className="bg-card/50 border-border/50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Log Time Spent</CardTitle>
							<CardDescription>
								What did you spend your time on?
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-2">
								<label className="text-sm font-medium">Activity</label>
								<input
									type="text"
									value={newActivity}
									onChange={(e) => setNewActivity(e.target.value)}
									placeholder="What did you do?"
									className="w-full px-3 py-2 bg-background border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
								/>
							</div>
							<div className="space-y-2">
								<label className="text-sm font-medium">Time (minutes)</label>
								<div className="flex items-center gap-2">
									<Button
										variant="outline"
										size="icon"
										onClick={() => setNewMinutes(Math.max(0, newMinutes - 5))}
									>
										<Minus className="h-4 w-4" />
									</Button>
									<input
										type="number"
										value={newMinutes}
										onChange={(e) =>
											setNewMinutes(Math.max(0, parseInt(e.target.value) || 0))
										}
										min="0"
										className="flex-1 px-3 py-2 bg-background border border-border rounded-md text-center focus:outline-none focus:ring-2 focus:ring-primary/50"
									/>
									<Button
										variant="outline"
										size="icon"
										onClick={() => setNewMinutes(newMinutes + 5)}
									>
										<Plus className="h-4 w-4" />
									</Button>
								</div>
								{newMinutes > 0 && (
									<div className="text-sm text-muted-foreground text-center">
										Cost: ${calculateCost(newMinutes).toLocaleString()}
									</div>
								)}
							</div>
							<Button
								onClick={addEntry}
								disabled={
									!newActivity.trim() ||
									newMinutes <= 0 ||
									calculateCost(newMinutes) > remainingBudget
								}
								className="w-full glow-effect"
							>
								<Save className="h-4 w-4 mr-2" />
								Log Activity
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Entries List */}
				{entries.length > 0 && (
					<Card className="mt-6 bg-card/50 border-border/50 backdrop-blur-sm">
						<CardHeader>
							<CardTitle>Today's Activities</CardTitle>
							<CardDescription>
								How you've spent your time today
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-3">
								{entries.map((entry) => (
									<div
										key={entry.id}
										className="flex items-center justify-between p-3 rounded-lg bg-background/50 border border-border/50"
									>
										<div className="flex-1">
											<div className="font-medium">{entry.activity}</div>
											<div className="text-sm text-muted-foreground">
												{entry.minutes} min • ${entry.cost.toLocaleString()}
											</div>
										</div>
										<Button
											variant="ghost"
											size="sm"
											onClick={() => removeEntry(entry.id)}
											className="text-destructive hover:text-destructive"
										>
											×
										</Button>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				)}
			</main>
		</div>
	);
}

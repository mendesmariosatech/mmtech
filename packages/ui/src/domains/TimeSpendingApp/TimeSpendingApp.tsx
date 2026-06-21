"use client";

import { useState, useEffect } from "react";
import {
	Plus,
	Trash2,
	Clock,
	DollarSign,
	Zap,
	Target,
	Calendar,
} from "lucide-react";
import { Button } from "../../components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../../components/ui/card";
import { Progress } from "../../components/ui/progress";

interface TimeActivity {
	id: string;
	activity: string;
	minutes: number;
	cost: number;
	timestamp: string;
}

const DAILY_BUDGET = 86400;
const COST_PER_MINUTE = 60;

export const TimeSpendingApp = () => {
	const [activities, setActivities] = useState<TimeActivity[]>([]);
	const [newActivity, setNewActivity] = useState("");
	const [minutes, setMinutes] = useState<number>(0);
	const [totalSpent, setTotalSpent] = useState(0);
	const [currentDate, setCurrentDate] = useState("");

	useEffect(() => {
		const today = new Date().toDateString();
		setCurrentDate(today);

		const stored = localStorage.getItem(`time-spending-${today}`);
		if (stored) {
			const data = JSON.parse(stored);
			setActivities(data.activities || []);
			setTotalSpent(data.totalSpent || 0);
		}
	}, []);

	useEffect(() => {
		const today = new Date().toDateString();
		const data = { activities, totalSpent };
		localStorage.setItem(`time-spending-${today}`, JSON.stringify(data));
	}, [activities, totalSpent]);

	useEffect(() => {
		const total = activities.reduce((sum, activity) => sum + activity.cost, 0);
		setTotalSpent(total);
	}, [activities]);

	const addActivity = () => {
		if (!newActivity.trim() || minutes <= 0) return;

		const cost = minutes * COST_PER_MINUTE;
		const activity: TimeActivity = {
			id: Date.now().toString(),
			activity: newActivity.trim(),
			minutes,
			cost,
			timestamp: new Date().toLocaleTimeString(),
		};

		setActivities([...activities, activity]);
		setNewActivity("");
		setMinutes(0);
	};

	const removeActivity = (id: string) => {
		setActivities(activities.filter((activity) => activity.id !== id));
	};

	const remainingBudget = DAILY_BUDGET - totalSpent;
	const budgetPercentage = (totalSpent / DAILY_BUDGET) * 100;
	const remainingMinutes = Math.floor(remainingBudget / COST_PER_MINUTE);

	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	};

	const formatTime = (mins: number) => {
		const hours = Math.floor(mins / 60);
		const m = mins % 60;
		return hours > 0 ? `${hours}h ${m}m` : `${m}m`;
	};

	return (
		<div className="min-h-screen p-4 space-y-6">
			<div className="text-center space-y-2">
				<h1 className="text-4xl font-bold cyber-text mb-2">
					TIME SPENDING TRACKER
				</h1>
				<p className="text-muted-foreground text-lg">
					Every minute costs $60 from your daily $86,400 budget
				</p>
				<div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
					<Calendar className="w-4 h-4" />
					<span>{currentDate}</span>
				</div>
			</div>

			<div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
				<Card className="cyber-border bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Target className="w-5 h-5 text-cyan-400" />
							<span className="neon-text">Daily Budget</span>
						</CardTitle>
						<CardDescription>Your financial time allocation</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<div className="flex justify-between text-sm">
								<span>Progress</span>
								<span>{budgetPercentage.toFixed(1)}%</span>
							</div>
							<Progress
								value={budgetPercentage}
								className="cyber-glow"
								style={{
									background:
										"linear-gradient(90deg, rgba(0,255,255,0.1) 0%, rgba(255,0,128,0.1) 100%)",
								}}
							/>
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="text-center p-3 rounded-lg cyber-border bg-background/20">
								<div className="text-2xl font-bold neon-text">
									{formatCurrency(DAILY_BUDGET)}
								</div>
								<div className="text-xs text-muted-foreground">Total Budget</div>
							</div>
							<div className="text-center p-3 rounded-lg cyber-border bg-background/20">
								<div className="text-2xl font-bold spent-text">
									{formatCurrency(totalSpent)}
								</div>
								<div className="text-xs text-muted-foreground">Spent</div>
							</div>
						</div>
						<div className="text-center p-3 rounded-lg cyber-border bg-background/20">
							<div className="text-xl font-bold text-green-400">
								{formatCurrency(remainingBudget)}
							</div>
							<div className="text-xs text-muted-foreground">
								Remaining ({remainingMinutes} minutes)
							</div>
						</div>
					</CardContent>
				</Card>

				<Card className="cyber-border bg-card/50 backdrop-blur-sm">
					<CardHeader>
						<CardTitle className="flex items-center gap-2">
							<Plus className="w-5 h-5 text-cyan-400" />
							<span className="neon-text">Log Time Activity</span>
						</CardTitle>
						<CardDescription>
							Record how you spend your time budget
						</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<label className="text-sm font-medium">Activity</label>
							<input
								type="text"
								placeholder="What did you do?"
								value={newActivity}
								onChange={(e) => setNewActivity(e.target.value)}
								className="w-full p-3 rounded-lg bg-background/50 border border-cyan-400/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
								onKeyDown={(e) => e.key === "Enter" && addActivity()}
							/>
						</div>
						<div className="space-y-2">
							<label className="text-sm font-medium">Duration (minutes)</label>
							<input
								type="number"
								placeholder="0"
								value={minutes || ""}
								onChange={(e) => setMinutes(Number(e.target.value))}
								className="w-full p-3 rounded-lg bg-background/50 border border-cyan-400/30 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20 transition-all"
								min="1"
								max={remainingMinutes}
								onKeyDown={(e) => e.key === "Enter" && addActivity()}
							/>
						</div>
						{minutes > 0 && (
							<div className="p-3 rounded-lg cyber-border bg-background/20">
								<div className="text-sm text-muted-foreground">
									Cost Preview:
								</div>
								<div className="text-lg font-bold spent-text">
									{formatCurrency(minutes * COST_PER_MINUTE)}
								</div>
							</div>
						)}
						<Button
							onClick={addActivity}
							disabled={
								!newActivity.trim() ||
								minutes <= 0 ||
								remainingBudget < minutes * COST_PER_MINUTE
							}
							className="w-full variant-cyber"
						>
							<Zap className="w-4 h-4 mr-2" />
							Add Activity
						</Button>
						{remainingBudget < minutes * COST_PER_MINUTE && minutes > 0 && (
							<p className="text-sm text-red-400 text-center">
								Insufficient budget for this activity
							</p>
						)}
					</CardContent>
				</Card>
			</div>

			<Card className="max-w-4xl mx-auto cyber-border bg-card/50 backdrop-blur-sm">
				<CardHeader>
					<CardTitle className="flex items-center gap-2">
						<Clock className="w-5 h-5 text-cyan-400" />
						<span className="neon-text">Today&apos;s Activities</span>
					</CardTitle>
					<CardDescription>Your time spending log for today</CardDescription>
				</CardHeader>
				<CardContent>
					{activities.length === 0 ? (
						<div className="text-center py-8 text-muted-foreground">
							<Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
							<p>No activities logged yet</p>
							<p className="text-sm">
								Start tracking your time to see your spending patterns
							</p>
						</div>
					) : (
						<div className="space-y-3">
							{activities.map((activity) => (
								<div
									key={activity.id}
									className="flex items-center justify-between p-4 rounded-lg cyber-border bg-background/20 hover:bg-background/30 transition-colors"
								>
									<div className="flex-1">
										<div className="font-medium text-cyan-400">
											{activity.activity}
										</div>
										<div className="text-sm text-muted-foreground flex items-center gap-4">
											<span className="flex items-center gap-1">
												<Clock className="w-3 h-3" />
												{formatTime(activity.minutes)}
											</span>
											<span className="flex items-center gap-1">
												<DollarSign className="w-3 h-3" />
												{formatCurrency(activity.cost)}
											</span>
											<span>{activity.timestamp}</span>
										</div>
									</div>
									<Button
										variant="ghost"
										size="icon"
										onClick={() => removeActivity(activity.id)}
										className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
									>
										<Trash2 className="w-4 h-4" />
									</Button>
								</div>
							))}
						</div>
					)}
				</CardContent>
			</Card>

			<div className="text-center text-xs text-muted-foreground max-w-4xl mx-auto">
				<p>
					Concept: 86,400 seconds in a day = $86,400 budget | Each minute costs
					$60
				</p>
				<p>
					Data resets daily at midnight and is stored locally in your browser
				</p>
			</div>
		</div>
	);
};

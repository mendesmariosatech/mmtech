"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../components/ui/dialog";
import styles from "./HabitTracker.module.css";

interface AddHabitDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAddHabit: (name: string, color: string) => void;
}

const PRESET_COLORS = [
	"#7c3aed",
	"#3b82f6",
	"#10b981",
	"#f59e0b",
	"#ef4444",
	"#8b5cf6",
	"#06b6d4",
	"#f97316",
];

export function AddHabitDialog({ open, onOpenChange, onAddHabit }: AddHabitDialogProps) {
	const [name, setName] = useState("");
	const [selectedColor, setSelectedColor] = useState<string>(PRESET_COLORS[0] ?? "#7c3aed");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim()) {
			onAddHabit(name.trim(), selectedColor);
			setName("");
			setSelectedColor(PRESET_COLORS[0] ?? "#7c3aed");
			onOpenChange(false);
		}
	};

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-md bg-card/95 border-border/50 backdrop-blur-sm">
				<DialogHeader>
					<DialogTitle className={`font-heading ${styles["neon-text"]}`}>Add New Habit</DialogTitle>
					<DialogDescription>
						Create a new habit to track. Choose a name and color that motivates you.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit} className="space-y-4">
					<div className="space-y-2">
						<Label htmlFor="habit-name">Habit Name</Label>
						<Input
							id="habit-name"
							placeholder="e.g., Morning Workout, Read 30 minutes..."
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="bg-secondary/50 border-border/50"
						/>
					</div>

					<div className="space-y-2">
						<Label>Color</Label>
						<div className="flex gap-2 flex-wrap">
							{PRESET_COLORS.map((color) => (
								<button
									key={color}
									type="button"
									onClick={() => setSelectedColor(color)}
									className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
										selectedColor === color
											? `border-primary scale-110 ${styles["glow-effect"]}`
											: "border-border/30 hover:scale-105"
									}`}
									style={{ backgroundColor: color }}
								/>
							))}
						</div>
					</div>

					<DialogFooter>
						<Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="border-border/50">
							Cancel
						</Button>
						<Button
							type="submit"
							disabled={!name.trim()}
							className={`bg-primary hover:bg-primary/90 ${styles["glow-effect"]}`}
						>
							Add Habit
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

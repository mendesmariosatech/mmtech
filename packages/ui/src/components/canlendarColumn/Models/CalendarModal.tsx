"use client";

import * as React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "../../ui/dialog";
import { DataEvents } from "../CalendarColumnFull";

interface GenericModalProps {
	children: React.ReactNode;
	title: string;
	event?: DataEvents;
	selectedDate: Date | null;
	language: "EN" | "PT";
}

const texts = {
	EN: {
		buttonCancel: "Cancel",
		buttonSave: "Save",
	},
	PT: {
		buttonCancel: "Cancelar",
		buttonSave: "Salvar",
	},
};

export function CalendarModal({
	children,
	title,
	event,
	selectedDate,
	language,
}: GenericModalProps) {
	const [eventTitle, setEventTitle] = React.useState(event?.title || "");
	const [startDate, setStartDate] = React.useState(
		selectedDate ? selectedDate.toISOString().slice(0, 16) : "",
	);
	const [endDate, setEndDate] = React.useState("");
	const [isOpen, setIsSheetOpen] = React.useState(false);
	React.useEffect(() => {
		if (isOpen && selectedDate) {
			setStartDate(selectedDate.toISOString().slice(0, 16)); // Atualize startDate quando selectedDate mudar
		}
	}, [isOpen, selectedDate]);

	return (
		<Dialog open={isOpen} onOpenChange={setIsSheetOpen}>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className="max-w-[400px] sm:max-w-[525px] rounded-lg">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
				</DialogHeader>
				<div className="mb-4">
					<Input
						placeholder="Event Title"
						value={eventTitle}
						onChange={(e) => setEventTitle(e.target.value)}
						className="mb-2"
					/>
					<Input
						type="datetime-local"
						placeholder="Start Date"
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="mb-2"
					/>
					<Input
						type="datetime-local"
						placeholder="End Date"
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className="mb-2"
					/>
				</div>
				<DialogFooter className="flex justify-end">
					<Button
						variant="outline"
						className="mr-2"
						onClick={() => setIsSheetOpen(false)}
					>
						{texts[language].buttonCancel}
					</Button>
					<Button>{texts[language].buttonSave}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

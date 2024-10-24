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
} from "../../ui/dialog";
import { DataEvents } from "../CalendarColumnFull";
import { Textarea } from "../../ui/textarea";

const texts = {
	EN: {
		buttonCancel: "Cancel",
		buttonSave: "Save",
		modalTitleCreate: "Create Event",
		modalTitleEdit: "Edit Event",
		modalTitleDelete: "Delete Event",
		textAreaLabel: "Description",
		titleEvent: "Event Title",
		StartDate: "Start Date",
		EndDate: "End Date",
	},
	PT: {
		buttonCancel: "Cancelar",
		buttonSave: "Salvar",
		modalTitleCreate: "Criar Evento",
		modalTitleEdit: "Editar Evento",
		modalTitleDelete: "Deletar Evento",
		textAreaLabel: "Descrição",
		titleEvent: "Título do Evento",
		StartDate: "Data de Início",
		EndDate: "Data de Término",
	},
};

interface CalendarModalProps {
	language: "EN" | "PT";
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	event?: DataEvents | null;
	onAddEvent: (event: DataEvents) => void;
	onEditEvent: (event: DataEvents) => void;
	onDeleteEvent?: (eventId: string) => void;
}

export function CalendarModal({
	language,
	isModalOpen,
	setIsModalOpen,
	event,
	onAddEvent,
	onEditEvent,
	onDeleteEvent,
}: CalendarModalProps) {
	const [eventTitle, setEventTitle] = React.useState(event?.title || "");
	const [startDate, setStartDate] = React.useState(
		event?.start ? event.start.toISOString().slice(0, 16) : "",
	);
	const [endDate, setEndDate] = React.useState(
		event?.end ? event.end.toISOString().slice(0, 16) : "",
	);
	const [textArea, setTextArea] = React.useState(event?.description || "");
	const [addTag, setAddTag] = React.useState(event?.tag || "");

	React.useEffect(() => {
		if (event) {
			setEventTitle(event.title || "");
			setStartDate(event.start ? event.start.toISOString().slice(0, 16) : "");
			setEndDate(event.end ? event.end.toISOString().slice(0, 16) : "");
			setTextArea(event.description || "");
			setAddTag(event.tag || "");
		}
	}, [event]);

	const handleSave = () => {
		const newEvent: DataEvents = {
			id: event?.id,
			title: eventTitle,
			start: new Date(startDate),
			end: new Date(endDate),
			description: textArea,
			tag: addTag,
		};

		if (event) {
			onEditEvent(newEvent); // Edit existing event
		} else {
			onAddEvent(newEvent); // Add new event
		}

		handleCloseModal(); // Close modal after saving
	};

	const handleDelete = () => {
		if (event?.id && onDeleteEvent) {
			onDeleteEvent(event.id); // Call delete function
		}
		handleCloseModal(); // Close modal after deletion
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent className="max-w-[400px] sm:max-w-[525px] rounded-lg">
				<DialogHeader>
					<DialogTitle>
						{event
							? texts[language].modalTitleEdit
							: texts[language].modalTitleCreate}
					</DialogTitle>
				</DialogHeader>
				<div className="mb-4">
					<Input
						placeholder={texts[language].titleEvent}
						value={eventTitle}
						onChange={(e) => setEventTitle(e.target.value)}
						className="mb-2"
					/>
					<Input
						type="datetime-local"
						placeholder={texts[language].StartDate}
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						className="mb-2"
					/>
					<Input
						type="datetime-local"
						placeholder={texts[language].EndDate}
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						className="mb-2"
					/>
					<Textarea
						placeholder={texts[language].textAreaLabel}
						value={textArea}
						onChange={(e) => setTextArea(e.target.value)}
						className="mb-2"
					/>
					<Input
						value={addTag}
						onChange={(e) => setAddTag(e.target.value)}
						className="mb-2"
					/>
				</div>
				<DialogFooter className="flex justify-end">
					{event && onDeleteEvent && (
						<Button
							variant="destructive"
							className="mr-2"
							onClick={handleDelete}
						>
							{texts[language].modalTitleDelete}
						</Button>
					)}
					<Button variant="outline" className="mr-2" onClick={handleCloseModal}>
						{texts[language].buttonCancel}
					</Button>
					<Button onClick={handleSave}>{texts[language].buttonSave}</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

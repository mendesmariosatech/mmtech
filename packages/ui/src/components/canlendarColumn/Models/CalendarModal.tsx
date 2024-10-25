"use client";

import * as React from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import {
	Dialog,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";
import { DataEvents, Tag } from "../CalendarColumnFull";
import { Textarea } from "../../ui/textarea";

const colors = [
	"#FF0000",
	"#FFA500",
	"#FFFF00",
	"#008000",
	"#0000FF",
	"#4B0082",
	"#EE82EE",
	"#A52A2A",
	"#000000",
	"#FFFFFF",
	"#00FFFF",
	"#FFD700",
];

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
	const [tags, setTags] = React.useState<Tag[]>(
		event?.tag?.map((tag) => ({ name: "", color: "" })) || [],
	);
	const [startDate, setStartDate] = React.useState(
		event?.start ? event.start.toISOString().slice(0, 16) : "",
	);
	const [endDate, setEndDate] = React.useState(
		event?.end ? event.end.toISOString().slice(0, 16) : "",
	);
	const [textArea, setTextArea] = React.useState(event?.description || "");
	const [tagInput, setTagInput] = React.useState("");
	const [selectedColor, setSelectedColor] = React.useState<string>("");

	React.useEffect(() => {
		if (event) {
			setEventTitle(event.title || "");
			setStartDate(event.start ? event.start.toISOString().slice(0, 16) : "");
			setEndDate(event.end ? event.end.toISOString().slice(0, 16) : "");
			setTextArea(event.description || "");
			setTags(event.tag || []);
		}
	}, [event]);

	const handleAddTag = () => {
		if (tagInput && !tags.some((tag) => tag.name === tagInput)) {
			setTags([...tags, { name: tagInput, color: selectedColor }]);
			setTagInput("");
		}
	};

	const handleTagInputKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "," || e.key === "Enter") {
			e.preventDefault();
			handleAddTag();
		}
	};

	const handleDelete = () => {
		if (event?.id && onDeleteEvent) {
			onDeleteEvent(event.id); // Call delete function
		}
		handleCloseModal(); // Close modal after deletion
	};

	const handleDeleteTag = (tagToDelete: string) => {
		setTags(tags.filter((tag) => tag.name !== tagToDelete));
	};

	const handleSave = () => {
		if (!eventTitle || !startDate) {
			alert("Please fill in all required fields.");
			return;
		}

		const newEvent: DataEvents = {
			id: event?.id || "",
			title: eventTitle,
			start: new Date(startDate),
			end: endDate ? new Date(endDate) : undefined,
			description: textArea,
			tag: [], // Extrai apenas os nomes das tags
		};

		if (event && event.id) {
			onEditEvent(newEvent);
		} else {
			onAddEvent(newEvent);
		}

		resetFields();
		handleCloseModal();
	};

	const resetFields = () => {
		setEventTitle("");
		setStartDate("");
		setEndDate("");
		setTextArea("");
		setTagInput("");
		setTags([]);
		setSelectedColor("");
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
					<div className="mb-2">
						<Input
							placeholder="Add tag"
							value={tagInput}
							onChange={(e) => setTagInput(e.target.value)}
							onKeyPress={handleTagInputKeyPress}
							className="mb-2"
						/>
						<div className="flex flex-wrap mt-2">
							{tags.map((tag, index) => (
								<div
									key={index}
									className="flex items-center mb-2 mr-2"
									style={{ backgroundColor: tag.color }}
								>
									<span className="p-1 rounded mr-1 text-white">
										{tag.name}
									</span>
									<Button
										variant="destructive"
										size="sm"
										onClick={() => handleDeleteTag(tag.name)}
									>
										Delete
									</Button>
								</div>
							))}
						</div>
						<div className="mt-2">
							{colors.map((color) => (
								<button
									key={color}
									style={{
										backgroundColor: color,
										width: "24px",
										height: "24px",
										borderRadius: "50%",
										margin: "4px",
										border:
											selectedColor === color ? "2px solid black" : "none",
									}}
									onClick={() => setSelectedColor(color)}
								/>
							))}
						</div>
					</div>
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

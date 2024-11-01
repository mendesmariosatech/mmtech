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
import { ChevronDownIcon } from "lucide-react";
import { Checkbox } from "../../ui/checkbox";
import { formatDateTimeLocal } from "../../data-formater/dataformater";
import { configModal } from "./configModal";
import { text } from "stream/consumers";
import { ControlledForm } from "../../form-builder/ControlledForm";
import { useCalendarForm } from "./useCalendarModal.hooks";

const colors = [
	"#FF0000",
	"#FFA500",
	"#FFFF00",
	"#008000",
	"#0000FF",
	"#4B0082",
	"#EE82EE",
	"#A52A2A",
	"#3c5d92",
	"#6d7b92",
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
		Alerts: "Fields title and start date are required",
		Color: "",
		tagName: "Add Tag",
		allDays: "All Day Event", // Add this line
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
		Alerts: "Os campos título e data de início são obrigatórios",
		Color: "",
		tagName: "Adicionar Tag",
		allDays: "Evento Dia Todo", // Add this line
	},
} as const;

const getLabels = (language: keyof typeof texts) => ({
	titleEvent: texts[language].titleEvent,
	StartDate: texts[language].StartDate,
	EndDate: texts[language].EndDate,
	textAreaLabel: texts[language].textAreaLabel,
	tagName: texts[language].tagName,
	Color: texts[language].Color,
	allDays: texts[language].allDays, // Add this line
});

interface CalendarModalProps {
	language: "EN" | "PT";
	isModalOpen: boolean;
	setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	event?: DataEvents | null;
	onAddEvent: (event: DataEvents) => void;
	onEditEvent: (event: DataEvents) => void;
	onDeleteEvent?: (eventId: string) => void;
}

export function ColorSelect({
	selectedColor,
	onChangeColor,
}: {
	selectedColor: string;
	onChangeColor: (color: string) => void;
}) {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<div className="relative">
			<Button
				onClick={() => setIsOpen(!isOpen)}
				className="flex items-center px-2 py-1 border rounded"
				variant={"ghost"}
			>
				<div
					className="w-4 h-4 rounded-full"
					style={{ backgroundColor: selectedColor || "#6d7b92" }}
				></div>
				<ChevronDownIcon className="w-5 h-5" />
			</Button>
			{isOpen && (
				<div className="absolute mt-1 bg-gray-200 border rounded shadow-md">
					{colors.map((color) => (
						<div
							key={color}
							className="flex items-center px-2 py-1 cursor-pointer"
							onClick={() => {
								onChangeColor(color);
								setIsOpen(false);
							}}
						>
							<div
								className="w-4 h-4 rounded-full"
								style={{ backgroundColor: color }}
							></div>
						</div>
					))}
				</div>
			)}
		</div>
	);
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
	const [tags, setTags] = React.useState<Tag[]>(event?.tag || []);
	const [startDate, setStartDate] = React.useState(
		event?.start ? event.start.toISOString().slice(0, 16) : "",
	);
	const [endDate, setEndDate] = React.useState(
		event?.end ? event.end.toISOString().slice(0, 16) : "",
	);
	const [textArea, setTextArea] = React.useState(event?.description || "");
	const [tagName, setTagName] = React.useState(event?.tag?.[0]?.name || "");
	const [selectedColor, setSelectedColor] = React.useState(
		event?.tag?.[0]?.color || "",
	);
	const [isAllDay, setIsAllDay] = React.useState(event?.allDay || false); // Novo estado para evento de dia todo
	const modalConfig = configModal(getLabels(language), isAllDay);

	React.useEffect(() => {
		if (event) {
			setEventTitle(event.title || "");
			setStartDate(event.start ? formatDateTimeLocal(event.start) : "");
			setEndDate(event.end ? formatDateTimeLocal(event.end) : "");
			setTextArea(event.description || "");
			setTags(event.tag || []);
			setTagName(event.tag?.[0]?.name || "");
			setSelectedColor(event.tag?.[0]?.color || "");
			setIsAllDay(event.allDay || false); // Atualiza o estado com base no evento existente
		}
	}, [event]);

	const handleSave = () => {
		if (!eventTitle || !startDate) {
			alert(texts[language].Alerts);
			return;
		}

		const newEvent: DataEvents = {
			id: event?.id || "",
			title: eventTitle,
			start: new Date(startDate.replace("T", " ")),
			end: isAllDay
				? undefined
				: endDate
					? new Date(endDate.replace("T", " "))
					: undefined, // Condicional para end
			description: textArea,
			tag: tagName ? [{ name: tagName, color: selectedColor }] : [],
			allDay: isAllDay, // Adiciona a propriedade allDay ao evento
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
		setTagName("");
		setSelectedColor("");
		setTags([]);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const form = useCalendarForm();

	return (
		<Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
			<DialogContent className="max-w-[400px] sm:max-w-[525px] rounded-lg">
				<DialogHeader>
					<DialogTitle>
						{event?.title !== ""
							? texts[language].modalTitleEdit
							: texts[language].modalTitleCreate}
					</DialogTitle>
				</DialogHeader>
				<ControlledForm
					useForm={form}
					config={modalConfig}
					onSubmit={(data) => {
						const newEvent: DataEvents = {
							// Transform data fields as necessary to fit DataEvents format
							id: event?.id || "",
							title: data.titleEvent,
							start: new Date(data.StartDate),
							end: data.EndDate ? new Date(data.EndDate) : undefined,
							description: data.textAreaLabel,
							tag: [{ name: data.tagName, color: data.Color }],
							allDay: isAllDay,
						};

						event && event.id ? onEditEvent(newEvent) : onAddEvent(newEvent);
						resetFields(); // Custom function to clear fields
						setIsModalOpen(false);
					}}
				></ControlledForm>
				<DialogFooter className="flex justify-end">
					{event?.title !== "" && onDeleteEvent && (
						<Button
							variant="destructive"
							className="mr-2"
							onClick={() => onDeleteEvent(event?.id!)}
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

"use client";

import * as React from "react";
import { Button } from "../../ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "../../ui/dialog";
import { DataEvents } from "../types";
import { configModal } from "./configModal";
import { ControlledForm } from "../../form-builder/ControlledForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
		error: {
			title: "title is required to have +3 characters",
		},
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
		error: {
			title: "Nome é obrigatório e deve ter pelo menos 3 caracteres",
		},
	},
} as const;

export const modalFields = z.object({
	id: z.string().optional(),
	titleEvent: z.string().min(1, { message: texts.EN.error.title }),
	textAreaLabel: z.string().optional(),
	tagName: z.string().optional(),
	allDays: z.boolean().optional(),
	StartDate: z.string().min(1, { message: "Start date please" }),
	EndDate: z.string().optional(),
	Color: z.string(),
});

export type ModalFields = z.infer<typeof modalFields>;

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
	event: DataEvents | null;
	onAddEvent: (event: DataEvents) => void;
	onEditEvent: (event: DataEvents) => void;
	onDeleteEvent?: (eventId: string) => void;
}

export const useCalendarForm = () =>
	useForm<ModalFields>({
		resolver: zodResolver(modalFields),
		defaultValues: {
			titleEvent: "",
			textAreaLabel: "",
			tagName: "",
			allDays: false,
			StartDate: "",
			EndDate: "",
			Color: "#6d7b92",
		},
	});

export function CalendarModal({
	language,
	isModalOpen,
	setIsModalOpen,
	event,
	onAddEvent,
	onEditEvent,
	onDeleteEvent,
}: CalendarModalProps) {
	const modalConfig = configModal(getLabels(language), true);
	const form = useCalendarForm();

	const handleSave = (input: ModalFields) => {
		if (input && input.id) {
			// onEditEvent(input); // editar o evento existente
		} else {
			// onAddEvent(input); // adicionar um novo evento
		}

		form.reset(); // reset no formulário após salvar
		handleCloseModal();
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		form.reset();
	};

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
					onSubmit={handleSave}
				>
					<div className="flex flex-row justify-center items-center">
						{event?.title !== "" && onDeleteEvent && (
							<Button
								variant="destructive"
								className="mr-2"
								onClick={() => onDeleteEvent(event?.id!)}
							>
								{texts[language].modalTitleDelete}
							</Button>
						)}
						<Button
							variant="outline"
							className="mr-2"
							onClick={handleCloseModal}
						>
							{texts[language].buttonCancel}
						</Button>
						<Button type="submit">{texts[language].buttonSave}</Button>
					</div>
				</ControlledForm>
			</DialogContent>
		</Dialog>
	);
}

"use client";

import { Plus, User } from "lucide-react";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import { ptBR, enUS } from "date-fns/locale";
import {
	CollapsableBuilder,
	CollapsibleProps,
} from "../collapsable/CollapsableBuilder";
import { CalendarModal } from "./Models/CalendarModal";
import { FullCalendarBuilder } from "./Models/FullCalendar";

export interface Tag {
	name: string;
	color: string;
}
export interface DataEvents {
	id?: string;
	title?: string;
	start?: Date;
	end?: Date;
	description: string;
	tag: Tag[];
	calendar?: string;
	allDay?: boolean;
}

export type CalendarProps = {
	eventsData: DataEvents[];
	language: "EN" | "PT";
};

interface CalendarColumnBuilderProps {
	name: string;
	email: string;
	collapseData: CollapsibleProps;
	colorUser: string;
	eventsData: DataEvents[];
	language: "EN" | "PT";
}

export const texts_ViewChanges = {
	EN: {
		day: "Day",
		week: "Week",
		month: "Month",
		locale: enUS,
		add: "Add",
		calendar: "Calendar",
		today: "Today",
		allDayText: "All day",
		buttonAdd: "Add event",
		buttonText: {
			today: "Today",
			month: "Month",
			week: "Week",
			day: "Day",
		},
	},
	PT: {
		day: "Dia",
		week: "Semana",
		month: "Mês",
		locale: ptBR,
		add: "Adicionar",
		calendar: "Calendário",
		today: "Hoje",
		allDayText: "Todo o dia",
		buttonAdd: "Adicionar evento",
		buttonText: {
			today: "Hoje",
			month: "Mês",
			week: "Semana",
			day: "Dia",
		},
	},
};

export default function CalendarColumnBuilder({
	name,
	email,
	collapseData,
	colorUser,
	language,
	eventsData,
}: CalendarColumnBuilderProps) {
	const [date, setDate] = useState<Date>(new Date());
	const [view, setView] = useState<string>(texts_ViewChanges[language].month);
	const [selectedEvent, setSelectedEvent] = useState<DataEvents | null>(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [events, setEvents] = useState<DataEvents[]>(eventsData);

	const handleOpenModal = (event: DataEvents | null, date?: Date) => {
		setSelectedEvent(
			event
				? event
				: { start: date, end: undefined, title: "", description: "", tag: [] },
		);
		setIsModalOpen(true);
	};

	const handleAddEvent = (newEvent: DataEvents) => {
		setEvents((prevEvents) => [
			...prevEvents,
			{ ...newEvent, id: Date.now().toString() }, // Gera um novo ID para o evento
		]);
		setIsModalOpen(false);
	};

	const handleEditEvent = (updatedEvent: DataEvents) => {
		setEvents((prevEvents) =>
			prevEvents.map((evt) =>
				evt.id === updatedEvent.id ? updatedEvent : evt,
			),
		);
		setIsModalOpen(false);
	};

	const handleDeleteEvent = (eventId: string) => {
		setEvents((prevEvents) => prevEvents.filter((evt) => evt.id !== eventId));
		setIsModalOpen(false);
	};

	return (
		<div className="flex h-screen bg-background">
			<div className="hidden w-72 bg-white shadow-lg min-h-screen justify-between md:flex flex-col">
				<div className="flex flex-col h-full">
					<div className="p-4 bg-gray-100 flex items-center">
						<div className="flex items-center space-x-2">
							<div
								className={`w-8 h-8 ${colorUser} rounded-full flex items-center justify-center`}
							>
								<User className="text-white w-5 h-5" />
							</div>
							<div>
								<p className="text-sm font-medium">{name}</p>
								<p className="text-xs text-gray-500">{email}</p>
							</div>
						</div>
					</div>
					<div className="w-full">
						<Calendar
							mode="single"
							selected={date}
							onSelect={(newDate) => newDate && setDate(newDate)}
							className="border shadow"
							locale={texts_ViewChanges[language].locale}
						/>
					</div>
					<div className="p-4 border-t">
						<CollapsableBuilder
							title={collapseData.title}
							icon={collapseData.icon}
							items={collapseData.items}
						/>
					</div>
				</div>
				<div className="border-t">
					<CalendarModal
						language={language}
						isModalOpen={isModalOpen}
						setIsModalOpen={setIsModalOpen}
						event={selectedEvent}
						onAddEvent={handleAddEvent}
						onEditEvent={handleEditEvent}
						onDeleteEvent={handleDeleteEvent}
					></CalendarModal>
					<Button
						className="w-full"
						variant="outline"
						onClick={() => handleOpenModal(null, date)}
					>
						<Plus className="mr-2 h-4 w-4" />{" "}
						{texts_ViewChanges[language].buttonAdd}
					</Button>
				</div>
			</div>
			<FullCalendarBuilder
				language={language}
				view={view}
				events={events}
				onEventSelect={handleOpenModal}
			/>
		</div>
	);
}

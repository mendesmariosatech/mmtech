"use client";

import * as React from "react";
import { ptBR, enUS } from "date-fns/locale";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarModal } from "./Models/CalendarModal";
import { FullCalendarBuilder } from "./Models/FullCalendar";
import { Plus } from "lucide-react";

export interface DataEvents {
	id?: string;
	title?: string;
	start?: Date;
	end?: Date;
	description: string;
	tag: string;
	calendar?: string;
}

export interface CalendarData {
	name: string;
	color: string;
}

export type CalendarProps = {
	eventsData: DataEvents[];
	calendarData: CalendarData[];
	language: "EN" | "PT";
};

export const texts_ViewChanges = {
	EN: {
		day: "Day",
		week: "Week",
		month: "Month",
		locale: enUS,
		add: "Add",
		calendar: "Calendar",
		today: "Today",
	},
	PT: {
		day: "Dia",
		week: "Semana",
		month: "Mês",
		locale: ptBR,
		add: "Adicionar",
		calendar: "Calendário",
		today: "Hoje",
	},
};

export function CalendarPage({
	eventsData,
	calendarData,
	language,
}: CalendarProps) {
	const [date, setDate] = React.useState<Date>(new Date());
	const [view, setView] = React.useState("month");
	const [selectedEvent, setSelectedEvent] = React.useState<DataEvents | null>(
		null,
	);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [events, setEvents] = React.useState<DataEvents[]>(eventsData);

	const handleOpenModal = (event: DataEvents | null) => {
		setSelectedEvent(event);
		setIsModalOpen(true);
	};

	const handleAddEvent = (newEvent: DataEvents) => {
		setEvents((prevEvents) => [
			...prevEvents,
			{ ...newEvent, id: Date.now().toString() }, // Generate a new ID
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
			<div className="hidden w-68 border-r p-4 md:flex flex-col">
				<Button
					className="mb-4"
					variant="outline"
					onClick={() => handleOpenModal(null)}
				>
					<Plus className="mr-2 h-4 w-4" /> {texts_ViewChanges[language].add}
				</Button>
				<CalendarModal
					language={language}
					isModalOpen={isModalOpen}
					setIsModalOpen={setIsModalOpen}
					event={selectedEvent}
					onAddEvent={handleAddEvent}
					onEditEvent={handleEditEvent}
					onDeleteEvent={handleDeleteEvent}
				/>
				<Calendar
					mode="single"
					selected={date}
					onSelect={(newDate) => newDate && setDate(newDate)}
					className="rounded-md border"
					locale={texts_ViewChanges[language].locale}
				/>
				<div>
					<h3 className="font-semibold mb-2">
						{texts_ViewChanges[language].calendar}
					</h3>
					{calendarData.map((cal) => (
						<div key={cal.name} className="flex items-center mb-2">
							<div className={`w-3 h-3 rounded-full mr-2 ${cal.color}`} />
							<span>{cal.name}</span>
						</div>
					))}
				</div>
			</div>
			<FullCalendarBuilder
				language={language}
				view={view}
				events={events}
				onEventSelect={handleOpenModal} // Pass the function to handle event selection
			/>
		</div>
	);
}
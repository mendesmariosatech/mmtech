"use client";

import * as React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DataEvents, texts_ViewChanges } from "../CalendarColumnFull";

interface FullCalendarProps {
	events: DataEvents[];
	view: string;
	language: "EN" | "PT";
	onEventSelect: (event: DataEvents | null) => void;
}

export function FullCalendarBuilder({
	events,
	view,
	language,
	onEventSelect,
}: FullCalendarProps) {
	// Manipulador de clique em evento
	const handleEventSelect = (arg: any) => {
		if (arg.event) {
			const event = arg.event;
			onEventSelect({
				id: event.id,
				title: event.title,
				start: event.start,
				end: event.end,
				description: event.extendedProps.description,
				tag: event.extendedProps.tag,
			});
		} else {
			onEventSelect(null); // Passa null se não houver evento
		}
	};

	// Manipulador de clique em data
	const handleDateClick = (arg: any) => {
		const newEvent: DataEvents = {
			id: "", // Você pode gerar um ID único ou usar um UUID
			title: "", // Título pode ser preenchido no modal
			start: arg.date,
			end: arg.date, // Você pode definir um horário de término padrão
			description: "",
			tag: "",
		};

		// Abre o modal para adicionar o novo evento
		onEventSelect(newEvent);
	};

	return (
		<div className="flex-1 p-4">
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView={
					view === texts_ViewChanges[language].month
						? "dayGridMonth"
						: "timeGridWeek"
				}
				events={events}
				eventClick={handleEventSelect}
				dateClick={handleDateClick} // Adiciona o manipulador de clique em data
				locales={[texts_ViewChanges[language].locale]}
				headerToolbar={{
					start: "today prev,next",
					center: "title",
					right: "dayGridMonth,timeGridWeek,timeGridDay",
				}}
				handleWindowResize={true}
				height={"90vh"}
			/>
		</div>
	);
}

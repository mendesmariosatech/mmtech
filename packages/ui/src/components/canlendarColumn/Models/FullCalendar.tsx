"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { DataEvents, texts_ViewChanges } from "../CalendarColumnFull";

interface FullCalendarProps {
	events: DataEvents[];
	handleDateClick: (arg: any) => void;
	handleEventClick: (arg: any) => void;
	view: string;
	language: "EN" | "PT";
}

export function FullCalendarBuilder({
	events,
	handleDateClick,
	handleEventClick,
	view,
	language,
}: FullCalendarProps) {
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
				dateClick={handleDateClick}
				eventClick={handleEventClick}
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

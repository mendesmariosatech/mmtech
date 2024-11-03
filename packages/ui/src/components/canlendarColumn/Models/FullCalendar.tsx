"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { DataEvents, texts_ViewChanges } from "../CalendarColumnFull";
import { useEffect, useState } from "react";
import { EventClickArg, EventSourceInput } from "@fullcalendar/core/index.js";

interface FullCalendarProps {
	events: DataEvents[];
	view: string;
	language: "EN" | "PT";
	onEventSelect: (event: DataEvents | null, date: Date | null) => void;
}

export function FullCalendarBuilder({
	events,
	view,
	language,
	onEventSelect,
}: FullCalendarProps) {
	const [isMobile, setIsMobile] = useState(false);

	const handleEventSelect = (arg: EventClickArg) => {
		if (arg.event) {
			const event = arg.event;
			onEventSelect(
				{
					id: event.id,
					title: event.title,
					start: event.start,
					end: event.end,
					description: event.extendedProps.description,
					tag: event.extendedProps.tag,
					allDay: event.allDay,
				},
				null,
			);
		} else {
			onEventSelect(null, null); // Passa null se não houver evento
		}
	};

	// Manipulador de clique em data
	const handleDateClick = (arg: DateClickArg) => {
		const newEvent: DataEvents = {
			id: "", // Você pode gerar um ID único ou usar um UUID
			title: "", // Título pode ser preenchido no modal
			start: arg.date, // Definido como a data clicada
			end: null, // Você pode definir um horário de término padrão
			description: "",
			tag: [],
			allDay: false,
		};

		// Verifica se a data clicada não contém hora (somente data)
		const isAllDayEvent =
			arg.date.getHours() === 0 && arg.date.getMinutes() === 0;
		if (isAllDayEvent) {
			// Marcar como evento de dia todo
			newEvent.allDay = true; // A propriedade 'allDay' é uma convenção para eventos de dia todo
		}

		// Abre o modal para adicionar o novo evento
		onEventSelect(newEvent, null);
	};

	const formattedEvents = events.map((event) => ({
		...event,
		backgroundColor: event.tag?.[0]?.color || "#6d7b92",
		borderColor: event.tag?.[0]?.color || "#6d7b92",
	})) as EventSourceInput;

	const renderEventContent = (eventInfo: any) => {
		const { event } = eventInfo;
		const tagColor = event.extendedProps.tag?.[0]?.color || "#6d7b92"; // Cor padrão

		return (
			<div style={{ display: "flex", alignItems: "center" }}>
				<div
					style={{
						width: "10px",
						height: "10px",
						backgroundColor: tagColor,
						marginRight: "5px",
						borderRadius: "50%", // Para fazer um círculo
					}}
				/>
				<span>{event.title}</span>
			</div>
		);
	};

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < 1000);
		};

		handleResize();

		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, [window.innerWidth]);

	const headerToolbarConfig = isMobile
		? {
				start: "dayGridMonth,timeGridWeek,timeGridDay",
				center: "",
				right: "today prev,next",
			}
		: {
				start: "today prev,next",
				center: "title",
				right: "dayGridMonth,timeGridWeek,timeGridDay",
			};

	return (
		<div className={`flex-1 p-4 ${isMobile ? "mobile-calendar" : ""}`}>
			<FullCalendar
				plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
				initialView={
					view === texts_ViewChanges[language].month
						? "dayGridMonth"
						: "timeGridWeek"
				}
				events={formattedEvents}
				eventClick={handleEventSelect}
				dateClick={handleDateClick} // Adiciona o manipulador de clique em data
				locales={[texts_ViewChanges[language].locale]}
				headerToolbar={headerToolbarConfig}
				handleWindowResize={true}
				height={"90vh"}
				eventContent={renderEventContent}
				allDayText={texts_ViewChanges[language].allDayText}
				buttonText={texts_ViewChanges[language].buttonText}
			/>
		</div>
	);
}

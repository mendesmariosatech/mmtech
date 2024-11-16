"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import { texts_ViewChanges } from "../CalendarColumnFull";
import { useEffect, useState } from "react";
import { EventClickArg, EventSourceInput } from "@fullcalendar/core/index.js";
import { DataEvents } from "../types";

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
			// Separar data e hora do início do evento
			const [date, time] = arg.event.startStr.split("T");

			const startTime = time ? time.slice(0, 5) : "";
			const endTime = arg.event.endStr
				? arg.event.endStr.split("T")[1]?.slice(0, 5)
				: ""; // Verifica se endStr existe

			onEventSelect(
				{
					id: arg.event.id,
					title: arg.event.title,
					eventDate: date, // "YYYY-MM-DD"
					start: startTime,
					end: endTime,
					description: arg.event.extendedProps.description || "",
					tag: arg.event.extendedProps.tag || "",
				},
				null, // Passa nulo porque não há um novo date associado
			);
		} else {
			onEventSelect(null, null); // Passa null se não houver evento
		}
	};

	// Manipulador de clique em data
	const handleDateClick = (arg: DateClickArg) => {
		const [date] = arg.dateStr.split("T");
		const newEvent: DataEvents = {
			id: "", // ID será gerado posteriormente
			title: "", // Preencherá o título no modal
			eventDate: date, // "YYYY-MM-DD"
			start: "", // Horário de início padrão
			end: "", // Horário de término padrão
			description: "",
			tag: [],
		};

		// Abrir o modal para criar um novo evento
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

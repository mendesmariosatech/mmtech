"use client";

import * as React from "react";
import {
	addDays,
	format,
	startOfWeek,
	addWeeks,
	addMonths,
	subWeeks,
	subMonths,
	startOfDay,
	endOfDay,
} from "date-fns";
import { ptBR, enUS, te } from "date-fns/locale";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	Plus,
} from "lucide-react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarModal } from "./Models/CalendarModal";
import { FullCalendarBuilder } from "./Models/FullCalendar";

export interface DataEvents {
	id?: string; // Change to string
	title?: string;
	start?: Date;
	end?: Date;
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

export default function CalendarPage({
	eventsData,
	calendarData,
	language,
}: CalendarProps) {
	const [date, setDate] = React.useState<Date>(new Date());
	const [view, setView] = React.useState(texts_ViewChanges[language].month);
	const [events, setEvents] = React.useState<DataEvents[]>(eventsData);
	const [newEvent, setNewEvent] = React.useState<{
		title: string;
		start: Date;
		end: Date;
		calendar: string;
	}>({
		title: "",
		start: new Date(),
		end: new Date(),
		calendar: "Personal",
	});

	const handleAddEvent = (event: { title: string; start: Date; end: Date }) => {
		const newEventWithId = {
			...newEvent,
			...event,
			id: (events.length + 1).toString(),
		}; // Convert id to string
		setEvents([...events, newEventWithId]);
	};

	const handleDateClick = (arg: { date: Date; allDay: boolean }) => {
		console.log("Date clicked:", arg.date);
		// Logic to handle adding an event
	};

	React.useEffect(() => {
		const handleResize = () => {
			if (
				window.innerWidth < 768 &&
				view === texts_ViewChanges[language].month
			) {
				setView(texts_ViewChanges[language].week);
			}
		};
		window.addEventListener("resize", handleResize);
		handleResize();
		return () => window.removeEventListener("resize", handleResize);
	}, [view]);

	React.useEffect(() => {
		if (view === texts_ViewChanges[language].month) {
			setDate(new Date(date.getFullYear(), date.getMonth(), 1));
		}
	}, [view]);

	return (
		<div className="flex h-screen bg-background">
			<div className="hidden w-68 border-r p-4 md:flex flex-col">
				<CalendarModal
					language={language}
					title="Add Event"
					event={newEvent}
					selectedDate={date} // Adicione esta prop
				>
					<Button className="mb-4" variant="outline">
						<Plus className="mr-2 h-4 w-4" /> {texts_ViewChanges[language].add}
					</Button>
				</CalendarModal>

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
				handleDateClick={handleAddEvent}
				handleEventClick={handleDateClick}
			/>
		</div>
	);
}

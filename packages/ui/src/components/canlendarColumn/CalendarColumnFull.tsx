import * as React from "react";
import { ptBR, enUS } from "date-fns/locale";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { CalendarModal } from "./Models/CalendarModal";
import { FullCalendarBuilder } from "./Models/FullCalendar";
import { Plus } from "lucide-react";

export interface Tag {
	name: string;
	color: string;
}
export interface DataEvents {
	id?: string;
	title?: string;
	start: Date | null;
	end: Date | null;
	description: string;
	tag: Tag[];
	calendar?: string;
	allDay?: boolean;
}

export type CalendarProps = {
	eventsData: DataEvents[];
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
		allDayText: "All day",
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
		buttonText: {
			today: "Hoje",
			month: "Mês",
			week: "Semana",
			day: "Dia",
		},
	},
};

export function CalendarPage({ eventsData, language }: CalendarProps) {
	const [date, setDate] = React.useState<Date>(new Date());
	const [view, setView] = React.useState<string>(
		texts_ViewChanges[language].month,
	);
	const [selectedEvent, setSelectedEvent] = React.useState<DataEvents | null>(
		null,
	);
	const [isModalOpen, setIsModalOpen] = React.useState(false);
	const [events, setEvents] = React.useState<DataEvents[]>(eventsData);

	const handleOpenModal = (event: DataEvents | null, date: Date | null) => {
		setSelectedEvent(
			event
				? event
				: { start: date, end: null, title: "", description: "", tag: [] },
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

	React.useEffect(() => {
		if (window.innerWidth <= 768) {
			setView(texts_ViewChanges[language].week);
		}
	}, [window.innerWidth]);

	return (
		<div className="flex h-screen bg-background">
			<div className="hidden w-68 border-r p-4 md:flex flex-col">
				<Button
					className="mb-4"
					variant="outline"
					onClick={() => handleOpenModal(null, date)}
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
					className="rounded-md border mb-2"
					locale={texts_ViewChanges[language].locale}
				/>
				<div>
					<h3 className="font-semibold mb-2">
						{texts_ViewChanges[language].calendar}
					</h3>
					{events.map((cal) => (
						<div key={cal.id} className="flex items-center mb-2">
							{cal.tag &&
								cal.tag.length > 0 &&
								cal.tag.map((tag, index) => (
									<div key={index} className="flex items-center mr-2">
										<div
											className="w-3 h-3 rounded-full mr-2"
											style={{ backgroundColor: tag.color }}
										/>
										<span>{tag.name}</span>
									</div>
								))}
						</div>
					))}
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

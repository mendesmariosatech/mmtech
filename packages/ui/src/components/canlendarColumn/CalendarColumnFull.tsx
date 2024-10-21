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
import { ptBR } from "date-fns/locale";
import {
	Calendar as CalendarIcon,
	ChevronLeft,
	ChevronRight,
	MoreHorizontal,
	Plus,
} from "lucide-react";

import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";
import { CalendarModal } from "./Models/CalendarModal";

export default function CalendarPage() {
	const [date, setDate] = React.useState<Date>(new Date());
	const [view, setView] = React.useState<"dia" | "semana" | "mês">("semana");
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

	const calendars = [
		{ name: "Personal", color: "bg-red-500" },
		{ name: "Work", color: "bg-blue-500" },
		{ name: "Family", color: "bg-green-500" },
	];

	const [events, setEvents] = React.useState([
		{
			id: 1,
			title: "Meeting with Team",
			start: new Date(2024, 9, 21, 10, 0),
			end: new Date(2024, 9, 21, 11, 0),
			calendar: "Work",
		},
		{
			id: 2,
			title: "Lunch with Friends",
			start: new Date(2024, 9, 21, 12, 30),
			end: new Date(2024, 9, 21, 13, 30),
			calendar: "Personal",
		},
		{
			id: 3,
			title: "Project Deadline",
			start: new Date(2024, 9, 22, 9, 0),
			end: new Date(2024, 9, 22, 17, 0),
			calendar: "Work",
		},
		{
			id: 4,
			title: "Family Dinner",
			start: new Date(2024, 9, 23, 18, 0),
			end: new Date(2024, 9, 23, 20, 0),
			calendar: "Family",
		},
	]);

	const handleNavigation = (direction: "prev" | "next") => {
		if (view === "semana") {
			setDate(direction === "next" ? addWeeks(date, 1) : subWeeks(date, 1));
		} else if (view === "mês") {
			setDate(direction === "next" ? addMonths(date, 1) : subMonths(date, 1));
		} else {
			setDate(direction === "next" ? addDays(date, 1) : addDays(date, -1));
		}
	};

	const handleViewChange = (newView: "dia" | "semana" | "mês") => {
		setView(newView);
	};

	const handleAddEvent = (event: { title: string; start: Date; end: Date }) => {
		const newEventWithId = { ...newEvent, ...event, id: events.length + 1 };
		setEvents([...events, newEventWithId]);
	};

	const renderEvents = (day: Date) => {
		return events
			.filter((event) => {
				if (view === "dia") {
					return event.start >= startOfDay(day) && event.end <= endOfDay(day);
				} else if (view === "semana") {
					const weekStart = startOfWeek(date);
					return (
						event.start >= startOfDay(addDays(weekStart, day.getDay())) &&
						event.end <= endOfDay(addDays(weekStart, day.getDay()))
					);
				} else {
					// Para o modo "mês", verifique se o evento ocorre neste dia
					return (
						event.start.getMonth() === day.getMonth() &&
						event.start.getFullYear() === day.getFullYear() &&
						event.start.getDate() === day.getDate()
					);
				}
			})
			.map((event) => (
				<div
					key={event.id}
					className={`text-xs p-1 rounded mb-1 ${
						event.calendar === "Work"
							? "bg-blue-100 text-blue-800"
							: event.calendar === "Personal"
								? "bg-red-100 text-red-800"
								: "bg-green-100 text-green-800"
					}`}
				>
					{event.title}
				</div>
			));
	};

	React.useEffect(() => {
		// Update the calendar's selected date to sync with navigation
		if (view === "mês") {
			setDate(new Date(date.getFullYear(), date.getMonth(), 1));
		}
	}, [view]);

	return (
		<div className="flex h-screen bg-background">
			<div className="w-68 border-r p-4 flex flex-col">
				<CalendarModal
					title={newEvent ? "Edit Event" : "Add Event"}
					event={newEvent}
				>
					<Button className="mb-4" variant="outline">
						<Plus className="mr-2 h-4 w-4" /> Adicionar
					</Button>
				</CalendarModal>
				<div className="mb-4">
					<Calendar
						mode="single"
						selected={date}
						onSelect={(newDate) => newDate && setDate(newDate)}
						className="rounded-md border"
						locale={ptBR}
					/>
				</div>
				<div>
					<h3 className="font-semibold mb-2">Calendário</h3>
					{calendars.map((cal) => (
						<div key={cal.name} className="flex items-center mb-2">
							<div className={`w-3 h-3 rounded-full mr-2 ${cal.color}`} />
							<span>{cal.name}</span>
						</div>
					))}
				</div>
			</div>

			{/* Main Content */}
			<div className="flex-1 flex flex-col">
				{/* Top Navigation */}
				<header className="flex items-center justify-between p-4 border-b">
					<div className="flex items-center">
						<Button
							variant="outline"
							size="icon"
							className="mr-2"
							onClick={() => handleNavigation("prev")}
						>
							<ChevronLeft className="h-4 w-4" />
						</Button>
						<Button
							variant="outline"
							size="icon"
							className="mr-4"
							onClick={() => handleNavigation("next")}
						>
							<ChevronRight className="h-4 w-4" />
						</Button>
						<h2 className="text-2xl font-semibold">
							{format(
								date,
								view === "mês" ? "MMMM yyyy" : "d 'de' MMMM 'de' yyyy",
								{ locale: ptBR },
							)}
						</h2>
					</div>
					<div className="flex items-center">
						<Button
							variant="outline"
							className="mr-2"
							onClick={() => setDate(new Date())}
						>
							Hoje
						</Button>
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="outline">
									{view.charAt(0).toUpperCase() + view.slice(1)}{" "}
									<ChevronLeft className="ml-2 h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => handleViewChange("dia")}>
									Dia
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleViewChange("semana")}>
									Semana
								</DropdownMenuItem>
								<DropdownMenuItem onClick={() => handleViewChange("mês")}>
									Mês
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
						<Button variant="ghost" size="icon" className="ml-2">
							<MoreHorizontal className="h-4 w-4" />
						</Button>
					</div>
				</header>

				{/* Calendar Grid */}
				<ScrollArea className="flex-1 h-full">
					<div
						className={`grid ${view === "mês" ? "grid-cols-7" : view === "semana" ? "grid-cols-7" : "grid-cols-1"} gap-px bg-muted h-full`}
					>
						{Array.from({
							length: view === "mês" ? 42 : view === "semana" ? 7 : 1,
						}).map((_, index) => (
							<div key={index} className="p-4 border h-full">
								{view === "dia" || view === "semana"
									? format(addDays(date, index), "EEEE, MMM d", {
											locale: ptBR,
										})
									: format(addDays(date, index), "MMM d", { locale: ptBR })}
								<div className="mt-2">{renderEvents(addDays(date, index))}</div>
							</div>
						))}
					</div>
				</ScrollArea>
			</div>
		</div>
	);
}

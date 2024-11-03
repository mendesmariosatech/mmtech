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

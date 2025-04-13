export interface Tag {
	name: string;
	color: string;
}
export interface DataEvents {
	id?: string;
	title?: string;
	eventDate?: string;
	start?: string;
	end?: string;
	description: string;
	tag: Tag[];
}

export type CalendarProps = {
	eventsData: DataEvents[];
	language: "EN" | "PT";
};

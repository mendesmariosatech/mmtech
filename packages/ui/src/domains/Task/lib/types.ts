export interface Task {
	id: string;
	title: string;
	description?: string;
	dueDate: string | Date;
	completed: boolean;
}

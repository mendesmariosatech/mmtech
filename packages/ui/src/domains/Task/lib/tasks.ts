import type { Task } from "./types";

// In a real app, this would be a database or API call
// For this example, we'll use localStorage

const STORAGE_KEY = "tasks";

// Helper to get tasks from localStorage
export function getTasks(): Task[] {
	if (typeof window === "undefined") return [];

	const tasksJson = localStorage.getItem(STORAGE_KEY);
	if (!tasksJson) return [];

	try {
		return JSON.parse(tasksJson);
	} catch (error) {
		console.error("Error parsing tasks from localStorage:", error);
		return [];
	}
}

// Helper to save tasks to localStorage
function saveTasks(tasks: Task[]): void {
	if (typeof window === "undefined") return;
	localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}

// Get a task by ID
export function getTaskById(id: string): Task | null {
	const tasks = getTasks();
	return tasks.find((task) => task.id === id) || null;
}

// Add a new task
export function addTask(task: Omit<Task, "id">): Task {
	const tasks = getTasks();
	const newTask: Task = {
		...task,
		id: Date.now().toString(), // Simple ID generation
		dueDate:
			task.dueDate instanceof Date ? task.dueDate.toISOString() : task.dueDate,
	};

	saveTasks([...tasks, newTask]);
	return newTask;
}

// Update an existing task
export function updateTask(
	id: string,
	updatedTask: Omit<Task, "id">,
): Task | null {
	const tasks = getTasks();
	const taskIndex = tasks.findIndex((task) => task.id === id);

	if (taskIndex === -1) return null;

	const newTask: Task = {
		...updatedTask,
		id,
		dueDate:
			updatedTask.dueDate instanceof Date
				? updatedTask.dueDate.toISOString()
				: updatedTask.dueDate,
	};

	tasks[taskIndex] = newTask;
	saveTasks(tasks);
	return newTask;
}

// Delete a task
export function deleteTask(id: string): boolean {
	const tasks = getTasks();
	const filteredTasks = tasks.filter((task) => task.id !== id);

	if (filteredTasks.length === tasks.length) return false;

	saveTasks(filteredTasks);
	return true;
}

// Initialize with some sample tasks if none exist
export function initializeSampleTasks(): void {
	const tasks = getTasks();
	if (tasks.length === 0) {
		const today = new Date();
		const tomorrow = new Date();
		tomorrow.setDate(today.getDate() + 1);

		const nextWeek = new Date();
		nextWeek.setDate(today.getDate() + 7);

		const sampleTasks: Omit<Task, "id">[] = [
			{
				title: "Complete project proposal",
				description: "Finish the draft and send it to the team for review",
				dueDate: tomorrow.toISOString(),
				completed: false,
			},
			{
				title: "Buy groceries",
				description: "Milk, eggs, bread, and vegetables",
				dueDate: today.toISOString(),
				completed: true,
			},
			{
				title: "Schedule dentist appointment",
				description: "Call Dr. Smith's office for a checkup",
				dueDate: nextWeek.toISOString(),
				completed: false,
			},
		];

		sampleTasks.forEach((task) => addTask(task));
	}
}

// Call this function when the app loads to initialize sample data
if (typeof window !== "undefined") {
	// Only run in browser environment
	setTimeout(() => {
		initializeSampleTasks();
	}, 100);
}

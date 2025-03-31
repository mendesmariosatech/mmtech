import { Button } from "../../../components/ui/button";
import { PlusIcon, Target, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { TaskList } from "./TaskList";

export function Tasks() {
	return (
		<main className="container mx-auto p-4 max-w-4xl">
			<div className="flex items-center justify-between mb-6">
				<h1 className="text-3xl font-bold">My Tasks</h1>
				<div className="flex gap-2">
					<Link href="/tasks/goals">
						<Button variant="outline">
							<Target className="h-4 w-4 mr-2" />
							Goals
						</Button>
					</Link>
					<Link href="/tasks/plans">
						<Button variant="outline">
							<LayoutGrid className="h-4 w-4 mr-2" />
							Plans
						</Button>
					</Link>
					<Link href="/add">
						<Button>
							<PlusIcon className="h-4 w-4 mr-2" />
							Add Task
						</Button>
					</Link>
				</div>
			</div>
			<TaskList />
		</main>
	);
}

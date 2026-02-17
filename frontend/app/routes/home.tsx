import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Route } from "./+types/home";
import { getTasks, deleteTask, type Task } from "../services/taskService";
import { TaskCard } from "../components/TaskCard";
import { FaPlus } from "react-icons/fa";

export function meta({}: Route.MetaArgs) {
	return [
		{ title: "Task Manager" },
		{ name: "description", content: "Manage your tasks efficiently" },
	];
}

export default function Home() {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		loadTasks();
	}, []);

	const loadTasks = () => {
		setLoading(true);
		getTasks()
			.then((data) => {
				setTasks(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	};

	const handleDelete = async (id: number) => {
		if (confirm("Are you sure? This action cannot be undone.")) {
			try {
				await deleteTask(id);
				// Optimistic update or reload
				setTasks(tasks.filter((t) => t.id !== id));
			} catch (err: any) {
				alert("Failed to delete task: " + err.message);
			}
		}
	};

	if (loading)
		return (
			<div className="flex justify-center p-8 text-gray-600">
				Loading tasks...
			</div>
		);
	if (error)
		return (
			<div className="flex justify-center p-8 text-red-500">Error: {error}</div>
		);

	return (
		<div className="container mx-auto p-4 max-w-5xl">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold text-gray-900 tracking-tight">
					Tasks
				</h1>
				<Link
					to="/new"
					className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-5 rounded-lg transition shadow-sm flex items-center gap-2"
				>
					<FaPlus />
					New Task
				</Link>
			</div>

			<div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
				{tasks.map((task) => (
					<TaskCard key={task.id} task={task} onDelete={handleDelete} />
				))}
			</div>

			{tasks.length === 0 && (
				<div className="text-center py-16 bg-gray-50 rounded-xl border border-dashed border-gray-300">
					<p className="text-gray-500 mb-2">No tasks found.</p>
					<Link
						to="/new"
						className="text-indigo-600 font-medium hover:underline"
					>
						Create a new task
					</Link>
				</div>
			)}
		</div>
	);
}

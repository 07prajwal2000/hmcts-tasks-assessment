import { Link } from "react-router";
import type { Task } from "../services/taskService";
import {
	FaTrash,
	FaCalendarAlt,
	FaCheckCircle,
	FaSpinner,
	FaHourglassStart,
} from "react-icons/fa";

interface TaskCardProps {
	task: Task;
	onDelete: (id: number) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
	const handleDelete = (e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (confirm("Are you sure you want to delete this task?")) {
			onDelete(task.id);
		}
	};

	const getStatusIcon = (status: string) => {
		switch (status) {
			case "complete":
				return <FaCheckCircle className="text-green-500" />;
			case "in_progress":
				return <FaSpinner className="text-blue-500 animate-spin" />;
			default:
				return <FaHourglassStart className="text-gray-400" />;
		}
	};

	return (
		<Link
			to={`/tasks/${task.id}`}
			className="group block p-6 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-indigo-200 transition duration-200 relative"
		>
			<button
				onClick={handleDelete}
				className="absolute top-4 right-4 p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors z-10"
				title="Delete task"
			>
				<FaTrash />
			</button>

			<div className="flex justify-between items-start mb-2 pr-8">
				<h5 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-1">
					{task.title}
				</h5>
			</div>

			<div className="flex items-center gap-2 mb-3">
				{getStatusIcon(task.status)}
				<span
					className={`px-2 py-0.5 text-xs font-medium rounded-full uppercase tracking-wider ${
						task.status === "complete"
							? "bg-green-100 text-green-700"
							: task.status === "in_progress"
								? "bg-blue-100 text-blue-700"
								: "bg-gray-100 text-gray-600"
					}`}
				>
					{task.status.replace("_", " ")}
				</span>
			</div>

			<p className="font-normal text-gray-500 mb-4 line-clamp-3 text-sm h-10">
				{task.description}
			</p>
			<div className="flex items-center text-xs text-gray-400 mt-2 border-t pt-3 border-gray-100">
				<FaCalendarAlt className="mr-1.5" />
				{task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No Date"}
			</div>
		</Link>
	);
}

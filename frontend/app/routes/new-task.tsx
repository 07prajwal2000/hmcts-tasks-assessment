import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { createTask, type CreateTaskDto } from "../services/taskService";
import { TaskForm } from "../components/TaskForm";
import { FaTimes } from "react-icons/fa";

export function meta() {
	return [
		{ title: "New Task" },
		{ name: "description", content: "Create a new task" },
	];
}

export default function NewTask() {
	const navigate = useNavigate();
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (data: CreateTaskDto) => {
		setLoading(true);
		setError(null);

		// Validate date
		if (!data.dueDate) {
			setError("Due date is required");
			setLoading(false);
			return;
		}

		try {
			await createTask(data);
			navigate("/");
		} catch (err: any) {
			setError(err.message || "Something went wrong");
			setLoading(false);
		}
	};

	return (
		<div className="container mx-auto p-4 max-w-2xl min-h-screen flex items-center justify-center">
			<div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 w-full animate-fade-in-up">
				<div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
					<h1 className="text-2xl font-bold text-gray-800 tracking-tight">
						Create New Task
					</h1>
					<Link
						to="/"
						aria-label="Close"
						className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full"
					>
						<FaTimes className="w-5 h-5" />
					</Link>
				</div>

				<TaskForm
					mode="create"
					onSubmit={handleSubmit}
					loading={loading}
					error={error}
				/>
			</div>
		</div>
	);
}

import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
	getTask,
	updateTask,
	deleteTask,
	type Task,
	type CreateTaskDto,
} from "../services/taskService";
import { TaskForm } from "../components/TaskForm";
import { FaArrowLeft } from "react-icons/fa";

export function meta() {
	return [
		{ title: "Task Details" },
		{ name: "description", content: "View and edit task details" },
	];
}

export default function TaskInfo() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [task, setTask] = useState<Task | null>(null);
	const [loading, setLoading] = useState(true);
	const [saving, setSaving] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (!id) return;
		getTask(id)
			.then((data) => {
				setTask(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, [id]);

	const handleSubmit = async (data: CreateTaskDto) => {
		if (!id) return;

		setSaving(true);
		setError(null);

		try {
			await updateTask(id, data);
			navigate("/");
		} catch (err: any) {
			setError(err.message);
			setSaving(false);
		}
	};

	const handleDelete = async () => {
		if (!id) return;
		if (confirm("Are you sure you want to delete this task?")) {
			try {
				await deleteTask(parseInt(id));
				navigate("/");
			} catch (err: any) {
				setError("Failed to delete task: " + err.message);
			}
		}
	};

	if (loading)
		return (
			<div className="flex justify-center p-8 text-gray-600">
				Loading task...
			</div>
		);
	if (error && !task)
		return (
			<div className="flex justify-center p-8 text-red-500">Error: {error}</div>
		);
	if (!task)
		return (
			<div className="flex justify-center p-8 text-gray-500">
				Task not found
			</div>
		);

	return (
		<div className="container mx-auto p-4 max-w-2xl min-h-screen flex items-center justify-center">
			<div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 w-full animate-fade-in-up">
				<div className="bg-gradient-to-r from-gray-50 to-white px-8 py-6 border-b border-gray-100 flex justify-between items-center">
					<h1 className="text-2xl font-bold text-gray-800 tracking-tight">
						Edit Task
					</h1>
					<Link
						to="/"
						aria-label="Back to Tasks"
						className="text-gray-400 hover:text-gray-600 transition p-1 hover:bg-gray-100 rounded-full"
					>
						<FaArrowLeft className="w-5 h-5" />
					</Link>
				</div>

				<TaskForm
					mode="edit"
					initialData={task}
					onSubmit={handleSubmit}
					loading={saving}
					error={error}
					onDelete={handleDelete}
				/>
			</div>
		</div>
	);
}

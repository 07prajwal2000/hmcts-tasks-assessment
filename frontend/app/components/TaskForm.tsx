import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { CreateTaskDto, Task } from "../services/taskService";
import {
	FaCalendarAlt,
	FaSpinner,
	FaSave,
	FaPlus,
	FaTimes,
	FaTrash,
} from "react-icons/fa";

interface TaskFormProps {
	initialData?: Task | CreateTaskDto;
	mode: "create" | "edit";
	onSubmit: (data: CreateTaskDto) => Promise<void>;
	loading?: boolean;
	error?: string | null;
	onDelete?: () => void;
}

export function TaskForm({
	initialData,
	mode,
	onSubmit,
	loading = false,
	error,
	onDelete,
}: TaskFormProps) {
	const [formData, setFormData] = useState<CreateTaskDto>({
		title: "",
		description: "",
		status: "pending",
		dueDate: new Date().toISOString().split("T")[0],
	});

	// Update form data when initialData changes (e.g. after fetch in edit mode)
	useEffect(() => {
		if (initialData) {
			setFormData({
				title: initialData.title || "",
				description: initialData.description || "",
				status: initialData.status || "pending",
				dueDate: initialData.dueDate
					? new Date(initialData.dueDate).toISOString().split("T")[0]
					: new Date().toISOString().split("T")[0],
			});
		}
	}, [initialData]);

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		} as any);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSubmit(formData);
	};

	const isEdit = mode === "edit";

	return (
		<form onSubmit={handleSubmit} className="px-8 py-8 space-y-6">
			{error && (
				<div
					className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-4 text-sm shadow-sm flex items-start"
					role="alert"
				>
					<div>
						<p className="font-medium">Error</p>
						<p>{error}</p>
					</div>
				</div>
			)}

			{isEdit && initialData && "id" in initialData && (
				<div className="space-y-1">
					<label className="block text-sm font-semibold text-gray-700">
						Task ID
					</label>
					<input
						type="text"
						value={initialData.id}
						readOnly
						disabled
						className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-gray-500 cursor-not-allowed focus:outline-none transition shadow-sm font-mono text-sm"
					/>
				</div>
			)}

			<div className="space-y-1">
				<label className="block text-sm font-semibold text-gray-700">
					Title
				</label>
				<input
					type="text"
					name="title"
					required
					maxLength={255}
					value={formData.title}
					onChange={handleChange}
					className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm placeholder-gray-400"
					placeholder="e.g., Complete project proposal"
				/>
			</div>

			<div className="space-y-1">
				<label className="block text-sm font-semibold text-gray-700">
					Description
				</label>
				<textarea
					name="description"
					required
					maxLength={255}
					value={formData.description}
					onChange={handleChange}
					rows={4}
					className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm resize-none placeholder-gray-400"
					placeholder="Details about the task..."
				/>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
				<div className="space-y-1">
					<label className="block text-sm font-semibold text-gray-700">
						Status
					</label>
					<div className="relative">
						<select
							name="status"
							value={formData.status}
							onChange={handleChange}
							className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm bg-white appearance-none cursor-pointer"
						>
							<option value="pending">Pending</option>
							<option value="in_progress">In Progress</option>
							<option value="complete">Complete</option>
						</select>
						<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M19 9l-7 7-7-7"
								></path>
							</svg>
						</div>
					</div>
				</div>

				<div className="space-y-1">
					<label className="block text-sm font-semibold text-gray-700">
						Due Date
					</label>
					<div className="relative">
						<input
							type="date"
							name="dueDate"
							required
							value={formData.dueDate}
							onChange={handleChange}
							className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-sm cursor-pointer"
						/>
					</div>
				</div>
			</div>

			<div className="pt-6 flex items-center justify-between border-t border-gray-50 mt-4">
				{isEdit && onDelete ? (
					<button
						type="button"
						onClick={onDelete}
						className="px-6 py-2.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100 border border-transparent font-medium transition shadow-sm hover:shadow flex items-center gap-2"
					>
						<FaTrash />
						Delete
					</button>
				) : (
					<div></div>
				)}

				<div className="flex items-center space-x-4">
					<Link
						to="/"
						className="px-6 py-2.5 rounded-lg text-gray-600 bg-white hover:bg-gray-50 border border-gray-200 font-medium transition shadow-sm hover:shadow flex items-center gap-2"
					>
						<FaTimes />
						Cancel
					</Link>
					<button
						type="submit"
						disabled={loading}
						className={`px-6 py-2.5 rounded-lg text-white font-medium shadow-md transition-all transform active:scale-95 flex items-center gap-2 ${loading ? "bg-indigo-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 hover:shadow-lg"}`}
					>
						{loading ? (
							<>
								<FaSpinner className="animate-spin" />
								{isEdit ? "Saving..." : "Creating..."}
							</>
						) : isEdit ? (
							<>
								<FaSave />
								Save Changes
							</>
						) : (
							<>
								<FaPlus />
								Create Task
							</>
						)}
					</button>
				</div>
			</div>
		</form>
	);
}

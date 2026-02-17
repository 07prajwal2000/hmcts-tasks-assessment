const API_URL =
	(typeof window !== "undefined"
		? (import.meta as any).env?.VITE_API_URL
		: process.env.API_URL) || "http://localhost:3000/api/tasks";

export interface Task {
	id: number;
	title: string;
	description: string;
	status: "pending" | "in_progress" | "complete";
	dueDate: string;
}

export interface CreateTaskDto {
	title: string;
	description: string;
	status: "pending" | "in_progress" | "complete";
	dueDate: string;
}

export interface UpdateTaskDto {
	title: string;
	description: string;
	status: "pending" | "in_progress" | "complete";
	dueDate: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
	if (!response.ok) {
		let errorData;
		try {
			errorData = await response.json();
		} catch {
			throw new Error(response.statusText || "Network response was not ok");
		}

		if (
			errorData.type === "validation" &&
			typeof errorData.error === "object"
		) {
			const messages = Object.entries(errorData.error)
				.map(([key, msg]) => `${key}: ${msg}`)
				.join(", ");
			throw new Error(messages);
		} else if (errorData.error) {
			throw new Error(
				typeof errorData.error === "string"
					? errorData.error
					: JSON.stringify(errorData.error),
			);
		} else {
			throw new Error("An error occurred");
		}
	}
	return response.json();
}

export async function getTasks(): Promise<Task[]> {
	const response = await fetch(API_URL);
	if (!response.ok) {
		throw new Error("Failed to fetch tasks");
	}
	const data = await response.json();
	return data;
}

export async function getTask(id: string): Promise<Task> {
	const response = await fetch(`${API_URL}/${id}`);
	return handleResponse<Task>(response);
}

export async function createTask(task: CreateTaskDto): Promise<Task> {
	const response = await fetch(API_URL, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	});
	return handleResponse<Task>(response);
}

export async function updateTask(
	id: string,
	task: UpdateTaskDto,
): Promise<Task> {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(task),
	});
	return handleResponse<Task>(response);
}

export async function deleteTask(id: number): Promise<void> {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
	});
	return handleResponse<void>(response);
}

import type {
	CreateTaskDto,
	DeleteTaskDto,
	IdTaskDto,
	UpdateTaskDto,
} from "./dto";
import {
	createTaskDB,
	deleteTaskDB,
	getTaskByIdDB,
	getTasksListDB,
	updateTaskDB,
} from "./repository";

export async function getTasksList() {
	const tasks = await getTasksListDB();
	return tasks.map((task) => ({
		id: task.id,
		title: task.title,
		description: task.description,
		status: task.status,
		dueDate: task.dueDate,
	}));
}

export async function getTask(taskId: IdTaskDto) {
	const task = await getTaskByIdDB(taskId.id);
	if (!task || task.length === 0) {
		return null;
	}
	const singleTask = task[0]!;
	return {
		id: singleTask.id,
		title: singleTask.title,
		description: singleTask.description,
		status: singleTask.status,
		dueDate: singleTask.dueDate,
	};
}

export async function createTask(task: CreateTaskDto) {
	const newTask = await createTaskDB(task);
	const createdTask = newTask[0]!;
	return {
		id: createdTask.id,
		title: createdTask.title,
		description: createdTask.description,
		status: createdTask.status,
		dueDate: createdTask.dueDate,
	};
}

export async function updateTask(taskId: IdTaskDto, task: UpdateTaskDto) {
	const updatedTask = await updateTaskDB(taskId.id, task);
	if (!updatedTask || updatedTask.length === 0) {
		return null;
	}
	const updatedTaskData = updatedTask[0]!;
	return {
		id: updatedTaskData.id,
		title: updatedTaskData.title,
		description: updatedTaskData.description,
		status: updatedTaskData.status,
		dueDate: updatedTaskData.dueDate,
	};
}

export async function deleteTask(taskId: DeleteTaskDto) {
	const result = await deleteTaskDB(taskId.id);
	if (!result || result.rowCount === 0) {
		return null;
	}
	return { id: taskId.id };
}

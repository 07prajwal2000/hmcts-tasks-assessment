import { db } from "../../db/db";
import { taskDbSchema } from "../../db/schema";
import type { CreateTaskDto, UpdateTaskDto } from "./dto";
import { eq } from "drizzle-orm";

export async function getTasksListDB() {
	return await db.select().from(taskDbSchema);
}

export async function getTaskByIdDB(taskId: number) {
	return await db
		.select()
		.from(taskDbSchema)
		.where(eq(taskDbSchema.id, taskId));
}

export async function createTaskDB(task: CreateTaskDto) {
	return await db.insert(taskDbSchema).values(task).returning();
}

export async function updateTaskDB(taskId: number, task: UpdateTaskDto) {
	return await db
		.update(taskDbSchema)
		.set(task)
		.where(eq(taskDbSchema.id, taskId))
		.returning();
}

export async function deleteTaskDB(taskId: number) {
	return await db.delete(taskDbSchema).where(eq(taskDbSchema.id, taskId));
}

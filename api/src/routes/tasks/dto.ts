import { z } from "zod";
import { taskStatusEnum } from "../../db/schema";

// export schemas
export const taskStatusSchema = z.enum(taskStatusEnum.enumValues);

export const createTaskSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().min(1).max(255),
	status: taskStatusSchema,
	dueDate: z.coerce.date(),
});

export const updateTaskSchema = z.object({
	title: z.string().min(1).max(255),
	description: z.string().min(1).max(255),
	status: taskStatusSchema,
	dueDate: z.coerce.date(),
});

export const taskIdSchema = z.object({
	id: z.coerce.number().min(1),
});

export const getTaskSchema = z.object({
	id: z.coerce.number().min(1),
	title: z.string().min(1).max(255),
	description: z.string().min(1).max(255),
	status: taskStatusSchema,
	dueDate: z.coerce.date(),
});

export const getTaskListSchema = z.array(getTaskSchema);

// export types
export type IdTaskDto = z.infer<typeof taskIdSchema>;

export type GetTaskListDto = z.infer<typeof getTaskListSchema>;

export type GetTaskDto = z.infer<typeof getTaskSchema>;

export type UpdateTaskDto = z.infer<typeof updateTaskSchema>;

export type CreateTaskDto = z.infer<typeof createTaskSchema>;

export type DeleteTaskDto = IdTaskDto;

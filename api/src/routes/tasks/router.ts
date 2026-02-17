import { Hono } from "hono";
import {
	getTasksList,
	createTask,
	updateTask,
	deleteTask,
	getTask,
} from "./service";
import { createTaskSchema, taskIdSchema, updateTaskSchema } from "./dto";
import { zValidator } from "@hono/zod-validator";
import { parseZodError } from "../middleware";

export function mapTaskRouter() {
	const app = new Hono();

	// GET /tasks/ - get a list of tasks
	app.get("/", async (c) => {
		const tasks = await getTasksList();
		return c.json(tasks);
	});

	// GET /tasks/:id - get a task by id
	app.get(
		"/:id",
		zValidator("param", taskIdSchema, parseZodError),
		async (c) => {
			const params = c.req.valid("param");
			const task = await getTask(params);
			if (!task) {
				return c.json({ error: "Task not found" }, 404);
			}
			return c.json(task);
		},
	);

	// POST /tasks/ - create a task
	app.post(
		"/",
		zValidator("json", createTaskSchema, parseZodError),
		async (c) => {
			const body = c.req.valid("json");
			const task = await createTask(body);
			return c.json(task);
		},
	);

	// PUT /tasks/:id - update a task by id
	app.put(
		"/:id",
		zValidator("param", taskIdSchema, parseZodError),
		zValidator("json", updateTaskSchema, parseZodError),
		async (c) => {
			const body = c.req.valid("json");
			const params = c.req.valid("param");
			const task = await updateTask(params, body);
			if (!task) {
				return c.json({ error: "Task not found" }, 404);
			}
			return c.json(task);
		},
	);

	// DELETE /tasks/:id - delete a task by id
	app.delete(
		"/:id",
		zValidator("param", taskIdSchema, parseZodError),
		async (c) => {
			const params = c.req.valid("param");
			const task = await deleteTask(params);
			if (!task) {
				return c.json({ error: "Task not found" }, 404);
			}
			return c.json(task);
		},
	);

	return app;
}

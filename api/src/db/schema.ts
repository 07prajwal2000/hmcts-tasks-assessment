import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const taskStatusEnum = pgEnum("status", [
	"pending",
	"in_progress",
	"complete",
]);

export const taskDbSchema = pgTable("tasks", {
	id: serial("id").primaryKey(),
	title: text("title").notNull(),
	description: text("description").notNull(),
	status: taskStatusEnum("status").notNull(),
	dueDate: timestamp("due_date").notNull(),
});

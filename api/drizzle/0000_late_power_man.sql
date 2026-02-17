CREATE TYPE "public"."status" AS ENUM('pending', 'in_progress', 'complete');--> statement-breakpoint
CREATE TABLE "tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text NOT NULL,
	"status" "status" NOT NULL,
	"due_date" timestamp NOT NULL
);

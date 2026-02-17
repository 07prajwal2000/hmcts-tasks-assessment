import type { Hono } from "hono";
import { mapTaskRouter } from "./tasks/router";

export function mapApplicationController(app: Hono) {
	app.route("/api/tasks", mapTaskRouter());
	app.onError((err, c) => {
		console.error(err);
		return c.json({ error: "Internal server error" }, 500);
	});
}

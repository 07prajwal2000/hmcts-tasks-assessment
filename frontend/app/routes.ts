import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
	index("routes/home.tsx"),
	route("new", "routes/new-task.tsx"),
	route("tasks/:id", "routes/task-info.tsx"),
] satisfies RouteConfig;

import { Hono } from "hono";
import { mapApplicationController } from "./routes/controller";
import { cors } from "hono/cors";

const app = new Hono();
app.use(
	"*",
	cors({
		origin: (origin) => {
			if (origin?.startsWith("http://localhost:")) {
				return origin;
			}
			return null;
		},
		allowHeaders: ["Content-Type", "Authorization", "Accept"],
		allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
		credentials: true,
	}),
);
mapApplicationController(app);
export default app;

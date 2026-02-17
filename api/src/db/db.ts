import { drizzle } from "drizzle-orm/node-postgres";

export const db = drizzle(process.env.PG_URL!);
db.execute("select 1").then(() => console.log("Database connected"));

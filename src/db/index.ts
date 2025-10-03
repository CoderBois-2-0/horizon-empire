import { drizzle } from "drizzle-orm/neon-http";
import * as regionSchema from "./region/schema.js";

function connectDB(dbUrl: string) {
	return drizzle(dbUrl, { schema: { ...regionSchema } });
}

export { connectDB };

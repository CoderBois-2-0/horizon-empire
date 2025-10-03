import { drizzle } from "drizzle-orm/neon-http";
import * as mapShcema from "./map/schema.js";
import * as regionSchema from "./region/schema.js";

function connectDB(dbUrl: string) {
	return drizzle(dbUrl, { schema: { ...regionSchema, ...mapShcema } });
}

export { connectDB };

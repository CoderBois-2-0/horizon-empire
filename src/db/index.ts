import { drizzle } from 'drizzle-orm/neon-http';
import * as userSchema from "./user/schema.js"

function connectDB(dbUrl: string) {
	return drizzle(dbUrl, { schema: { ...userSchema } });
}

export {
	connectDB
}

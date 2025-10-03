import { drizzle } from "drizzle-orm/neon-http";
import * as mapShcema from "./map/schema.js";

function connectDB(dbUrl: string) {
  return drizzle(dbUrl, { schema: { ...mapShcema } });
}

export { connectDB };

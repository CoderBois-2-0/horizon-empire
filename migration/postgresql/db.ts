import { connectDB } from "../../src/db/sql/index.js";

export type TDB = ReturnType<typeof connectDB>;

export function connectToDB() {
  const dbUrl = process.env.DB_LOCAL;
  // const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error("DB environment variable is not set");

  return connectDB(dbUrl);
}

import { getConn } from "../../src/db/document/index.js";

export async function connectToMongoDB() {
  const mongoUrl = process.env.DOCUMENT_DB_URL_LOCAL;
  if (!mongoUrl) throw new Error("Document DB environment variable is not set");

  const connection = await getConn(mongoUrl);
  console.log("Connected to MongoDB");
  return connection;
}

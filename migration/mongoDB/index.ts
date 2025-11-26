import { fetchPostgreSQLData } from "../postgresql/fetchPostgresData.js";
import { transformToMongo } from "./transform.js";
import { MongoClient } from "./db.js";

async function migrateToMongoDB() {
  const data = await fetchPostgreSQLData();
  if (!data) {
    console.log("No data fetched from PostgreSQL");
    return;
  }

  // Transform the data
  const mongo = transformToMongo(data);
  const buildings = mongo.buildings;

  // Validate env and create client
  const mongoUrl = process.env.MONGO_URL;
  if (!mongoUrl) {
    throw new Error("MONGO_URL environment variable is not set");
  }

  // const client = new MongoClient(mongoUrl);

  // try {
  //   await client.connect();
  //   const db = client.db("game");

  //   // Insert into MongoDB
  //   await db.collection("buildings").insertMany(buildings);

  //   console.log(`✅ Migrated ${buildings.length} buildings to MongoDB`);
  // } finally {
  //   await client.close();
  // }
}

migrateToMongoDB().catch(console.error);

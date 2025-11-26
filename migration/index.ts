import { fetchPostgreSQLData } from "./postgresql/fetchPostgresData.js";
import { transformToMongo } from "./mongoDB/transform.js";

async function migrateData() {
  try {
    // migrating to mongo
    const sql = await fetchPostgreSQLData();
    const mongo = transformToMongo(sql);
  } catch (error) {
    console.error("Error migrating data to mongoDB:", error);
  }

  // TODO: later insert migraton to neo4j

  console.log("Migrated all data successfully!");
}

// migrateData()

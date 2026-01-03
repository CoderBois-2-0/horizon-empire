import { fetchPostgreSQLData } from "./postgresql/fetchPostgresData.js";
import dotenv from "dotenv";
import { migrateToMongo } from "./mongoDB/index.js";
dotenv.config();

async function migrateData() {
  try {
    const sql = await fetchPostgreSQLData();

    console.log("Fetched SQL data:");
    console.log("Users:", sql.users.length);
    console.log("Cities:", sql.cities.length);
    console.log("Regions:", sql.regions.length);
    console.log("Buildings:", sql.buildings.length);
    console.log("Maps:", sql.maps.length);
    console.log("Tiles:", sql.tiles.length);
    console.log("Persons:", sql.persons.length);
    console.log("Jobs:", sql.jobs.length);

    try {
      await migrateToMongo(sql);
    } catch (error) {
      console.error("Error migrating to MongoDB:", error);
    }

    // try {
    //   await migrateToNeo4j(sql);
    // } catch (error) {
    //   console.log("Error migrating to Neo4j:", error);
    // }

    console.log("Migration finished");
    process.exit(0);
  } catch (error) {
    console.error("Error migrating data to mongoDB:", error);
    process.exit(1);
  }
}

migrateData();

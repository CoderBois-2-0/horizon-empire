import { PostgresData } from "../postgresql/fetchPostgresData.js";
import { connectToNeo4j } from "./db.js";
import { transformSqlToNeo4j } from "./transform.js";
import { Driver } from "neo4j-driver";

export async function migrateToNeo4j(data: PostgresData | null) {
  if (!data) {
    console.error("no SQL data fetched, for migration");
    return;
  }

  let driver: Driver | null = null;

  try {
    driver = await connectToNeo4j();
    const session = driver.session();

    console.log("Transforming SQL data to Neo4j format...");
    const graphData = transformSqlToNeo4j(data);

    console.log("Clearing existing data...");
    await session.run("MATCH (n) DETACH DELETE n");

    console.log("Creating Users...");
    for (const user of graphData.createUser) {
      await session.run(
        "CREATE (u:User {id: $id, username: $username, password: $password})",
        user,
      );
    }
    console.log(`Created ${graphData.createUser.length} users`);

    console.log("Creating Resources...");
    for (const resource of graphData.createResource) {
      await session.run("CREATE (r:Resource {id: $id, name: $name})", resource);
    }
    console.log(`Created ${graphData.createResource.length} resources`);

    console.log("Creating TileTypes...");
    for (const tileType of graphData.createTileType) {
      await session.run("CREATE (t:TileType {id: $id, name: $name})", tileType);
    }
    console.log(`Created ${graphData.createTileType.length} tile types`);

    console.log("Creating Buildings...");
    for (const building of graphData.createBuilding) {
      await session.run(
        "CREATE (b:Building {id: $id, name: $name, type: $type, tilesNeeded: $tilesNeeded, maxPersons: $maxPersons})",
        building,
      );
    }
    console.log(`Created ${graphData.createBuilding.length} buildings`);

    console.log("Creating Cities...");
    for (const city of graphData.createCity) {
      await session.run("CREATE (c:City {id: $id, name: $name})", city);
    }
    console.log(`Created ${graphData.createCity.length} cities`);

    console.log("Creating Regions...");
    for (const region of graphData.createRegion) {
      await session.run(
        "CREATE (r:Region {id: $id, name: $name, isUnlocked: $isUnlocked})",
        region,
      );
    }
    console.log(`Created ${graphData.createRegion.length} regions`);

    console.log("Creating Tiles...");
    for (const tile of graphData.createTile) {
      await session.run("CREATE (t:Tile {id: $id})", tile);
    }
    console.log(`Created ${graphData.createTile.length} tiles`);

    console.log("Creating PlacedBuildings...");
    for (const pb of graphData.createPlacedBuilding) {
      await session.run("CREATE (p:PlacedBuilding {id: $id})", pb);
    }
    console.log(
      `Created ${graphData.createPlacedBuilding.length} placed buildings`,
    );

    console.log("Creating Inventories...");
    for (const inv of graphData.createInventory) {
      await session.run("CREATE (i:Inventory {id: $id})", inv);
    }
    console.log(`Created ${graphData.createInventory.length} inventories`);

    console.log("Creating Jobs...");
    for (const job of graphData.createJob) {
      await session.run(
        "CREATE (j:Job {id: $id, name: $name, type: $type, income: $income})",
        job,
      );
    }
    console.log(`Created ${graphData.createJob.length} jobs`);

    console.log("Creating Relationships...");
    for (const rel of graphData.createRelationships) {
      const query = `
        MATCH (from:${rel.fromLabel} {id: $fromId})
        MATCH (to:${rel.toLabel} {id: $toId})
        CREATE (from)-[:${rel.relationshipType}]->(to)
      `;
      await session.run(query, {
        fromId: rel.from,
        toId: rel.to,
      });
    }
    console.log(
      `Created ${graphData.createRelationships.length} relationships`,
    );

    await session.close();
    console.log("Migration to Neo4j completed successfully!");
  } catch (error) {
    console.error("Error during migration to Neo4j:", error);
    throw error;
  } finally {
    if (driver) {
      await driver.close();
    }
  }
}

import neo4j from "neo4j-driver";

export async function connectToNeo4j() {
  const neoUri = process.env.NEO4J_URI;
  const neoUser = process.env.NEO4J_USERNAME;
  const neoPw = process.env.NEO4J_PASSWORD;

  if (!neoUri || !neoUser || !neoPw) {
    throw new Error("Graph DB environment variables are not set");
  }

  const driver = neo4j.driver(neoUri, neo4j.auth.basic(neoUser, neoPw));
  console.log("Connected to Neo4j");
  return driver;
}

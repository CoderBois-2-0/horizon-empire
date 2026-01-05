import neo4j, { Driver } from "neo4j-driver";

export function makeNeo4jDriver(): Driver {
  const uri = process.env.NEO4J_URI ?? "neo4j://localhost:7687";
  const user = process.env.NEO4J_USER ?? "neo4j";
  const password = process.env.NEO4J_PASSWORD ?? "password";

  return neo4j.driver(uri, neo4j.auth.basic(user, password));
}

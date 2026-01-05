export const CITY_CYPHER = {
  getById: `
    MATCH (u:User)-[:OWNS]->(c:City {id: $id})-[:ON_MAP]->(m:Map)
    RETURN c { .id, .name, userID: u.id, mapID: m.id } AS city
  `,

  create: `
    MATCH (u:User {id: $userID})
    MATCH (m:Map  {id: $mapID})
    CREATE (c:City { id: randomUUID(), name: $name })
    MERGE (u)-[:OWNS]->(c)
    MERGE (c)-[:ON_MAP]->(m)
    RETURN c { .id, .name, userID: u.id, mapID: m.id } AS city
  `,

  deleteById: `
    MATCH (c:City {id: $id})
    DETACH DELETE c
    RETURN $id AS id
  `,
} as const;

/**
 * Neo4j schema constraints for City.
 * Run once on startup or via migration.
 */
export const CITY_CONSTRAINTS = [
  `
  CREATE CONSTRAINT city_id_unique IF NOT EXISTS
  FOR (c:City) REQUIRE c.id IS UNIQUE
  `,
] as const;

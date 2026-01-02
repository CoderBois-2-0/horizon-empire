export const USER_CYPHER = {
  getById: `
    MATCH (u:User {id: $id})
    RETURN u { .id, .username } AS user
  `,

  getByUsername: `
    MATCH (u:User {username: $username})
    RETURN u { .id, .username } AS user
  `,

  create: `
    CREATE (u:User {
      id: randomUUID(),
      username: $username,
      password: $password
    })
    RETURN u { .id, .username } AS user
  `,

  deleteByIdCascadeCities: `
    MATCH (u:User {id: $id})
    OPTIONAL MATCH (u)-[:OWNS]->(c:City)
    DETACH DELETE c, u
    RETURN $id AS id
  `,
} as const;

/**
 * Neo4j schema constraints for User.
 * Run once (or on startup with IF NOT EXISTS).
 */
export const USER_CONSTRAINTS = [
  `
  CREATE CONSTRAINT user_id_unique IF NOT EXISTS
  FOR (u:User) REQUIRE u.id IS UNIQUE
  `,
  `
  CREATE CONSTRAINT user_username_unique IF NOT EXISTS
  FOR (u:User) REQUIRE u.username IS UNIQUE
  `,
] as const;

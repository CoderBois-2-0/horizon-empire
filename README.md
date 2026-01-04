# Horizon Empire

A city builder game, currently only scoped as an API. It is meant to serve as our final project for our database course.

---

## Migration script

To run the migration script open terminal and write:

```
docker compose -f docker-compose.yml -f docker-compose.override.yml up -d
```

and to stop it write:

```
docker compose -f docker-compose.yml -f docker-compose.override.yml down -v
```

1. Start stack:

```
docker compose -f [docker-compose.yml](http://_vscodecontentref_/0) -f [docker-compose.override.yml](http://_vscodecontentref_/1) up -d
```

2. Run migration:

```
pnpm tsx ./migration/index.ts
```

3. Verify:

Mongo:

```
docker exec mongo-Horizon mongosh horizon-empire --eval "db.users.countDocuments()"
```

Neo4j:

```
docker exec -it neo4jdb-Horizon cypher-shell -u neo4j -p 12345678 "MATCH (n) RETURN count(n);"
```

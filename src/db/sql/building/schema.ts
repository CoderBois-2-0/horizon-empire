import { integer, pgEnum, pgTable, varchar } from "drizzle-orm/pg-core";

const buildingType = pgEnum("building_type", [
  "housing",
  "work",
  "service",
  "educational",
]);

const buildingTable = pgTable("buildings", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 32 }).notNull(),
  buildingType: buildingType("type").notNull(),
  tilesUsed: integer("tiles_used").notNull(),
  maxEntities: integer("max_entities").notNull(),
});

export { buildingTable, buildingType };

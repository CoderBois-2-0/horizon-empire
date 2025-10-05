import { integer, pgEnum, pgTable, real, text, varchar } from "drizzle-orm/pg-core";

const buildingType = pgEnum("building_type", ["housing", "work", "service", "educational"]);

const buildingTable = pgTable("building", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 32 }).notNull(),
  resourceCost: real("resource_cost").notNull(),
  buildingType: buildingType("type").notNull(),
  tilesUsed: integer("tiles_used").notNull(),
  maxEntities: integer("max_entities").notNull(),
  buildableOnTilesType: text().array().notNull(),
});

export { buildingTable, buildingType };
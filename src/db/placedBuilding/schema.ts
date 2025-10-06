import { pgTable, varchar, foreignKey } from "drizzle-orm/pg-core";
import { tileType } from "$db/tileType/schema.js";
import { buildingTable } from "$db/building/schema.js";
import { cityTable } from "$db/city/schema.js";

const placedBuildingTable = pgTable(
  "placed_buildings",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    buildingID: varchar("building_id", { length: 36 })
      .notNull()
      .references(() => buildingTable.id, { onDelete: "cascade" }),
    cityID: varchar("city_id", { length: 36 })
      .notNull()
      .references(() => cityTable.id, { onDelete: "cascade" }),
    buildOnTiles: tileType("build_on_tiles").array().notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.buildingID],
      foreignColumns: [buildingTable.id],
    }),
    foreignKey({
      columns: [table.cityID],
      foreignColumns: [cityTable.id],
    }),
  ]
);

export { placedBuildingTable };

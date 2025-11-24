import { pgTable, varchar, foreignKey } from "drizzle-orm/pg-core";
import { buildingTable } from "$db/building/schema.js";
import { cityTable } from "$db/city/schema.js";
import { regionsTable } from "$db/region/schema";

const placedBuildingTable = pgTable(
  "placed_buildings",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    buildingID: varchar("building_id", { length: 36 }).notNull(),
    cityID: varchar("city_id", { length: 36 }).notNull(),
    regionID: varchar("region_id", { length: 36 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.buildingID],
      foreignColumns: [buildingTable.id],
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.cityID],
      foreignColumns: [cityTable.id],
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.regionID],
      foreignColumns: [regionsTable.id],
    }).onDelete("cascade"),
  ],
);

export { placedBuildingTable };

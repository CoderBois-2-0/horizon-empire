import { buildingTable } from "$db/building/schema";
import { tileTypeTable } from "$db/sql/tileType/schema";
import { foreignKey, pgTable, varchar } from "drizzle-orm/pg-core";

const buildingTileTypeTable = pgTable(
  "building_tile_types",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    buildingID: varchar("buiilding_id", { length: 36 }).notNull(),
    tileTypeID: varchar("tile_type_id", { length: 36 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.tileTypeID],
      foreignColumns: [tileTypeTable.id],
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.buildingID],
      foreignColumns: [buildingTable.id],
    }).onDelete("cascade"),
  ]
);

export { buildingTileTypeTable };

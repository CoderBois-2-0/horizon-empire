import { placedBuildingTable } from "$db/placedBuilding/schema";
import { tileTypeTable } from "$db/tileType/schema";
import { foreignKey, pgTable, varchar, integer } from "drizzle-orm/pg-core";

const placedBuildingTileTypeTable = pgTable(
  "placed_building_tile_types",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    placedBuildingID: varchar("placed_buiilding_id", { length: 36 }).notNull(),
    tileTypeID: varchar("tile_type_id", { length: 36 }).notNull(),
    quantity: integer("quantity").notNull().default(0),
  },
  (table) => [
    foreignKey({
      columns: [table.tileTypeID],
      foreignColumns: [tileTypeTable.id],
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.placedBuildingID],
      foreignColumns: [placedBuildingTable.id],
    }).onDelete("cascade"),
  ],
);

export { placedBuildingTileTypeTable };

import { pgTable, varchar, foreignKey } from "drizzle-orm/pg-core";
import { regionsTable } from "$db/sql/region/schema.js";
import { relations } from "drizzle-orm";
import { tileTypeTable } from "$db/sql/tileType/schema.js";

const tileTable = pgTable(
  "tiles",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    tileTypeID: varchar("tile_type_id", { length: 36 }).notNull(),
    regionID: varchar("region_id", { length: 36 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.regionID],
      foreignColumns: [regionsTable.id],
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.tileTypeID],
      foreignColumns: [tileTypeTable.id],
    }).onDelete("cascade"),
  ],
);

const tileRelations = relations(tileTable, ({ one }) => ({
  region: one(regionsTable, {
    fields: [tileTable.regionID],
    references: [regionsTable.id],
  }),
}));

export { tileTable, tileRelations };

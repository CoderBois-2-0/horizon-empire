import { pgTable, varchar, foreignKey } from "drizzle-orm/pg-core";
import { regionsTable } from "$db/region/schema.js";
import { tileType } from "$db/tileType/schema.js";
import { relations } from "drizzle-orm";

const tileTable = pgTable(
  "tiles",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    type: tileType("type").notNull(),
    regionID: varchar("region_id", { length: 36 }),
  },
  (table) => [
    foreignKey({
      columns: [table.regionID],
      foreignColumns: [regionsTable.id],
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

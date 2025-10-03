import { mapTable } from "$db/map/schema.js";
import { relations } from "drizzle-orm";
import { pgTable, foreignKey, varchar } from "drizzle-orm/pg-core";

const regionsTable = pgTable(
  "region",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),
    mapID: varchar("map_id", { length: 36 }).notNull(),
  },
  (table) => [
    foreignKey({ columns: [table.mapID], foreignColumns: [mapTable.id] }),
  ],
);

const regionRelation = relations(regionsTable, ({ one }) => ({
  map: one(mapTable, {
    fields: [regionsTable.mapID],
    references: [mapTable.id],
  }),
}));

export { regionsTable, regionRelation };

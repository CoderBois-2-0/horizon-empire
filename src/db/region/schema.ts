import { mapTable } from "$db/map/schema.js";
import { getTableColumns, relations, sql } from "drizzle-orm";
import {
  pgTable,
  foreignKey,
  varchar,
  boolean,
  pgView,
} from "drizzle-orm/pg-core";

const regionsTable = pgTable(
  "regions",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),
    mapID: varchar("map_id", { length: 36 }).notNull(),
    isUnlocked: boolean("is_unlocked").notNull().default(false),
  },
  (table) => [
    foreignKey({
      columns: [table.mapID],
      foreignColumns: [mapTable.id],
    }).onDelete("cascade"),
  ],
);

const regionRelation = relations(regionsTable, ({ one }) => ({
  map: one(mapTable, {
    fields: [regionsTable.mapID],
    references: [mapTable.id],
  }),
}));

const regionWithTotalTiles = pgView("region_with_total_tiles").as((qb) =>
  qb
    .select({
      ...getTableColumns(regionsTable),
      totalTiles: sql`total_region_tiles(${regionsTable.id})`.as("total_tiles"),
    })
    .from(regionsTable),
);

export { regionsTable, regionRelation, regionWithTotalTiles };

import { pgTable, varchar, foreignKey } from "drizzle-orm/pg-core";
import { placedBuildingTable } from "$db/placedBuilding/schema.js";
import { relations } from "drizzle-orm";

const occupationTable = pgTable(
  "occupations",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),
    placedBuildingID: varchar("placed_building_id", { length: 36 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.placedBuildingID],
      foreignColumns: [placedBuildingTable.id],
    }).onDelete("cascade"),
  ],
);

const occupationRelation = relations(occupationTable, ({ one }) => ({
  placedBuilding: one(placedBuildingTable, {
    fields: [occupationTable.placedBuildingID],
    references: [placedBuildingTable.id],
  }),
}));

export { occupationTable, occupationRelation };

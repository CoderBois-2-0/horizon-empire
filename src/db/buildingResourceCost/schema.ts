import {
  integer,
  pgTable,
  varchar,
  primaryKey,
  foreignKey,
} from "drizzle-orm/pg-core";
import { buildingTable } from "$db/building/schema.js";
import { resourceTable } from "$db/resource/schema.js";

const buildingResourceCostTable = pgTable(
  "building_resource_costs",
  {
    id: varchar("id", { length: 36 }),
    buildingID: varchar("building_id", { length: 36 }).notNull(),
    resourceID: varchar("resource_id", { length: 36 }).notNull(),
    amount: integer("amount").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.id] }),
    foreignKey({
      columns: [table.buildingID],
      foreignColumns: [buildingTable.id],
    }),
    foreignKey({
      columns: [table.resourceID],
      foreignColumns: [resourceTable.id],
    }),
  ],
);
export { buildingResourceCostTable };

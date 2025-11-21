import {
  integer,
  pgTable,
  varchar,
  primaryKey,
  foreignKey,
} from "drizzle-orm/pg-core";
import { regionsTable } from "$db/region/schema.js";
import { resourceTable } from "$db/resource/schema.js";

const regionResourceCostTable = pgTable(
  "region_resource_costs",
  {
    id: varchar("id", { length: 36 }).notNull(),
    regionID: varchar("region_id", { length: 36 }).notNull(),
    resourceID: varchar("resource_id", { length: 36 }).notNull(),
    amount: integer("amount").notNull(),
  },
  (table) => [
    primaryKey({ columns: [table.id] }),
    foreignKey({
      columns: [table.regionID],
      foreignColumns: [regionsTable.id],
    }),
    foreignKey({
      columns: [table.resourceID],
      foreignColumns: [resourceTable.id],
    }),
  ],
);
export { regionResourceCostTable };

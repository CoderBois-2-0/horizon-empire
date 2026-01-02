import { foreignKey, pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { resourceTable } from "$db/resource/schema.js";
import { inventoryTable } from "$db/inventory/schema.js";

const inventoryResourceTable = pgTable(
  "inventory_resources",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    resourceID: varchar("resource_id", { length: 36 }).notNull(),
    inventoryID: varchar("inventory_id", { length: 36 }).notNull(),
    quantity: integer("quantity").notNull().default(0),
  },
  (table) => [
    foreignKey({
      columns: [table.resourceID],
      foreignColumns: [resourceTable.id],
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.inventoryID],
      foreignColumns: [inventoryTable.id],
    }).onDelete("cascade"),
  ]
);

export { inventoryResourceTable };

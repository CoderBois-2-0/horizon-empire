import { foreignKey, pgTable, varchar, integer } from "drizzle-orm/pg-core";
import { resourceTable } from "$db/resource/schema.js";
import { resourceInventoryTable } from "$db/resourceInventory/schema.js";

const resourceJunctionTable = pgTable(
  "inventory_resource_junctions",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    resourceID: varchar("resource_id", { length: 36 })
      .notNull()
      .references(() => resourceTable.id, { onDelete: "cascade" }),
    inventoryID: varchar("inventory_id", { length: 36 })
      .notNull()
      .references(() => resourceInventoryTable.id, { onDelete: "cascade" }),
    quantity: integer("quantity").notNull().default(0),
  },
  (table) => [
    foreignKey({
      columns: [table.resourceID],
      foreignColumns: [resourceTable.id],
    }),
    foreignKey({
      columns: [table.inventoryID],
      foreignColumns: [resourceInventoryTable.id],
    }),
  ],
);

export { resourceJunctionTable };

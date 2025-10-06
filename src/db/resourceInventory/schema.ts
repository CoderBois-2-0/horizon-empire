import { cityTable } from "../city/schema.js";
import { pgTable, varchar } from "drizzle-orm/pg-core";

const resourceInventoryTable = pgTable("resource_inventories", {
  id: varchar("id", { length: 36 }).primaryKey(),

  cityID: varchar("city_id", { length: 36 })
    .notNull()
    .references(() => cityTable.id, { onDelete: "cascade" }),
});

export { resourceInventoryTable };

import { cityTable } from "../city/schema.js";
import { foreignKey, pgTable, varchar } from "drizzle-orm/pg-core";

const inventoryTable = pgTable(
  "inventories",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    cityID: varchar("city_id", { length: 36 })
      .notNull()
      .references(() => cityTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    foreignKey({
      columns: [table.cityID],
      foreignColumns: [cityTable.id],
    }),
  ],
);

export { inventoryTable };

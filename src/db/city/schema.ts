import { userTable } from "../user/schema.js";
import { mapTable } from "../map/schema.js";
import { pgTable, varchar } from "drizzle-orm/pg-core";

const cityTable = pgTable("cities", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 64 }).notNull(),

  user_id: varchar("user_id", { length: 36 })
    .notNull()
    .references(() => userTable.id, { onDelete: "cascade" }),

  map_id: varchar("map_id", { length: 36 })
    .notNull()
    .references(() => mapTable.id, { onDelete: "cascade" }),
});

export { cityTable };

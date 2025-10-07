import { userTable } from "$db/user/schema.js";
import { mapTable } from "$db/map/schema.js";
import { foreignKey, pgTable, varchar } from "drizzle-orm/pg-core";

const cityTable = pgTable(
  "cities",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),

    userID: varchar("user_id", { length: 36 })
      .notNull()
      .references(() => userTable.id, { onDelete: "cascade" }),

    mapID: varchar("map_id", { length: 36 })
      .notNull()
      .references(() => mapTable.id, { onDelete: "cascade" }),
  },
  (table) => [
    foreignKey({
      columns: [table.userID],
      foreignColumns: [userTable.id],
    }),
    foreignKey({
      columns: [table.mapID],
      foreignColumns: [mapTable.id],
    }),
  ],
);

export { cityTable };

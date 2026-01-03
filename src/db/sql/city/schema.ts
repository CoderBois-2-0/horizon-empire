import { userTable } from "$db/sql/user/schema.js";
import { mapTable } from "$db/sql/map/schema.js";
import { foreignKey, pgTable, varchar } from "drizzle-orm/pg-core";

const cityTable = pgTable(
  "cities",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),
    userID: varchar("user_id", { length: 36 }).notNull(),
    mapID: varchar("map_id", { length: 36 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.userID],
      foreignColumns: [userTable.id],
    }).onDelete("cascade"),
    foreignKey({
      columns: [table.mapID],
      foreignColumns: [mapTable.id],
    }).onDelete("cascade"),
  ],
);

export { cityTable };

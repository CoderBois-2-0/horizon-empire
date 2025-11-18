import {
  pgTable,
  varchar,
  primaryKey,
  foreignKey,
  timestamp,
} from "drizzle-orm/pg-core";
import { placedBuildingTable } from "$db/placedBuilding/schema";
import { userTable } from "$db/user/schema";

const auditPlacedBuildingTable = pgTable(
  "audit_placed_building",
  {
    id: varchar("id", { length: 36 }).notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    placedBuildingID: varchar("placed_building_id", { length: 36 }).notNull(),
    created: timestamp().notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.id] }),
    foreignKey({ columns: [table.userId], foreignColumns: [userTable.id] }),
    foreignKey({
      columns: [table.placedBuildingID],
      foreignColumns: [placedBuildingTable.id],
    }),
  ],
);

export { auditPlacedBuildingTable };

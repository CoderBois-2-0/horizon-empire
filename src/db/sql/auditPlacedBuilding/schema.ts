import {
  pgTable,
  varchar,
  primaryKey,
  foreignKey,
  timestamp,
  pgEnum,
} from "drizzle-orm/pg-core";
import { placedBuildingTable } from "$db/sql/placedBuilding/schema";
import { userTable } from "$db/sql/user/schema";

const placedBuildingActionType = pgEnum("placed_building_action_type", [
  "create",
  "remove",
]);

const auditPlacedBuildingTable = pgTable(
  "audit_placed_building",
  {
    id: varchar("id", { length: 36 }).notNull(),
    userId: varchar("user_id", { length: 36 }).notNull(),
    buildingID: varchar("building_id", { length: 36 }).notNull(),
    actionType: placedBuildingActionType("action_type"),
    created: timestamp().notNull().defaultNow(),
  },
  (table) => [
    primaryKey({ columns: [table.id] }),
    foreignKey({ columns: [table.userId], foreignColumns: [userTable.id] }),
    foreignKey({
      columns: [table.buildingID],
      foreignColumns: [placedBuildingTable.id],
    }),
  ]
);

export { auditPlacedBuildingTable, placedBuildingActionType };

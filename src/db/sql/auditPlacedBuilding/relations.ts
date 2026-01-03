import { relations } from "drizzle-orm";
import { auditPlacedBuildingTable } from "./schema";
import { userTable } from "../user/schema";
import { placedBuildingTable } from "../placedBuilding/schema";

export const auditPlacedBuildingRelations = relations(
  auditPlacedBuildingTable,
  ({ one }) => ({
    user: one(userTable, {
      fields: [auditPlacedBuildingTable.userId],
      references: [userTable.id],
    }),
    placedBuilding: one(placedBuildingTable, {
      fields: [auditPlacedBuildingTable.buildingID],
      references: [placedBuildingTable.id],
    }),
  }),
);

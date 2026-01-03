import { relations } from "drizzle-orm";
import { placedBuildingTable } from "./schema";
import { buildingTable } from "../building/schema";
import { cityTable } from "../city/schema";
import { regionsTable } from "../region/schema";
// import { auditPlacedBuildingTable } from "../auditPlacedBuilding/schema";

export const placedBuildingRelations = relations(
  placedBuildingTable,
  ({ one, many }) => ({
    building: one(buildingTable, {
      fields: [placedBuildingTable.buildingID],
      references: [buildingTable.id],
    }),
    city: one(cityTable, {
      fields: [placedBuildingTable.cityID],
      references: [cityTable.id],
    }),
    region: one(regionsTable, {
      fields: [placedBuildingTable.regionID],
      references: [regionsTable.id],
    }),
  }),
);

// export const placedBuildingAudits = relations(placedBuildingTable, ({ one, many }) => ({
//   building: one(buildingTable, {
//     fields: [placedBuildingTable.buildingID],
//     references: [buildingTable.id],
//   }),

//   auditEntries: many(auditPlacedBuildingTable),
// }));

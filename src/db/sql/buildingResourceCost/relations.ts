import { buildingTable } from "$db/building/schema.js";
import { resourceTable } from "$db/resource/schema.js";
import { buildingResourceCostTable } from "./schema.js";
import { relations } from "drizzle-orm";

export const buildingResourceCostRelations = relations(
  buildingResourceCostTable,
  ({ one }) => ({
    building: one(buildingTable, {
      fields: [buildingResourceCostTable.buildingID],
      references: [buildingTable.id],
    }),
    resource: one(resourceTable, {
      fields: [buildingResourceCostTable.resourceID],
      references: [resourceTable.id],
    }),
  }),
);

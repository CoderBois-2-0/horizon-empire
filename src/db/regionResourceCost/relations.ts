import { regionsTable } from "$db/region/schema.js";
import { resourceTable } from "$db/resource/schema.js";
import { regionResourceCostTable } from "./schema.js";
import { relations } from "drizzle-orm";

export const regiongResourceCostRelations = relations(
  regionResourceCostTable,
  ({ one }) => ({
    region: one(regionsTable, {
      fields: [regionResourceCostTable.regionID],
      references: [regionsTable.id],
    }),
    resource: one(resourceTable, {
      fields: [regionResourceCostTable.resourceID],
      references: [resourceTable.id],
    }),
  }),
);

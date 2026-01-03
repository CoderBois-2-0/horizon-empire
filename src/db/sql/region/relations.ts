import { relations } from "drizzle-orm";
import { regionsTable } from "./schema";
import { regionResourceCostTable } from "../regionResourceCost/schema";
import { mapTable } from "../map/schema";

export const regionRelations = relations(regionsTable, ({ one }) => ({
  map: one(mapTable, {
    fields: [regionsTable.mapID],
    references: [mapTable.id],
  }),
}));

export const regionResourceCosts = relations(regionsTable, ({ many }) => ({
  resourceCosts: many(regionResourceCostTable),
}));

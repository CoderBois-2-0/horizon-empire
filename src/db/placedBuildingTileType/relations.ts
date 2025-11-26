import { relations } from "drizzle-orm";
import { placedBuildingTileTypeTable } from "./schema";

import { tileTypeTable } from "../tileType/schema";
import { placedBuildingTable } from "$db/placedBuilding/schema";

export const placedBuildingTileTypeRelations = relations(
  placedBuildingTileTypeTable,
  ({ one }) => ({
    placedBuilding: one(placedBuildingTable, {
      fields: [placedBuildingTileTypeTable.placedBuildingID],
      references: [placedBuildingTable.id],
    }),
    tileType: one(tileTypeTable, {
      fields: [placedBuildingTileTypeTable.tileTypeID],
      references: [tileTypeTable.id],
    }),
  }),
);

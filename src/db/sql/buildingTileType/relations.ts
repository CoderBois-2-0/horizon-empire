import { relations } from "drizzle-orm";
import { buildingTileTypeTable } from "./schema";
import { buildingTable } from "../building/schema";
import { tileTypeTable } from "../tileType/schema";

export const buildingTileTypeRelations = relations(
  buildingTileTypeTable,
  ({ one }) => ({
    building: one(buildingTable, {
      fields: [buildingTileTypeTable.buildingID],
      references: [buildingTable.id],
    }),
    tileType: one(tileTypeTable, {
      fields: [buildingTileTypeTable.tileTypeID],
      references: [tileTypeTable.id],
    }),
  }),
);

import { relations } from "drizzle-orm";
import { buildingTable } from "./schema";
import { buildingTileTypeTable } from "../buildingTileType/schema";

export const buildingRelations = relations(buildingTable, ({ many }) => ({
  buildingTileTypes: many(buildingTileTypeTable),
}));

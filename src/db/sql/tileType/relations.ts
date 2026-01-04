import { relations } from "drizzle-orm";
import { tileTypeTable } from "./schema";
import { buildingTileTypeTable } from "../buildingTileType/schema";

export const tileTypeRelations = relations(tileTypeTable, ({ many }) => ({
  buildingTileTypes: many(buildingTileTypeTable),
}));

import { relations } from "drizzle-orm";
import { userTable } from "./schema";
import { auditPlacedBuildingTable } from "../auditPlacedBuilding/schema";
import { cityTable } from "../city/schema";

export const userRelations = relations(userTable, ({ many }) => ({
  cities: many(cityTable),
  auditPlacedBuildings: many(auditPlacedBuildingTable),
}));

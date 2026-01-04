import { relations } from "drizzle-orm";
import { tileTable } from "./schema";
import { tileTypeTable } from "../tileType/schema";
import { regionsTable } from "../region/schema";

export const tileRelations = relations(tileTable, ({ one }) => ({
  region: one(regionsTable, {
    fields: [tileTable.regionID],
    references: [regionsTable.id],
  }),
  tileType: one(tileTypeTable, {
    fields: [tileTable.tileTypeID],
    references: [tileTypeTable.id],
  }),
}));

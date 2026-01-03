import { relations } from "drizzle-orm";
import { cityTable } from "./schema.js";
import { userTable } from "../user/schema.js";
import { mapTable } from "../map/schema.js";
import { inventoryTable } from "../inventory/schema.js";


export const cityRelations = relations(cityTable, ({ one }) => ({
  user: one(userTable, {
    fields: [cityTable.userID],
    references: [userTable.id],
  }),
  map: one(mapTable, {
    fields: [cityTable.mapID],
    references: [mapTable.id],
  }),
  inventory: one(inventoryTable, {
    fields: [cityTable.id],
    references: [inventoryTable.cityID],
  }),
}));

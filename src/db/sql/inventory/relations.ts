import { relations } from "drizzle-orm";
import { inventoryTable } from "./schema";
import { cityTable } from "../city/schema";

export const inventoryRelations = relations(inventoryTable, ({ one }) => ({
  city: one(cityTable, {
    fields: [inventoryTable.cityID],
    references: [cityTable.id],
  }),
}));

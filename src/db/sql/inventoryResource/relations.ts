import { relations } from "drizzle-orm";
import { inventoryResourceTable } from "./schema";
import { resourceTable } from "../resource/schema";
import { inventoryTable } from "../inventory/schema";

export const inventoryResourceRelations = relations(
  inventoryResourceTable,
  ({ one }) => ({
    resource: one(resourceTable, {
      fields: [inventoryResourceTable.resourceID],
      references: [resourceTable.id],
    }),
    inventory: one(inventoryTable, {
      fields: [inventoryResourceTable.inventoryID],
      references: [inventoryTable.id],
    }),
  }),
);

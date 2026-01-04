import { relations } from "drizzle-orm";
import { jobTable } from "./schema.js";
import { personTable } from "../person/schema.js";
import { placedBuildingTable } from "../placedBuilding/schema.js";

export const jobRelations = relations(jobTable, ({ one }) => ({
  person: one(personTable, {
    fields: [jobTable.personID],
    references: [personTable.id],
  }),
  placedBuilding: one(placedBuildingTable, {
    fields: [jobTable.placedBuildingID],
    references: [placedBuildingTable.id],
  }),
}));

import { personTable } from "$db/person/schema.js";
import { placedBuildingTable } from "$db/placedBuilding/schema.js";
import {
  pgEnum,
  pgTable,
  real,
  varchar,
  foreignKey,
} from "drizzle-orm/pg-core";

const jobType = pgEnum("job_type", [
  "office",
  "firefighter",
  "medical",
  "enforcement",
  "teacher",
  "service",
  "industrial",
]);

const jobTable = pgTable(
  "jobs",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    name: varchar("name", { length: 32 }).notNull(),
    type: jobType("type").notNull(),
    income: real("income").notNull(),
    personID: varchar("person_id", { length: 36 }),
    placedBuildingID: varchar("placed_building_id", { length: 36 }),
  },
  (table) => [
    foreignKey({
      columns: [table.personID],
      foreignColumns: [personTable.id],
    }),
    foreignKey({
      columns: [table.placedBuildingID],
      foreignColumns: [placedBuildingTable.id],
    }),
  ],
);

export { jobType, jobTable };

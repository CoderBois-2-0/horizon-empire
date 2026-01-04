import { personTable } from "$db/sql/person/schema.js";
import { placedBuildingTable } from "$db/sql/placedBuilding/schema.js";
import {
  pgEnum,
  pgTable,
  real,
  varchar,
  foreignKey,
  index,
} from "drizzle-orm/pg-core";
import { isNull } from "drizzle-orm";

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
    placedBuildingID: varchar("placed_building_id", { length: 36 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.personID],
      foreignColumns: [personTable.id],
    }),
    foreignKey({
      columns: [table.placedBuildingID],
      foreignColumns: [placedBuildingTable.id],
    }).onDelete("cascade"),

    // index for finding persons WITH a job
    index("idx_jobs_person_id").on(table.personID),

    // index for finding unoccupied jobs
    index("idx_jobs_unoccupied").on(table.id).where(isNull(table.personID)),
  ],
);

export { jobType, jobTable };

import { placedBuildingTable } from "$db/placedBuilding/schema.js";
import { foreignKey } from "drizzle-orm/pg-core";
import { pgTable, pgEnum, varchar } from "drizzle-orm/pg-core";

const ageCategory = pgEnum("age_category", [
  "newborn",
  "child",
  "teen",
  "young adult",
  "adult",
  "senior",
]);
const incomeGroup = pgEnum("income_group", ["low", "medium", "high"]);

const personTable = pgTable(
  "persons",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    ageCategory: ageCategory("age_category").notNull(),
    incomeGroup: incomeGroup("income_group").notNull(),
    housingID: varchar("housing_id", { length: 36 }).notNull(),
  },
  (table) => [
    foreignKey({
      columns: [table.housingID],
      foreignColumns: [placedBuildingTable.id],
    }).onDelete("cascade"),
  ],
);

export { personTable, ageCategory, incomeGroup };

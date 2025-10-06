import { pgTable, pgEnum, varchar } from "drizzle-orm/pg-core";

const ageCategory = pgEnum("age_category", ["newborn", "child", "teen", "young adult", "adult", "senior"]);
const incomeGroup = pgEnum("income_group", ["low", "medium", "high"]);

// id VARCHAR(36), age_category age_category, income_group income_group, housing_id VARCHAR(36)

const personTable = pgTable("persons", {
  id: varchar("id", { length: 36 }).primaryKey(),
  ageCategory: ageCategory("age_category").notNull(),
  incomeGroup: incomeGroup("income_group").notNull(),

});
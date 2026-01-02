import { pgTable, varchar } from "drizzle-orm/pg-core";

const personTable = pgTable("persons", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 20 }).notNull(),
});

export { personTable };

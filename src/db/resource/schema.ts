import { pgTable, varchar } from "drizzle-orm/pg-core";

const resourceTable = pgTable("resources", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 32 }).notNull(),
});

export { resourceTable };

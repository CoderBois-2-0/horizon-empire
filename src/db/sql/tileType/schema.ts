import { pgTable, varchar } from "drizzle-orm/pg-core";

const tileTypeTable = pgTable("tile_types", {
  id: varchar("id", { length: 36 }).primaryKey(),
  name: varchar("name", { length: 10 }).unique(),
});

export { tileTypeTable };

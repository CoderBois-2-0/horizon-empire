import { pgTable, varchar, foreignKey } from "drizzle-orm/pg-core";
import { regionsTable } from "$db/region/schema.js";
import { tileType } from "$db/tileType/schema.js";

const tileTable = pgTable(
  "tiles",
  {
    id: varchar("id", { length: 36 }).primaryKey(),
    type: tileType("type").notNull(),
    regionID: varchar("region_id", { length: 36 }),
  },
  (table) => [
    foreignKey({
      columns: [table.regionID],
      foreignColumns: [regionsTable.id],
    }),
  ],
);

export { tileTable };

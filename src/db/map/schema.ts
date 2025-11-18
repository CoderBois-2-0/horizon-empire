import { pgTable, pgEnum, varchar } from "drizzle-orm/pg-core";

const mapType = pgEnum("map_type", ["forrest", "arctic", "desert", "bay"]);
const mapSize = pgEnum("map_size", ["small", "medium", "large"]);

const mapTable = pgTable("maps", {
	id: varchar("id", { length: 36 }).primaryKey(),
	type: mapType("type").notNull(),
	size: mapSize("map_size").notNull(),
});

export { mapTable, mapType, mapSize };

import { pgTable, pgEnum, varchar } from "drizzle-orm/pg-core";

const mapType = pgEnum("map_type", ["forrest", "arctic", "desert", "bay"]);

const mapTable = pgTable("map", {
	id: varchar("id", { length: 36 }).primaryKey(),
	name: varchar("name", { length: 32 }).notNull(),
	startingRegionID: varchar("starting_region_id", { length: 36 }).notNull()
});

export {
	mapTable,
	mapType
};

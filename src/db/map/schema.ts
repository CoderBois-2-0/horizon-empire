import { relations } from "drizzle-orm";
import { pgTable, varchar } from "drizzle-orm/pg-core";

const mapTable = pgTable("map", {
	id: varchar("id", { length: 36 }).primaryKey(),
	name: varchar("name", { length: 32 }).notNull(),
	startingRegionID: varchar("starting_region_id", { length: 36 }).notNull()
});

export {
	mapTable
};

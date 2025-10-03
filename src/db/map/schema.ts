import { regionsTable } from "$db/region/schema.js";
import { relations } from "drizzle-orm";
import { pgTable, pgEnum, varchar } from "drizzle-orm/pg-core";

const mapType = pgEnum("map_type", ["forrest", "arctic", "desert", "bay"]);
const mapSize = pgEnum("map_size", ["small", "medium", "large"]);

const mapTable = pgTable("map", {
	id: varchar("id", { length: 36 }).primaryKey(),
	type: mapType("type").notNull(),
	size: mapSize("map_size").notNull(),
	startingRegionID: varchar("starting_region_id", { length: 36 }),
});

const mapRelation = relations(mapTable, ({ one }) => ({
	startingRegion: one(regionsTable, {
		fields: [mapTable.startingRegionID],
		references: [regionsTable.id],

	}),
}));

export { mapTable, mapType, mapSize, mapRelation };

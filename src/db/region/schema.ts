import { pgTable, varchar } from "drizzle-orm/pg-core";

const regionsTable = pgTable("region", {
	id: varchar("id", { length: 36 }).primaryKey(),
	name: varchar("name", { length: 32 }).notNull(),
	mapID: varchar("map_id", { length: 36 }).notNull()
});

export {
	regionsTable
}

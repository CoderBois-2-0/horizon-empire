import { pgTable, varchar } from "drizzle-orm/pg-core";

const userTable = pgTable("users", {
	id: varchar("id", { length: 36 }).primaryKey(),
	username: varchar("username", { length: 16 }).notNull().unique(),
	password: varchar("password", { length: 72 }).notNull()
});

export {
	userTable
};

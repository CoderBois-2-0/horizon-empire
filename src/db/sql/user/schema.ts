import { pgTable, varchar } from "drizzle-orm/pg-core";
import { generateID } from "$db/sql/index";

const userTable = pgTable("users", {
  id: varchar("id", { length: 36 }).primaryKey().$defaultFn(generateID),
  username: varchar("username", { length: 16 }).notNull().unique(),
  password: varchar("password", { length: 72 }).notNull(),
});

export { userTable };

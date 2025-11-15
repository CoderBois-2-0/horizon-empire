import { userTable } from "./schema";

type TUser = typeof userTable.$inferSelect;
type TSafeUser = Omit<TUser, "password">;

type TUserInsert = Omit<typeof userTable.$inferInsert, "id">;

export { TUser, TSafeUser, TUserInsert };

import { connectDB, TDB } from "$db/sql/index";
import { sql } from "drizzle-orm";
import { userTable } from "./schema";
import { TSafeUser, TUser, TUserInsert } from "./types";

class UserSQLHandler {
  #client: TDB;
  #table = userTable;

  constructor(dbUrl: string) {
    const db = connectDB(dbUrl);
    this.#client = db;
  }

  async create(newUser: TUserInsert): Promise<TSafeUser> {
    const userRows = await this.#client
      .insert(this.#table)
      .values({
        ...newUser,
        password: sql`crypt(${newUser.password}, gen_salt('bf', 12))`,
      })
      .returning();

    const user = userRows.at(0) as TUser;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = user;

    return safeUser;
  }

  async findByUserCredentials(
    username: TUser["username"],
    password: TUser["password"]
  ): Promise<TSafeUser | undefined> {
    const userOptional = await this.#client.query.userTable.findFirst({
      where: (user, { and, eq }) =>
        and(
          eq(user.username, username),
          sql`"password" = crypt(${password}, "password")`
        ),
    });

    if (!userOptional) {
      return userOptional;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...safeUser } = userOptional;

    return safeUser;
  }
}

export default UserSQLHandler;

import { connectDB, TDB } from "$db/index";
import { sql } from "drizzle-orm";
import { userTable } from "./schema";
import { TSafeUser, TUser, TUserInsert } from "./types";

class UserHandler {
	#client: TDB;
	#table = userTable;

	constructor(dbUrl: string) {
		const db = connectDB(dbUrl);
		this.#client = db;
	}

	async create(newUser: TUserInsert) {
		await this.#client.insert(this.#table).values({ ...newUser, password: sql`crypt(${newUser.password}, gen_salt('bf', 12))` });
	}

	async findByUsername(
		username: TUser["username"],
		hashedPassword: TUser["password"],
	): Promise<TSafeUser | undefined> {
		const userOptional = await this.#client.query.userTable.findFirst({
			where: (user, { and, eq }) =>
				and(eq(user.username, username), eq(user.password, hashedPassword)),
		});

		if (!userOptional) {
			return userOptional;
		}
		const { password, ...user } = userOptional;

		return user;
	}
}

export { UserHandler };

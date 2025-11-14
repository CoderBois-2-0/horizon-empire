import { connectDB, TDB } from "$db/index";
import { userTable } from "./schema";

class UserHandler {
	#client: TDB;
	#table = userTable;

	constructor(dbUrl: string) {
		const db = connectDB(dbUrl)
		this.#client = db;
	}
}

export { UserHandler };

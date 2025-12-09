// import { connectDB, TDB } from "$db/index";
import { connectToDB, TDB } from "../../../migration/postgresql/db";
import { cityTable } from "./schema";

class CityHandler {
  #client: TDB;
  #table = cityTable;

  // constructor(dbUrl: string) {
  // 	const db = connectDB(dbUrl);
  // 	this.#client = db;
  // }

  constructor() {
    const db = connectToDB();
    this.#client = db;
  }

  // get all cities
  async getAll(): Promise<any[]> {
    return await this.#client.query.cityTable.findMany();
  }
}

export { CityHandler };

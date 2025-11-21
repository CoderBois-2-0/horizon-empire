import { connectDB, TDB } from "$db/index";
import { IRegion } from "./types";

class RegionHandler {
  #client: TDB;

  constructor(dbUrl: string) {
    const db = connectDB(dbUrl);
    this.#client = db;
  }

  // get all regions
  async getAll(): Promise<IRegion[]> {
    return await this.#client.query.regionsTable.findMany();
  }
}

export { RegionHandler };

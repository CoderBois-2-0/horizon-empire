import { connectDB, TDB } from "$db/index";
import { IRegion, IRegionQuery } from "./types";
import { eq } from "drizzle-orm";

class RegionHandler {
  #client: TDB;

  constructor(dbUrl: string) {
    const db = connectDB(dbUrl);
    this.#client = db;
  }

  // get all regions
  async getAll(query?: IRegionQuery): Promise<IRegion[]> {
    return this.#client.query.regionsTable.findMany({
      where: query?.mapID
        ? (fields) => eq(fields.mapID, query.mapID!)
        : undefined,
    });
  }
}

export { RegionHandler };

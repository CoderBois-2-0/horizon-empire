import { connectDB, TDB } from "$db/index";
import { IRegion } from "./types";
import { regionsTable } from "./schema";

class RegionHandler {
  #client: TDB;
  #table = regionsTable;

  constructor(dbUrl: string) {
    const db = connectDB(dbUrl);
    this.#client = db;
  }

  // get all regions
  async getAll(): Promise<IRegion[]> {
    return await this.#client.query.regionsTable.findMany();
  }

  // update isUnlocked status for a given region ID
  async unlockRegion(regionID: string): Promise<void> {
    await this.#client
      .update(this.#table)
      .set({ isUnlocked: true })
      .where(this.#table.id.equals(regionID));
  }
}

export { RegionHandler };

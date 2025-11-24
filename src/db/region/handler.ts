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

  async allRegionsLocked(): Promise<boolean> {
    const regions = await this.#client.query.regionsTable.findMany();
    return regions.every((region) => region.isUnlocked === false);
  }

  async canUnlock(regionID: string, inventoryID: string): Promise<boolean> {
    // First unlock is free
    const allLocked = await this.allRegionsLocked();
    if (allLocked) {
      return true;
    }

    // do payment logic 
    const hasPaid = await paymentFunction(inventoryID, regionID);
    if (hasPaid) {
      return true;
    }

    throw new Error("You're broke! :(");
  }

  async unlockRegion(regionID: string, inventoryID: string): Promise<void> {
    const allowed = await this.canUnlock(regionID, inventoryID);
    if (!allowed) return; // safety, though canUnlock throws if not allowed

    await this.#client
      .update(this.#table)
      .set({ isUnlocked: true })
      .where(this.#table.id.equals(regionID));
  }
}

export { RegionHandler };

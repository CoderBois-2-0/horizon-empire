import { connectDB, TDB } from "$db/sql/index";
import { IRegion } from "./types";
import { regionsTable, regionWithTotalTiles } from "./schema";
import { regionResourceCostTable } from "../regionResourceCost/schema";
import { eq } from "drizzle-orm";

class RegionHandler {
  #client: TDB;
  #table = regionsTable;

  // TEMPORARY hard-coded inventory
  // Replace this later with DB queries when inventory is finished and we agree on what the inventory holds :-)
  #fakeInventory: Record<string, { coin: number }> = {
    // inventoryID: { coin: number }
    "inv-1": { coin: 500 },
    "inv-2": { coin: 10 },
  };

  constructor(dbUrl: string) {
    const db = connectDB(dbUrl);
    this.#client = db;
  }

  // get all regions
  async getAll(): Promise<IRegion[]> {
    return this.#client.select().from(regionWithTotalTiles);
  }

  async allRegionsLocked(): Promise<boolean> {
    const regions = await this.#client.query.regionsTable.findMany();
    return regions.every((region) => region.isUnlocked === false);
  }

  // payment logic
  async paymentFunction(
    inventoryID: string,
    regionID: string,
  ): Promise<boolean> {
    // 1. Fetch region cost
    const regionCost =
      await this.#client.query.regionResourceCostTable.findFirst({
        where: eq(regionResourceCostTable.regionID, regionID),
      });
    if (!regionCost) {
      throw new Error(`No cost entry found for region ${regionID}`);
    }

    const cost = regionCost.amount;

    // 2. Retrieve temp inventory
    const inv = this.#fakeInventory[inventoryID];

    if (!inv) {
      throw new Error(`Inventory ${inventoryID} not found`);
    }

    // 3. Check if player has enough coin
    if (inv.coin < cost) {
      throw new Error("You're poor! Not enough coin.");
    }

    // 4. Deduct cost
    inv.coin -= cost;

    console.log(
      `Inventory ${inventoryID} paid ${cost}. Remaining gold: ${inv.coin}`,
    );

    return true;
  }

  async canUnlock(regionID: string, inventoryID: string): Promise<boolean> {
    // First unlock is free
    const allLocked = await this.allRegionsLocked();
    if (allLocked) {
      return true;
    }

    const hasPaid = await this.paymentFunction(inventoryID, regionID);
    if (hasPaid) {
      return true;
    }

    throw new Error("You're broke! :(");
  }

  async unlockRegion(
    regionID: string,
    inventoryID: string,
    isUnlocked: boolean,
  ): Promise<void> {
    const allowed = await this.canUnlock(regionID, inventoryID);
    if (!allowed) return;

    await this.#client
      .update(this.#table)
      .set({ isUnlocked })
      .where(eq(this.#table.id, regionID));
  }
}

export { RegionHandler };

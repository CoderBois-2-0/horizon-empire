// import { connectDB, TDB } from "$db/index";
// import { TDB, connectToDB } from "./db.js";

import { connectToDB, TDB } from "../../../../migration/postgresql/db";
import { IIventory } from "./types";

class InventoryHandler {
  #client: TDB;
  // #table = inventoryTable;

  //   constructor(dbUrl: string) {
  //     const db = connectDB(dbUrl);
  //     this.#client = db;
  //   }

  constructor() {
    const db = connectToDB();
    this.#client = db;
  }

  // get all inventories
  async getAll(): Promise<IIventory[]> {
    return await this.#client.query.inventoryTable.findMany();
  }
}

export { InventoryHandler };

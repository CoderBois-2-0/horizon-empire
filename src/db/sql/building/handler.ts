import { connectDB, TDB } from "$db/sql/index";
import { IBuilding } from "./types";

class BuildingHandler {
  #client: TDB;

  constructor(dbUrl: string) {
    const db = connectDB(dbUrl);
    this.#client = db;
  }

  async getAll(): Promise<IBuilding[]> {
    return await this.#client.query.buildingTable.findMany();
  }
}

export { BuildingHandler };

import { model, Mongoose } from "mongoose";
import { buildingSchema } from "./schema";
import { getConn } from "$db/document/index";

class BuildingDocumentHandler {
  #conn: Promise<Mongoose>;
  #model = model("Building", buildingSchema);

  constructor(dbURL: string) {
    this.#conn = getConn(dbURL);
  }

  async getAll() {
    await this.#conn;

    return this.#model.find().lean();
  }
}

export { BuildingDocumentHandler };

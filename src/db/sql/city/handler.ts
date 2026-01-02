import { connectDB, TDB } from "$db/sql/index";
import { sql } from "drizzle-orm";
import { ICityInsert } from "./types";

class CitySQLHandler {
  #client: TDB;

  constructor(dbUrl: string) {
    this.#client = connectDB(dbUrl);
  }

  async createCity(newCity: ICityInsert): Promise<void> {
    await this.#client.execute(
      sql`CALL create_city(${newCity.mapType}, ${newCity.mapSize}, ${newCity.userID}, ${newCity.cityName})`,
    );
  }
}

export default CitySQLHandler;

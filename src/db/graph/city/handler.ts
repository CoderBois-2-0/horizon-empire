import type { Driver } from "neo4j-driver";
import { CITY_CYPHER } from "./cypher";
import type { CityDTO, CreateCityInput } from "./types";

export class CityGraphHandler {
  constructor(private readonly driver: Driver) {}

  async createCity(input: CreateCityInput): Promise<CityDTO> {
    const session = this.driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(CITY_CYPHER.create, {
          name: input.name,
          userID: input.userID,
          mapID: input.mapID,
        })
      );

      const record = res.records[0];
      if (!record) throw new Error("User or Map not found.");
      return record.get("city") as CityDTO;
    } finally {
      await session.close();
    }
  }

  async getCityById(id: string): Promise<CityDTO | null> {
    const session = this.driver.session();
    try {
      const res = await session.executeRead((tx) =>
        tx.run(CITY_CYPHER.getById, { id })
      );
      return (res.records[0]?.get("city") as CityDTO) ?? null;
    } finally {
      await session.close();
    }
  }

  async deleteCity(id: string): Promise<string> {
    const session = this.driver.session();
    try {
      const res = await session.executeWrite((tx) =>
        tx.run(CITY_CYPHER.deleteById, { id })
      );
      const record = res.records[0];
      if (!record) throw new Error("City not found.");
      return record.get("id") as string;
    } finally {
      await session.close();
    }
  }
}
